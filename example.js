// @tip: run this example with:
// $ yarn example

import Vue from 'vue'
import HTML from './src'

Vue.use(HTML)

const Counter = {
  props: ['start'],
  data() {
    return {
      count: this.start
    }
  },
  methods: {
    handleClick() {
      this.count++
    }
  },
  render() {
    return this.$html`
      <button style=${{backgroundColor: 'pink'}} id="foo" ref="foo" class="wow" nativeOnClick=${() => console.log('native')} onClick=${this.handleClick}>${this.count}</button>
    `
  }
}

new Vue({
  el: '#app',
  render(h) {
    return this.$html`
      ${h(Counter, {props: {start: 0}})}
    `
  }
})
