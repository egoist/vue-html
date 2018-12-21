# vue-html

[![NPM version](https://img.shields.io/npm/v/vue-html.svg?style=flat-square)](https://npmjs.com/package/vue-html) [![NPM downloads](https://img.shields.io/npm/dm/vue-html.svg?style=flat-square)](https://npmjs.com/package/vue-html) [![Build Status](https://img.shields.io/circleci/project/egoist/vue-html/master.svg?style=flat-square)](https://circleci.com/gh/egoist/vue-html)

> Use tagged template string in Vue.js render function

## Why is this useful?

If you want to use Vue without a bundler / transpiler, this library will (reasonably) make your app smaller:

- Vue (runtime + template compiler): 32kB gzipped
- Vue (runtime + vue-html): 23kB gzipped

__What's the downside?__ No handy sugars like `v-model` support.

## Install

```bash
$ npm install --save vue-html
```

CDN versions: 

- `UMD`: https://unpkg.com/vue-html/dist/html.js (exposed as `window.HTML`)
- `ESM`: https://unpkg.com/vue-html/dist/html.es.js

## Usage

```js
import Vue from 'vue'
import HTML from 'vue-html'

Vue.use(HTML)

const Todos = {
  props: ['todos'],
  render(html) {
    return html`
    <ul>
    ${this.todos.map((todo, index) => {
      return html`<li key=${index}>${todo}</li>`
    })}
    </ul>
    `
  }
}

new Vue({
  el: '#app',
  data: {
    todos: [
      'Conquer the world',
      'Rewrite Peco'
    ],
    todo: ''
  },
  methods: {
    add() {
      this.todos.push(this.todo)
      this.todo = ''
    }
  },
  render(html) {
    return html`
    <div>
      <input value=${this.todo} onInput=${e => this.todo = e.target.value} />
      <button type="button" onClick=${this.add}>Add</button>
      <hr />
      <${Todos} todos=${this.todos} />
    </div>
    `
  }
})
```

The usage is very similar to Vue JSX except for that the `html` function is powered by [HTM (Hyperscript Tagged Markup)](https://github.com/developit/htm).

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT](https://egoist.mit-license.org/) © [EGOIST](https://github.com/egoist)
