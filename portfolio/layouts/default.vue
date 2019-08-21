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
      <p>{{ drawObj.description }}</p>
      <p>{{ drawObj.url }}</p>
    </div>
<!-- ▲ ナビゲーションでクリックされたポートフォリオを描画する ▲ -->

    <work-nav @drawPortfolio="draw" />

<!-- ▼ FIREBASEへの登録（develop環境のみ表示） ▼ -->
  <div v-if="env !== 'production'">
    <ul>
      <li v-for="portfolio in portfolios" :key="portfolio.id">
        <span v-if="portfolio.created">
          <span>
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
        <input v-model="description">
        <input v-model="url">
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
          description: '',
          url: '',
          image: [],
          technology: [],
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
          this.$store.dispatch('portfolios/add',{
            name: this.name,
            term: this.term,
            description: this.description,
            url: this.url,
            // image: this.image,
            // technology: this.technology,
          })
          this.name = ''
          this.term = ''
          this.description = ''
          this.url = ''
          this.image = []
          this.technology = []
        },
        remove(id) {
          this.$store.dispatch('portfolios/remove',id)
        },
        draw(name,term,description,url) {
          this.drawName = name;
          this.drawObj.name = name;
          this.drawObj.term = term;
          this.drawObj.description = description;
          this.drawObj.url = url;
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
