import type { Plugin } from 'vite'
import { createMdxTransformer, createMdxTransformerSFC } from './transform'
import { Options } from './types'

function VitePluginVueMdx(userOptions: Options = { sfc: false }): Plugin {
  let mdxToVue = createMdxTransformer(userOptions)

  if (userOptions.sfc) {
    mdxToVue = createMdxTransformerSFC(userOptions)
  }

  return {
    name: 'vite-plugin-mdx-vue',
    enforce: 'pre',
    async transform(raw, id) {
      if (!id.endsWith('.mdx')) return

      const transformed = await mdxToVue(id, raw)
      return transformed
    },
  }
}

export default VitePluginVueMdx
