import { BundleMDXOptions } from 'vue-mdx-bundler'

export type Options = {
  /**
   * returns named exports
   *
   * @info this is an **experimental** feature
   *
   * @example
   * // it lets you import mdx files like this:
   * import { MdxComponent, frontmatter } from "./readme.mdx"
   *
   * @default false
   */
  namedExports?: boolean

  /**
   * mdx components
   *
   * @example {
   *   h1: (props, context) => vue.h('h1', props, [ vue.h('span', 'title:'), context.slots ]),
   *   p: (props, context) => vue.h('p', props, context.slots),
   *   em: 'p', // render `em` elements (aka. *italic*) as paragraphs `p`
   *   CustomComponent: () => '<3' // return text
   *   CustomComponent: CustomComponent // return actual vue component like import CustomComponent from "./CustomComponent.vue"
   *   CustomComponent: ()=> vue.h('div', { onClick:()=>{ console.log('hey'); }}, 'Custom stuff') // or make stuff on the gog
   * }
   */
  mdxComponents?: Object
} & BundleMDXOptions
