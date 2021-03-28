import { renderToString } from '@vue/server-renderer'
import { bundleMDX, getMDXComponent } from 'vue-mdx-bundler'
import { Options } from './types'
import vue from 'vue'

export function createMdxTransformerSFC(userOptions: Options = { mdxComponents: {} }) {
  userOptions.mockResolveComponent = true
  return async (_id: string, raw: string) => {
    let bundled = await bundleMDX(raw, userOptions)

    const MdxComponent = getMDXComponent(bundled.code)

    // to support vite-plugin-components we need to render template to string
    const renderedTemplate = await renderToString(
      vue.createSSRApp({
        components: {
          MdxComponent,
        },
        template: '<MdxComponent :components="mdxComponents" />',
        setup() {
          return {
            mdxComponents: userOptions.mdxComponents,
          }
        },
      })
    )

    const sfc = `<template>${renderedTemplate}</template>
<script>
export default {}
</script>`.trim()

    return sfc
  }
}
