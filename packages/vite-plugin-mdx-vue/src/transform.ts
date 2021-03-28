import { renderToString } from '@vue/server-renderer'
import { bundleMDX, getMDXComponent } from 'vue-mdx-bundler'
import { Options } from './types'
import vue from 'vue'

export function createMdxTransformerSFC(userOptions: Options = { mdxComponents: {} }) {
  userOptions.mockResolveComponent = true
  const { wrapperComponent } = userOptions

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

    const sfc = `<template><${wrapperComponent} :frontmatter="frontmatter">${renderedTemplate}</${wrapperComponent}></template>
<script>
const frontmatter = ${JSON.stringify(bundled.frontmatter)}
export default {
  setup(){
    return { frontmatter }
  }
}
</script>`.trim()

    return sfc
  }
}
