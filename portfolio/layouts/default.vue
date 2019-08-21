<template>
   <div class="site">
    <header-component />
    <div class="siteContent">
      <nuxt class="has-text-centered"/>
    </div>


<!-- ▼ ナビゲーションでクリックされたポートフォリオを描画する ▼ -->
    <div class="siteContent" v-if="drawName !== ''">
      <h1>{{ drawObj.name }}</h1>
      <p>{{ drawObj.term }}</p>
    </div>
<!-- ▲ ナビゲーションでクリックされたポートフォリオを描画する ▲ -->

    <work-nav @drawPortfolio="draw" />

<!-- ▼ FIREBASEへの登録（develop環境のみ表示） ▼ -->
  <div v-if="env !== 'production'">
    <ul>
      <li v-for="portfolio in portfolios" :key="portfolio.id">
        <span v-if="portfolio.created">
          <input
          type="checkbox"
          v-bind:checked="portfolio.done"
          @change="toggle(portfolio)">
          <span v-bind:class="{done:portfolio.done}">
            {{ portfolio.name }}{{ portfolio.term }}
          </span>
          <button v-on:click="remove(portfolio.id)">X</button>
        </span>
      </li>
    </ul>
    <div class="form">
      <form v-on:submit.prevent="add">  
        <input v-model="name">
        <input v-model="term">
        <button>Add</button>
      </form>
    </div>
  </div>
<!-- ▲ FIREBASEへの登録（develop環境のみ表示） ▲ -->

    <footer-component />
  </div>
</template>

<script>
  import HeaderComponent from '~/components/header.vue'
  import WorkNav from '~/components/WorkNav.vue'
  import FooterComponent from '~/components/Footer.vue'
    export default {
      components: {
        "header-component": HeaderComponent,
        "work-nav": WorkNav,
        "footer-component": FooterComponent,
      },
      data: function() {
        return {
          // 登録フォーム用data
          name: '',
          term: '',
          done: false,
          // 描画用data
          drawName: '',
          drawObj: [],
          // 環境変数
          env: process.env.NODE_ENV,
        }
      },
      created: function() {
        this.$store.dispatch('portfolios/init')
      },
      methods: {
        add() {
          this.$store.dispatch('portfolios/add',{ name: this.name, term: this.term })
          this.name = ''
          this.term = ''
        },
        remove(id) {
          this.$store.dispatch('portfolios/remove',id)
        },
        // toggle(portfolio) {
        //   this.$store.dispatch('portfolios/toggle',portfolio)
        // }
        draw(name,term) {
          this.drawName = name;
          this.drawObj.name = name;
          this.drawObj.term = term;
        }
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
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
