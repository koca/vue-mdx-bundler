import * as vue from 'vue'

function getMDXComponent(code: string, globals?: Record<string, unknown>) {
  const scope = { vue, ...globals }
  // eslint-disable-next-line
  const fn = new Function(...Object.keys(scope), code)
  return fn(...Object.values(scope))
}

export { getMDXComponent }
