import './setup-tests.js'
import { test } from 'uvu'

import * as assert from 'uvu/assert'
import { getMDXComponent } from '../../dist/client.js'
import { render } from '../../tests/test-utils.js'
import { bundleMDX } from '../../dist/index.js'
import { h } from 'vue'

test('returns code and frontmatter', async () => {
  const mdxSource = `
---
title: Example Post
published: 2021-02-13
description: This is some meta-data
---
# This is the title

Here's a **neat** demo:
`.trim()

  const result = await bundleMDX(mdxSource, {
    files: {},
  })

  // import * as vue from "vue";
  // export const MdxContent = () => { ${result.code} };
  // export const frontmatter = ${JSON.stringify(result.frontmatter)}; `.trim()
  // console.log(result.code)

  const MdxComponent = getMDXComponent(result.code)

  const { container } = render({
    template: '<MdxComponent></MdxComponent>',
    components: { MdxComponent },
  })

  assert.equal(
    container.innerHTML,
    `<h1>This is the title</h1>
<p>Here's a <strong>neat</strong> demo:</p>`
  )

  assert.equal(result.frontmatter, {
    description: 'This is some meta-data',
    published: new Date('2021-02-13T00:00:00.000Z'),
    title: 'Example Post',
  })
})

test('import js files', async () => {
  const mdxSource = `
import Demo from './demo'

<Demo />
`.trim()

  const result = await bundleMDX(mdxSource, {
    files: {
      './demo.js': `
import {h} from "vue"
function Demo() {
  return h('div', 'im imported from a js file');
}
export default Demo
      `.trim(),
    },
  })

  const MdxComponent = getMDXComponent(result.code)

  const { container } = render({
    template: '<MdxComponent></MdxComponent>',
    components: { MdxComponent },
  })

  assert.equal(container.innerHTML, '<div>im imported from a js file</div>')
})

test('props works', async () => {
  const mdxSource = `
import Demo from './demo'

<Demo str="hello" num={2} arr={[1,2,3]} obj={{ hey: 'there' }} />
`.trim()

  const result = await bundleMDX(mdxSource, {
    files: {
      './demo.js': `
import {h, defineComponent} from "vue"
const Demo = defineComponent({
  props:["str", "num", "arr", "obj"],
  setup(props){
    const propStr = "string: " + JSON.stringify(props?.str)
    const propInt = "number: " + JSON.stringify(props?.num)
    const propArr = "array: " + JSON.stringify(props?.arr)
    const propObj = "object: " + JSON.stringify(props?.obj)
    return () => {
      return h('div',{}, [propStr, propInt, propArr, propObj].join(", "))
    }
  }
})
export default Demo
      `.trim(),
    },
  })

  const MdxComponent = getMDXComponent(result.code)

  const { container } = render({
    template: '<MdxComponent></MdxComponent>',
    components: { MdxComponent },
  })

  assert.equal(container.innerHTML, '<div>string: "hello", number: 2, array: [1,2,3], object: {"hey":"there"}</div>')
})

test('slot works', async () => {
  const mdxSource = `
import Demo from './demo'

<Demo>Hello slot</Demo>
`.trim()

  const result = await bundleMDX(mdxSource, {
    files: {
      './demo.js': `
import {h, defineComponent} from "vue"
const Demo = defineComponent({
  setup(props, {slots}){
    return () => {
      return h('div',{}, slots)
    }
  }
})
export default Demo
      `.trim(),
    },
  })
  //
  const MdxComponent = getMDXComponent(result.code)

  const { container } = render({
    template: '<MdxComponent></MdxComponent>',
    components: { MdxComponent },
  })

  assert.equal(container.innerHTML, '<div>Hello slot</div>')
})

test('convert props to string literal for vite', async () => {
  const mdxSource = `
import Demo from './demo'

<Demo str="hello" num={2} arr={[1,2,3]} obj={{ hey: 'there' }}> attrs check </Demo>
`.trim()

  const result = await bundleMDX(mdxSource, {
    mockResolveComponent: true,
    files: {
      './demo.js': `
import {h, defineComponent} from "vue"
const Demo = defineComponent({
  setup(props, {slots}){
    return () => {
      return h('div',{}, slots)
    }
  }
})
export default Demo
      `.trim(),
    },
  })

  const MdxComponent = getMDXComponent(result.code)

  const { container } = render({
    template: '<MdxComponent></MdxComponent>',
    components: { MdxComponent },
  })

  assert.equal(
    container.innerHTML,
    `<div str="hello" :num="2" :arr="[1, 2, 3]" :obj="{
    hey: 'there'
  }"> attrs check </div>`
  )
})

test('files is optional', async () => {
  await bundleMDX('hello')
})

test('custom components works', async () => {
  const mdxSource = `
# Title h1

text

## Title h2
`.trim()

  const result = await bundleMDX(mdxSource)

  const MdxComponent = getMDXComponent(result.code)

  const { container } = render({
    template: '<MdxComponent :components="components"></MdxComponent>',
    components: { MdxComponent },
    setup() {
      return {
        components: {
          h1: (_props, context) => {
            return h('div', { class: 'custom-h1' }, context.slots)
          },
          h2: (_props, context) => {
            return h('div', { class: 'custom-h2' }, context.slots)
          },
          p: (_props, context) => {
            return h('p', { class: 'custom-p' }, context.slots)
          },
        },
      }
    },
  })

  assert.equal(
    container.innerHTML,
    `<div class="custom-h1">Title h1</div>
<p class="custom-p">text</p>
<div class="custom-h2">Title h2</div>`.trim()
  )
})

test('extend frontmatter', async () => {
  const mdxSource = `
---
title: Example Post
---
# Extending frontmatter
`.trim()

  const result = await bundleMDX(mdxSource, {
    files: {},
    extendFrontmatter: {
      process: async (_mdxContent, frontmatter) => {
        return {
          title: frontmatter.title,
          description: 'extended description',
        }
      },
    },
  })

  assert.equal(result.frontmatter, {
    description: 'extended description',
    title: 'Example Post',
  })
})

// we need to use sth like esbuild plugin vue
test.skip('import vue files', async () => {
  const mdxSource = `
import Demo from './demo.vue'

<Demo />
`.trim()

  const result = await bundleMDX(mdxSource, {
    files: {
      './demo.vue': `<template><h3>{{ msg }}</h3></template>
<script>export default { setup () { return {msg: 'vue works'} }}</script>
      `.trim(),
    },
  })

  const MdxComponent = getMDXComponent(result.code)

  const { container } = render({
    template: '<MdxComponent></MdxComponent>',
    components: { MdxComponent },
  })

  assert.equal(container.innerHTML, `<h3>vue works</h3>`.trim())
})

test.run()
