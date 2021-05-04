import { renderToString } from '@vue/server-renderer'
import { bundleMDX } from 'vue-mdx-bundler'
import { getMDXComponent } from 'vue-mdx-bundler/client'
import { Options } from './types'
import vue from 'vue'

export function createMdxTransformerSFC(userOptions: Options = { mdxComponents: {} }) {
  userOptions.mockResolveComponent = true
  const { wrapperComponent } = userOptions

  return async (_id: string, raw: string) => {
    let bundled = await bundleMDX(raw, userOptions)

    const MdxComponent = getMDXComponent(bundled.code)

    const app = vue.createApp({
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

    // to support vite-plugin-components we need to render template to string
    let renderedTemplate = await renderToString(app)

    const sfcTemplate = wrapperComponent
      ? `<${wrapperComponent} :frontmatter="frontmatter">${renderedTemplate}</${wrapperComponent}>`
      : renderedTemplate

    const sfc = `<template>${sfcTemplate}</template>
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
