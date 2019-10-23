<template>
   <header class="header section">
      <h1 class="header_title">
        {{ authorName }}
      </h1>
      <nav class="header_menu">
        <ul>
          <li>
            <a href="/">PORTFOLIO</a>
          </li>
          <li>
            <a href="/">ABOUT</a>
          </li>
          <li>
            <a href="/">BLOG</a>
          </li>
          <li>
            <a href="/">CONTACT</a>
          </li>
        </ul>
      </nav>
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
    display: flex;
    height: 100px;
    width: 100%;
    justify-content: space-between;
    padding: 20px 50px;

    &_title {
      font-size: 32px;
      font-weight: bold;
    }
    &_menu {
      ul {
        li {
            margin-bottom: 1rem;
          a {
            font-size: 16px;
            font-weight: bold;
            color: #333;
          }
        }
      }

    }
  }
</style>