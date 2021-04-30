import * as vtl from '@testing-library/vue'
import { defineComponent, h } from 'vue'

// export interface RenderResult extends vtl.RenderResult {
//   asFragment: (innerHTML?: string) => DocumentFragment
// }

export const render = (component, ...rest) => {
  const utils = vtl.render(
    defineComponent({
      name: 'MKVueTestUtils',
      setup(_, { slots }) {
        return () => h(component, slots)
      },
    }),
    ...rest
  )

  return {
    ...utils,
    asFragment: (innerHTML = utils.container.innerHTML) => {
      if (typeof document.createRange === 'function') {
        return document.createRange().createContextualFragment(innerHTML)
      }

      const template = document.createElement('template')
      template.innerHTML = innerHTML
      return template.content
    },
  }
}

export * from '@testing-library/vue'
