import { bundleMDX } from 'vue-mdx-bundler'
import { Options } from './types'

export function createMdxTransformer(userOptions: Options = {}) {
  return async (_id: string, raw: string) => {
    let bundled = await bundleMDX(raw, userOptions)
    bundled.code = bundled.code.replace(/return Component.default;/, '') // remove return statement in bundled code

    return `
import * as vue from "vue"; // we need this for bundled vue code

export const MdxContent = {
  props: ['components'],
  setup (props) {
    ${bundled.code}
    const MdxContent = Component.default({
      components: props.components
    });
    return () => {
      return MdxContent;
    }
  }
};

export const frontmatter = ${JSON.stringify(bundled.frontmatter)}; `.trim()
  }
}

export function createMdxTransformerSFC(userOptions: Options = {}) {
  return async (_id: string, raw: string) => {
    let bundled = await bundleMDX(raw, userOptions)
    bundled.code = bundled.code.replace(/return Component.default;/, '')

    const sfc = `<template><MdxContent /></template>
<script>
import * as vue from "vue";
export default {
  props: ['components'],
  setup (props) {
    console.log({props})

    // console.log({exists: __vite_components_0 })


    ${bundled.code}
    const MdxContent = Component.default({
      components: props.components
    });

    return () => {
      return MdxContent;
    }
  }
}
</script>`

    return sfc
  }
}
