import Vue from 'vue'
import HTML from '../src'

Vue.use(HTML)

test('main', () => {
  const vm = new Vue({
    render() {
      return this.$html`<div>hello</div>`
    }
  }).$mount()
  expect(vm.$el.textContent).toBe('hello')
})
