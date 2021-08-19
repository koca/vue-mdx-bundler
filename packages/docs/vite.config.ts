import path from 'path'
import { defineConfig } from 'vite'
import vue from 'vue'
import Vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Pages from 'vite-plugin-pages'
import ViteComponents from 'vite-plugin-components'
import VueMdx from '../vite-plugin-mdx-vue/src/index'
import ViteRestart from 'vite-plugin-restart'

export default defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`,
    },
  },
  optimizeDeps: {
    exclude: ['vite-plugin-mdx-vue'],
  },

  plugins: [
    ViteRestart({ restart: '../../packages/vite-plugin-mdx-vue/src/*.*' }), // DEV mode only u dont need this.
    Vue({ include: [/\.vue$/, /\.mdx$/] }),
    Pages({
      extensions: ['vue', 'mdx'],
    }),
    ViteComponents({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'mdx'],

      // allow auto import and register components used in markdown
      customLoaderMatcher: (path) => path.endsWith('.mdx'),
    }),

    VueMdx({
      wrapperComponent: 'mdx-layout-wrapper',
      mdxComponents: {
        pre: (props: any, context: any) => {
          // if you use remark plugins like `remark-mdx-code-meta` pre, props and default slot might be different just console.log it
          const pre = context?.slots?.default?.()?.[0]
          const defaultSlot = pre?.children[0] || ''
          const code = defaultSlot //
          const realProps = pre?.props
          const [, language] = realProps?.className?.split('-') // language-js

          const component = vue.h(
            'MdxPre',
            { ...props, ...realProps, language, code },
            // if you pass the `code` as a slot there is a special characters issue idk why so pass it as a prop to your custom component `MdxPre`
            {}
          )
          return component
        },
        em: (props: any, context: any) => vue.h('i', { style: 'color:skyblue' }, context.slots),
        D: () => '<3',
      },
    }),

    WindiCSS({
      safelist: 'prose prose-sm m-auto',
    }),
  ],
})
