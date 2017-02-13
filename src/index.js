import hyperx from 'hyperx'

export default function (Vue) {
  Vue.prototype.$html = function (...args) {
    const createElement = hyperx((tag, attrs, children) => {
      const newAttrs = {}
      const defaults = ['style', 'className', 'key', 'ref', 'refInFor', 'slot']
      for (const key of defaults) {
        if (key === 'className') {
          newAttrs.class = attrs.className
        } else {
          newAttrs[key] = attrs[key]
        }
      }

      for (const key in attrs) {
        if (key.substring(0, 2) === 'on') {
          // onClick => on: {click}
          newAttrs.on = newAttrs.on || {}
          const newKey = lowerCaseFirstLetter(key.substring(2))
          newAttrs.on[newKey] = attrs[key]
        } else if (key.substring(0, 8) === 'nativeOn') {
          // nativeOnClick => nativeOn: {click}
          newAttrs.nativeOn = newAttrs.nativeOn || {}
          const newKey = lowerCaseFirstLetter(key.substring(8))
          newAttrs.nativeOn[newKey] = attrs[key]
        } else if (key.substring(0, 8) === 'domProps') {
          // domPropsInnerHTML => domProps: {innerHTML}
          newAttrs.domProps = newAttrs.domProps || {}
          const newKey = lowerCaseFirstLetter(key.substring(8))
          newAttrs.domProps[newKey] = attrs[key]
        } else if (defaults.indexOf(key) === -1) {
          // all others attrs => {attrs: attr}
          newAttrs.attrs = newAttrs.attrs || {}
          newAttrs.attrs[key] = attrs[key]
        }
      }

      return this.$createElement(tag, newAttrs, children)
    })

    const tree = createElement(...args)
    return tree
  }
}

function lowerCaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.substring(1)
}
