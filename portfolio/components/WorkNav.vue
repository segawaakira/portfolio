<template>
  <section class="section worknav">
    <div class="container">
      <nav class="nav">
        <ul>
        <li v-for="portfolio in portfolios" :key="portfolio.id">
          <a href="#js-portfolio" @click="$emit('drawPortfolio', 
                portfolio.name,
                portfolio.term,
                portfolio.description,
                portfolio.url,
                portfolio.images,
                portfolio.technologies,
                )">
                {{ portfolio.name }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
   export default {
  created: function() {
    this.$store.dispatch('portfolios/init')
  },
  computed: {
    portfolios() {
      return this.$store.state.portfolios.portfolios
    // return this.$store.getters['portfolios/orderdPortfolios']
    }
  },
   }
</script>

<style scoped lang="scss">
   .worknav {
     margin-top: -100px;
   }
</style>