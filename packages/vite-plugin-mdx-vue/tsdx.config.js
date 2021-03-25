module.exports = {
  /**
   * @param {import('rollup/dist/rollup').InputOptions} config
   */
  rollup(config, options) {
    if (options.format === 'umd') {
      // https://github.com/koca/vue-prism-editor/issues/86
      config.output.intro = 'var global = typeof self !== undefined ? self : this;'
      // auto register prism editor component
      config.output.outro = `let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.component("VueUseGesture", VueUseGesture)
}`
    }

    return config
  },
}
