<template>
    <div class="container">
    <nav class="nav">
        <ul>
          <li v-for="portfolio in portfolios" :key="portfolio.id">
                <a @click="$emit('drawPortfolio', 
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
   .nav {
    //    padding: 0.5em;
   }
</style>