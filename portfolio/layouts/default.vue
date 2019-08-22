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
      <p v-for="image in drawObj.images" :key="image">{{ image }}</p>
      <p v-for="technology in drawObj.technologies" :key="technology">{{ technology }}</p>
    </div>
<!-- ▲ ナビゲーションでクリックされたポートフォリオを描画する ▲ -->

    <work-nav @drawPortfolio="draw" />

<!-- ▼ GOOGLE LOGIN or LOGOUTボタン ▼ -->
  <button @click="googleLogin" v-if="!isLogin">
    Googleアカウントでログイン
  </button>
  <button @click="googleLogout" v-else>
    Googleアカウントからログアウト
  </button>
<!-- ▲ GOOGLE LOGIN or LOGOUTボタン ▲ -->

<!-- ▼ FIREBASEへの登録（特定uidでログインしている時のみ表示） ▼ -->
  <div v-if="isLogin === true && uid === adminUid">
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
        <span v-for="image in images" :key="image" @click="removeImages(image)">
          {{ image }}
        </span>
        <input v-model="newImage">
        <a @click="addImages()">
          Add image
        </a>
        <span v-for="technology in technologies" :key="technology" @click="removeTechnologies(technology)">
          {{ technology }}
        </span>
        <input v-model="newTechnology">
        <a @click="addTechnologies()">
          Add technology
        </a>
        <button>Add</button>
      </form>
    </div>
  </div>
<!-- ▲ FIREBASEへの登録（特定uidでログインしている時のみ表示） ▲ -->

<!-- ▼ 特定uid以外でログインした場合 ▼ -->
<div v-if="isLogin === true && uid !== adminUid">
  <p>
    管理者以外のGoogleアカウントでログインされています。
  </p>
</div>
<!-- ▲ 特定uid以外でログインした場合 ▲ -->

    <footer-component />
  </div>
</template>

<script>
  import firebase, { functions } from 'firebase'
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
          newImage: '',
          images: [],
          newTechnology: '',
          technologies: [],
          // 描画用data
          drawName: '',
          drawObj: [],
          // 環境変数
          env: process.env.NODE_ENV,
          adminUid: process.env.GOOGLE_ID,
          // Google認証周り
          isLogin: false,
          displayName : '',
          email : '',
          emailVerified : '',
          photoURL : '',
          isAnonymous : '',
          uid : '',
          providerData : '',
        }
      },
      created: function() {
        this.$store.dispatch('portfolios/init')
        firebase.auth().onAuthStateChanged(user=>{
          if(user){
            this.isLogin = true
            this.displayName = user.displayName;
            this.email = user.email
            this.emailVerified = user.emailVerified
            this.photoURL = user.photoURL
            this.isAnonymous = user.isAnonymous
            this.uid = user.uid
            this.providerData = user.providerData
          }else{
            this.isLogin=false;
          };
        });

      },
      methods: {
        add() {
          this.$store.dispatch('portfolios/add',{
            name: this.name,
            term: this.term,
            description: this.description,
            url: this.url,
            images: this.images,
            technologies: this.technologies,
          })
          this.name = ''
          this.term = ''
          this.description = ''
          this.url = ''
          this.images = []
          this.technologies = []
        },
        remove(id) {
          this.$store.dispatch('portfolios/remove',id)
        },
        draw(name,term,description,url,images,technologies) {
          this.drawName = name;
          this.drawObj.name = name;
          this.drawObj.term = term;
          this.drawObj.description = description;
          this.drawObj.url = url;
          this.drawObj.images = images;
          this.drawObj.technologies = technologies
        },
        addImages() {
          if( this.newImage == '' ) {
            return
          }
          this.images.push(this.newImage);
          this.newImage = '';
        },
        removeImages(name) {
          const idx = this.images.indexOf(name);
          if(idx >= 0){
            this.images.splice(idx, 1); 
          }
        },
        addTechnologies() {
          if( this.newTechnology == '' ) {
            return
          }
          this.technologies.push(this.newTechnology);
          this.newTechnology = '';
        },
        removeTechnologies(name) {
          const idx = this.technologies.indexOf(name);
          if(idx >= 0){
            this.technologies.splice(idx, 1); 
          }
        },
        googleLogin : function() {
          const provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithRedirect(provider);
        },
        googleLogout : function() {
          firebase.auth().signOut().then(()=>{
            console.log("ログアウトしました");
          })
          .catch( (error)=>{
            console.log(`ログアウト時にエラーが発生しました (${error})`);
          });
        }
      },
      computed: {
        portfolios() {
          return this.$store.state.portfolios.portfolios
        // return this.$store.getters['portfolios/orderdPortfolios']
        }
      },
      updated: function() {
        this.drawObj.images
      }
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
