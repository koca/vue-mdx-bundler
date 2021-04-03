import { getMDXComponent } from '../client'
import { render } from '../../tests/test-utils'
import { bundleMDX } from '../index'

test('returns code and frontmatter', async () => {
  const mdxSource = `
---
title: Example Post
published: 2021-02-13
description: This is some meta-data
---
# This is the title

Here's **neat** demo:
`.trim()

  const result = await bundleMDX(mdxSource, {
    files: {},
  })

  // const MdxContent = `
  // import * as vue from "vue";
  // export const MdxContent = () => { ${result.code} };
  // export const frontmatter = ${JSON.stringify(result.frontmatter)}; `.trim()
  // console.log(result.code)

  const MdxComponent = getMDXComponent(result.code)

  const { container } = render({
    template: '<MdxComponent></MdxComponent>',
    components: { MdxComponent },
  })

  expect(container).toMatchSnapshot()

  expect(result.frontmatter).toEqual({
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

  expect(container).toMatchSnapshot()
})

test('files is optional', async () => {
  await expect(bundleMDX('hello')).resolves.toBeTruthy()
})

// we need to use sth like esbuild plugin vue
test.skip('import vue files', async () => {
  const mdxSource = `
import Demo from './demo.vue'

<Demo />
`.trim()

  const result = await bundleMDX(mdxSource, {
    files: {
      './demo.vue': `export default { setup () { return {msg: 'heyx'} }}
      `.trim(),
    },
  })

  const MdxComponent = getMDXComponent(result.code)

  const { container } = render({
    template: '<MdxComponent></MdxComponent>',
    components: { MdxComponent },
  })

  expect(container).toMatchSnapshot()
})
