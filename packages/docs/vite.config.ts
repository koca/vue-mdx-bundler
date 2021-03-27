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
      mdxComponents: {
        em: (props, context) => vue.h('i', { style: 'color:blue' }, context.slots),
        D: () => '<3',
      },
    }),

    WindiCSS({
      safelist: 'prose prose-sm m-auto',
    }),
  ],
})
