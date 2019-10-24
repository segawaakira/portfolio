<template>
   <header class="header section">
      <h1 class="header_title">
        {{ authorName }}
      </h1>
      <nav class="header_menu">
        <ul>
          <!-- <li>
            <a href="/">PORTFOLIO</a>
          </li>
          <li>
            <a href="/">ABOUT</a>
          </li> -->
          <li>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfFugwqIZ1WnhbpKjhd8ON3WUP-misybIPusA1ULCgjcaOX6A/viewform" target="_blank">CONTACT</a>
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
    align-items: baseline;
    width: 100%;
    justify-content: space-between;
    padding: 50px 50px 30px;
    @media screen and ( max-width:$break) {
      padding: 20px 30px;
    }

    &_title {
      font-size: 32px;
      font-weight: bold;
      @media screen and ( max-width:$break) {
        font-size: 20px;
      }
    }
    &_menu {
      ul {
        display: flex;
        li {
            margin-right: 30px;
            &:last-child {
              margin-right: 0;
            }
          a {
            font-size: 16px;
            color: #333;
            &:hover {
              text-decoration: none;
            }
            @media screen and ( max-width:$break) {
              font-size: 14px;
            }
          }
        }
      }

    }
  }
</style>