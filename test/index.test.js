import assert from 'assert'
import Vue from 'vue'
import HTML from '../src'

Vue.use(HTML)

describe('main', () => {
  it('works', () => {
    const vm = new Vue({
      render(html) {
        return html`
          <div>hello</div>
        `
      }
    }).$mount()
    assert(vm.$el.textContent === 'hello')
  })

  it('transform vue-specific attributes', () => {
    const vm = new Vue({
      data: { count: 0 },
      methods: {
        handleClick() {
          this.count++
        }
      },
      render(html) {
        return html`
          <div onClick=${this.handleClick}>
            <span id="foo" class="hi" domPropsInnerHTML="hi"></span>
          </div>
        `
      }
    }).$mount()
    vm.$el.dispatchEvent(new Event('click'))
    vm._watcher.run()
    assert(vm.count === 1)

    const hi = vm.$el.querySelector('.hi')
    assert(hi.textContent === 'hi')

    const foo = vm.$el.querySelector('#foo')
    assert(foo.textContent === 'hi')
  })
})
