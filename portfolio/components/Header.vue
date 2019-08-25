<template>
   <header class="header section">
      <h1 class="header_title">
          せがわあきらのポートフォリオサイト
      </h1>
   </header>
</template>

<script>
   export default {
    //   name: "WorkNav"
   }
</script>

<style scoped lang="scss">
  .header {
    background-color: #FAFAFA;
    position: absolute;
    top: 0;
    display: flex;
    height: 100px;
    align-items: center;
    width: 100%;
    justify-content: center;
    &_title {
      // -webkit-writing-mode: vertical-rl;
      //     -ms-writing-mode: tb-rl;
      //         writing-mode: vertical-rl;
    }
  }
</style>