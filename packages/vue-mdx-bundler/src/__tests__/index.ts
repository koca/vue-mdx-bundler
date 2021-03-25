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
  console.log(result.code)

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

test('files is optional', async () => {
  await expect(bundleMDX('hello')).resolves.toBeTruthy()
})
