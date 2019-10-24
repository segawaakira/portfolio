<template>
  <div>
  </div>
</template>

<script>
export default {
  mounted: function () {
  },
}
</script>

<style lang="scss">


.container {
  margin: 0 auto;
  // min-height: 100vh;
  /* display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; */
}

.title {
  /* font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; */
  display: block;
  font-weight: bold;
  font-size: 16px;
  margin: 1rem 0 0.5rem;
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

.portfolio{
  &_columns {
    display: flex;
    flex-direction: row;
    @media screen and ( max-width:$break) {
      flex-direction: column;
    }
  }
  &_column {
    &.is-two-thirds {
      width: 66.6666%;
      flex: none;
      padding: 0 30px;
      @media screen and ( max-width:$break) {
        width: 100%;
        margin-top: 20px;
        padding: 0;
      }
    }
  }
  &_tech {
    list-style: disc;
    padding-left: 1.5rem;
  }
}
</style>
