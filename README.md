# vue-html

[![NPM version](https://img.shields.io/npm/v/vue-html.svg?style=flat-square)](https://npmjs.com/package/vue-html) [![NPM downloads](https://img.shields.io/npm/dm/vue-html.svg?style=flat-square)](https://npmjs.com/package/vue-html) [![Build Status](https://img.shields.io/circleci/project/egoist/vue-html/master.svg?style=flat-square)](https://circleci.com/gh/egoist/vue-html)

> Use tagged template string in Vue.js

## Install

```bash
$ npm install --save vue-html
```

CDN version: https://unpkg.com/vue-html/dist/

## Usage

```js
import Vue from 'vue'
import HTML from 'vue-html'

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
      <button onClick=${this.handleClick}>${this.count}</button>
    `
  }
})
```

The syntax is exactly the same as Vue JSX despiting that we're using [tagged template string](https://github.com/substack/hyperx) here.

### Component

You still have to use the original `h` function:

```js
new Vue({
  el: '#app',
  render(h) {
    return this.$html`
      ${h(Counter, {props: {start: 0}})}
    `
  }
})

const Counter = {}
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT](https://egoist.mit-license.org/) © [EGOIST](https://github.com/egoist)
