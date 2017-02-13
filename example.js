// @tip: run this example with:
// $ yarn example

import Vue from 'vue'
import HTML from './src'

Vue.use(HTML)

new Vue({
  el: '#app',
  data: {
    count: 0
  },
  methods: {
    handleClick() {
      this.count++
    }
  },
  render() {
    return this.$html`
      <button ref="foo" class="wow" nativeOnClick=${() => console.log('native')} onClick=${this.handleClick}>${this.count}</button>
    `
  }
})
