import htm from 'htm'
import mustUseDomProp from './mustUseDomProp'

export default Vue => {
  Vue.mixin({
    beforeCreate() {
      const createElement = this.$createElement.bind(this)
      const h = (tag, attrs, ...children) => {
        return createElement(tag, attrs && getVNodeData(tag, attrs), children)
      }
      this.$$createElement = createElement
      this.$createElement = htm.bind(h)
    }
  })
}

function getVNodeData(tag, attrs) {
  const data = {}

  const basics = ['slot', 'key', 'ref', 'refInFor', 'class', 'style']

  for (const key of Object.keys(attrs)) {
    if (key.substring(0, 2) === 'on') {
      // OnClick => on: {click}
      data.on = data.on || {}
      const newKey = lowerCaseFirstLetter(key.substring(2))
      data.on[newKey] = attrs[key]
    } else if (key.substring(0, 8) === 'nativeOn') {
      // NativeOnClick => nativeOn: {click}
      data.nativeOn = data.nativeOn || {}
      const newKey = lowerCaseFirstLetter(key.substring(8))
      data.nativeOn[newKey] = attrs[key]
    } else if (key.substring(0, 8) === 'domProps') {
      // DomPropsInnerHTML => domProps: {innerHTML}
      data.domProps = data.domProps || {}
      const newKey = lowerCaseFirstLetter(key.substring(8))
      data.domProps[newKey] = attrs[key]
    } else if (key.substring(0, 2) === 'v-') {
      data.directives = data.directives || []
      const name = key.substring(2)
      data.directives.push({
        name,
        value: attrs[key]
      })
    } else if (mustUseDomProp(tag, attrs.type, key)) {
      data.domProps = data.domProps || {}
      data.domProps[key] = attrs[key]
    } else if (basics.indexOf(key) > -1) {
      data[key] = attrs[key]
    } else {
      // All others props => {attrs: props}
      data.attrs = data.attrs || {}
      data.attrs[key] = attrs[key]
    }
  }

  return data
}

function lowerCaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.substring(1)
}
