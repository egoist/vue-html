import Vue from 'vue'
import HTML from 'vue-html' // eslint-disable-line import/no-unresolved

Vue.use(HTML)

const Todos = {
  props: ['todos'],
  render(html) {
    return html`
      <ul>
        ${
          this.todos.map((todo, index) => {
            return html`
              <li key=${index}>${todo}</li>
            `
          })
        }
      </ul>
    `
  }
}

new Vue({
  el: '#app',
  data: {
    todos: ['Conquer the world', 'Rewrite Peco'],
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
        <input
          value=${this.todo}
          onInput=${
            e => {
              this.todo = e.target.value
            }
          }
        />
        <button type="button" onClick=${this.add}>Add</button>
        <hr />
        <${Todos} todos=${this.todos} />
      </div>
    `
  }
})
