<template>
  <div id="jokes">
    <h1>Нажми на кнопку и получи смешинку!</h1>
    <div class="joke-container">
      <div v-html="jokeText"></div>
    </div>
    <app-button @click="generateJoke" class="joke-btn">Жмяк</app-button>
  </div>
</template>

<script>
import JQuery from 'jquery';

const $ = JQuery;

export default {
  name: "AppJokes",
  data() {
    return {
      jokes: [],
      joke: '',
      jokeIterator: 1,
      jokeText: 'Pulling Jokes...',
      author: '',
      link: '',
    };
  },
  methods: {
    generateJoke() {
      const jokeNum = this.jokes.length
      const jokeQuestion = this.jokes[this.jokeIterator].joke
      const jokePunchline = this.jokes[this.jokeIterator].punchline
      this.jokeText = `${jokeQuestion}<br><br>${jokePunchline}`
      this.jokeIterator = this.jokeIterator < jokeNum - 1 ? this.jokeIterator + 1 : 1
    },
  },
  created() {
    const _this = this
    const _jokes = this.jokes
    const _generateJoke = this.generateJoke
    $.getJSON('https://www.reddit.com/r/jokes.json', (json) => {
      _this.json = json;
      _this.json.data.children.forEach((element) => {
        const j = element.data.title
        const p = element.data.selftext
        const a = element.data.author
        const l = element.data.permalink
        _jokes.push({
          joke: j,
          punchline: p,
          author: a,
          link: l,
        })
      })
      _generateJoke()
    })
  },
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

#jokes {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.joke-container {
  min-height: 10vh;
  max-width: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 10px 0;
  flex-direction: column;
}

.joke-btn {
  border: #3aa629 !important;
  background-color: #46fa03 !important;
}

.joke-btn:hover {
  border-color: rgb(84, 115, 84) !important;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgb(70, 250, 3) !important;
}

</style>