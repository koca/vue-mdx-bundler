/**
 * Babel plugin to convert jsx attribute to vue attribute
 *
 * @example
 * input:  <Demo prop={{ key:"value" }} ></Demo>
 * output: <Demo :prop="{ key:'value' }" ></Demo>
 *
 * @info
 * its for vite-plugin-mdx-vue. if we can find a way to use
 * VueComponents plugin to work with vue-mdx-bundler, we won't need this.
 */
export default ({ types: t }) => {
  return {
    visitor: {
      JSXAttribute(path) {
        const name = path.get('name')

        // prop is object
        if (t.isJSXIdentifier(name) && t.isJSXExpressionContainer(path.node.value)) {
          const propName = name.node.name
          const newPropName = ':' + name.node.name

          try {
            // propName={ ... }
            let source = path.getSource()
            // remove propName=
            source = source.replace(propName + '=', '')
            // remove first {
            source = source.substring(1)
            // remove last }
            source = source.slice(0, -1)

            if (t.isObjectExpression(path.node.value.expression)) {
              // escaping for single quotes
              source = source.replace(/"/g, "'")
            }

            path.replaceWith(t.jSXAttribute(t.jSXIdentifier(newPropName), t.stringLiteral(source)))
          } catch (err) {
            console.log(err)
          }
        }
      },
    },
  }
}
