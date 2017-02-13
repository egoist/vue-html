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

test('transform vue-specific attributes', () => {
  const vm = new Vue({
    data: {count: 0},
    methods: {
      handleClick() {
        this.count++
      }
    },
    render() {
      return this.$html`
        <div onClick=${this.handleClick}>
          <span id="foo" class="hi" domPropsInnerHTML="hi"></span>
        </div>
      `
    }
  }).$mount()
  vm.$el.dispatchEvent(new Event('click'))
  vm._watcher.run()
  expect(vm.count).toBe(1)

  const hi = vm.$el.querySelector('.hi')
  expect(hi.textContent).toBe('hi')

  const foo = vm.$el.querySelector('#foo')
  expect(foo.textContent).toBe('hi')
})
