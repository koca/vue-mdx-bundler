import type { Plugin } from 'vite'
import { createMdxTransformerSFC } from './transform'
import { createMdxTransformer } from './transformJs'
import { Options } from './types'

function VitePluginVueMdx(userOptions: Options = { namedExports: false }): Plugin {
  let mdxToVue = createMdxTransformerSFC(userOptions)

  if (userOptions.namedExports) {
    mdxToVue = createMdxTransformer(userOptions)
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
