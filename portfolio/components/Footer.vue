<template>
   <footer class="footer">
       <p>&copy; {{ authorName }} all rights reserved.</p>
        <!-- <p>Source code on <a href="https://github.com/segawaakira/portfolio" target="_blank">GitHub</a></p> -->
   </footer>
</template>

<script>
   export default {
       name: "Footer",
      data: function() {
        return {
          // 環境変数
          authorName: process.env.AUTHOR_NAME,
        }
      },
   }
</script>

<style scoped lang="scss">
.footer {
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    margin-top: -50px;
    padding: 50px 0 20px;
}
</style>