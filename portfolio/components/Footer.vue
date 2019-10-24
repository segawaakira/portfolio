<template>
   <footer class="footer">
        <p>Source code on <a href="https://github.com/segawaakira/portfolio" target="_blank">GitHub</a></p>
   </footer>
</template>

<script>
   export default {
       name: "Footer"
   }
</script>

<style scoped lang="scss">
.footer {
    padding: 0.5em;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    margin-top: -50px;
    padding-top: 50px;
}
</style>