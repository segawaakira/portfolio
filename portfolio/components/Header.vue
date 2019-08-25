<template>
   <header class="header section">
      <h1 class="header_title">
        {{ authorName }}のポートフォリオサイト
      </h1>
   </header>
</template>

<script>
   export default {
      data: function() {
        return {
          // 環境変数
          authorName: process.env.AUTHOR_NAME,
        }
      },
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
  }
</style>