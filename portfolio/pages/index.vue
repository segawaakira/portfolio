<template>
  <div class="container">
    <div>
      <h1 class="title">
        portfolio
      </h1>
      <h2 class="subtitle">
        My flawless Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>

<!-- ▼ FIREBASEへの登録 ▼ -->
    <ul>
      <li v-for="portfolio in portfolios" :key="portfolio.id">
        <span v-if="portfolio.created">
          <input
          type="checkbox"
          v-bind:checked="portfolio.done"
          @change="toggle(portfolio)">
          <span v-bind:class="{done:portfolio.done}">
            {{ portfolio.name }}{{ portfolio.created.toDate() | dateFilter }}
          </span>
          <button v-on:click="remove(portfolio.id)">X</button>
        </span>
      </li>
    </ul>
    <div class="form">
      <form v-on:submit.prevent="add">
        <input v-model="name">
        <button>Add</button>
      </form>
    </div>
<!-- ▲ FIREBASEへの登録 ▲ -->

  </div>
</template>

<script>
export default {
  data: function() {
    return {
      name: '',
      done: false
    }
  },
  created: function() {
    this.$store.dispatch('portfolios/init')
  },
  methods: {
    add() {
      this.$store.dispatch('portfolios/add',this.name)
      this.name = ''
    },
    // remove(id) {
    //   this.$store.dispatch('portfolios/remove',id)
    // },
    // toggle(portfolio) {
    //   this.$store.dispatch('portfolios/toggle',portfolio)
    // }
  },
  computed: {
    portfolios() {
     return this.$store.state.portfolios.portfolios
    // return this.$store.getters['portfolios/orderdPortfolios']
    }
  },
  // filters: {
  //   dateFilter: function(date) {
  //     return moment(date).format('YYYY/MM/DD HH:mm:ss')
  //   }
  // }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
