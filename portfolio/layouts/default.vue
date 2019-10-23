<template>
   <div class="site">
    <div id="cursor"></div>
    <div id="follower"></div>  
    <header-component />
    <div class="siteContent">
    <div class="siteContent_inner">
      <nuxt class="has-text-centered"/>

<!-- ▼ ナビゲーションでクリックされたポートフォリオを描画する ▼ -->
<section id="js-portfolio" class="section portfolio_section" v-if="drawName !== ''">
    <div class="columns">
      <div class="column is-full">
        <h1 class="title is-size-1-tablet is-size-3-mobile">{{ drawObj.name }}</h1>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <h2 class="title is-6 has-text-weight-bold">制作時期</h2>
        <div class="content">
          <p>{{ drawObj.term }}</p>
        </div>
        <h2 class="title is-6 has-text-weight-bold">説明</h2>
        <div class="content">
          <p>{{ drawObj.description }}</p>
        </div>
        <h2 class="title is-6 has-text-weight-bold">URL</h2>
        <div class="content">
          <p><a :href="drawObj.url" target="_blank">{{ drawObj.url }}</a></p>
        </div>
        <h2 class="title is-6 has-text-weight-bold">使用技術</h2>
        <div class="content">
          <ul class="portfolio_tech">
            <li v-for="technology in drawObj.technologies" :key="technology">{{ technology }}</li>
          </ul>
        </div>
      </div>
      <div class="column is-two-thirds">
        <figure v-for="image in drawObj.images" :key="image" style="text-align:center;">
          <img v-bind:src="image">
        </figure>
    </div>
  </div>
</section>
<!-- ▲ ナビゲーションでクリックされたポートフォリオを描画する ▲ -->

    <work-nav @drawPortfolio="draw" />

<!-- ▼ FIREBASEへの登録（特定uidでログインしている時のみ表示） ▼ -->
  <div v-if="isLogin === true && uid === adminUid">

    <section class="section has-background-white-bis">
      <div class="container">
        <div style="max-width:500px;width:100%;text-align:left;">
          <h2 class="title is-3">作品一覧</h2>
          <h3 class="subtitle is-6 has-text-weight-bold">Xボタンクリックで削除出来ます</h3>
          <ul>
            <li v-for="portfolio in portfolios" :key="portfolio.id">
              <span v-if="portfolio.created">
                <span>
                  {{ portfolio.name }}{{ portfolio.term }}
                </span>
                <button v-on:click="remove(portfolio.id,portfolio.name)">X</button>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section has-background-white-bis">
      <div class="container">
        <div style="max-width:500px;width:100%;text-align:left;">
          <h2 class="title is-3">作品追加登録フォーム</h2>
          <form v-on:submit.prevent="add">
            <div class="field">
            <label class="label">作品名</label>
            <div class="control">
              <input class="input" type="text" v-model="name">
            </div>
          </div>
          <div class="field">
            <label class="label">期間</label>
            <div class="control">
              <input class="input" type="text" v-model="term">
            </div>
          </div>
          <div class="field">
            <label class="label">説明</label>
            <div class="control">
              <textarea class="textarea" v-model="description"></textarea>
            </div>
          </div>
          <div class="field">
            <label class="label">URL</label>
            <div class="control">
              <input class="input" type="text" v-model="url">
            </div>
          </div>
          <div class="field">
            <label class="label">画像</label>
            <div class="control" v-for="image in images" :key="image" @click="removeImages(image)">
              {{ image }}
            </div>
            <input class="input" type="text" v-model="newImage">
            <a class="button is-text is-small" @click="addImages()">
              画像を追加
            </a>
          </div>
          <div class="field">
            <label class="label">使用技術</label>
            <div class="control" v-for="technology in technologies" :key="technology" @click="removeTechnologies(technology)">
              {{ technology }}
            </div>
            <input class="input" type="text" v-model="newTechnology">
            <a class="button is-text is-small" @click="addTechnologies()">
              使用技術を追加
            </a>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-link">送信する</button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </section>
  </div>
<!-- ▲ FIREBASEへの登録（特定uidでログインしている時のみ表示） ▲ -->

<!-- ▼ GOOGLE LOGIN or LOGOUTボタン ▼ -->
<!-- <section class="section" style="text-align:right;" v-if="!isLogin">
  <button class="button is-text is-small" @click="googleLogin">
    Googleアカウントでログイン
  </button>
</section>
<section class="section has-background-white-bis" style="text-align:right;" v-else>
  <button class="button is-text is-small" @click="googleLogout">
    Googleアカウントからログアウト
  </button>
</section> -->
<!-- ▲ GOOGLE LOGIN or LOGOUTボタン ▲ -->

<!-- ▼ 特定uid以外でログインした場合 ▼ -->
<section class="section has-background-white-bis" v-if="isLogin === true && uid !== adminUid">
  <div class="notification is-danger">
    <p>
      管理者以外のGoogleアカウントでログインされています。
    </p>
  </div>
</section>
<!-- ▲ 特定uid以外でログインした場合 ▲ -->

    </div>
    </div>
    <footer-component />
    <!-- ▼ LOADING ▼ -->
    <div id="js-loading" class="portfolio_loading">
      <div id="container">
        NOW LOADING
      </div>
      <!-- <div class="sk-fading-circle">
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
      </div> -->
    </div>
    <!-- ▲ LOADING ▲ -->
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
      mounted: function () {
        // プログレスバー
        var bar = new ProgressBar.Line(container, {
          strokeWidth: 4,
          easing: 'easeInOut',
          duration: 1400,
          color: '#FFEA82',
          trailColor: '#eee',
          trailWidth: 1,
          svgStyle: {width: '100%', height: '100%'}
        });

        bar.animate(1.0);
      // ポインター
      var
        cursor = document.getElementById("cursor"),
        follower = document.getElementById("follower"),
        cWidth = 8, //カーソルの大きさ
        fWidth = 40, //フォロワーの大きさ
        delay = 10, //数字を大きくするとフォロワーがより遅れて来る
        mouseX = 0, //マウスのX座標
        mouseY = 0, //マウスのY座標
        posX = 0, //フォロワーのX座標
        posY = 0; //フォロワーのX座標

        //カーソルの遅延アニメーション
        //ほんの少ーーーしだけ遅延させる 0.001秒
        TweenMax.to({}, .001, {
          repeat: -1,
          onRepeat: function() {
            posX += (mouseX - posX) / delay;
            posY += (mouseY - posY) / delay;
            
            TweenMax.set(follower, {
                css: {    
                  left: posX - (fWidth / 2),
                  top: posY - (fWidth / 2)
                }
            });
            
            TweenMax.set(cursor, {
                css: {    
                  left: mouseX - (cWidth / 2),
                  top: mouseY - (cWidth / 2)
                }
            });
          }
        });

        document.onmousemove = function (e){
          mouseX = e.pageX;
          mouseY = e.pageY;
        };

        var linkTag = document.getElementsByTagName('a');
        for(var i = 0; i < linkTag.length; i++) {
          linkTag[i].onmouseenter = function (e){
            cursor.classList.add("is-active");
            follower.classList.add("is-active");
          };
          linkTag[i].onmouseleave = function (e){
            cursor.classList.remove("is-active");
            follower.classList.remove("is-active");
          };
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
        remove(id,name) {
          const result = window.confirm(name+'を削除してもよろしいですか？');
          if( result ) {
            this.$store.dispatch('portfolios/remove',id)
          }
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
        },
        window:onload = function() {
          const loading = document.getElementById("js-loading")
          setTimeout(function(){
            loading.classList.add("is-loaded")
            setTimeout(function(){
              loading.style.display = 'none'
            }, 1000);
          }, 1000);
        },
      },
      computed: {
        portfolios() {
          return this.$store.state.portfolios.portfolios
        }
      },
      updated: function() {
        this.drawObj.images
      }
    }
</script>

<style lang="scss">


/* プログレスバー */
#container {
  margin: 20px;
  width: 400px;
  height: 8px;
}



    /* カーソル */
    #cursor,
    #follower {
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0; 
      pointer-events: none;
    }

    #cursor {
      width: 8px;
      height: 8px;
      background-color: #000;
      z-index: 1001;
    }

    #follower {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      opacity: 0.5;
      background-color: #fdfe00;
      z-index: 1000;
      transition: transform ease .1s;
      text-align: center;
    }
    #follower span {
      display: inline-block;
      font-size: 14px;
      font-weight: bold;
      transform: scale(0);
    }
    #follower.is-active {
      transform: scale(3);
    }

    .btn {
        display: inline-block;
        width: 160px;
        margin: 16px;
        text-align: center;
        font-size: 16px;
        line-height: 1;
    }
    .btn a {
      display: block;
      color: #fff;
      text-decoration: none;
      padding: 16px;
      background-color: #000;
      cursor: none;
    }

.site {
    cursor: none;
  background-color: #FAFAFA;
}

.siteContent {
  margin-top: 100px;
  padding: 0 50px;
  &_inner {
    margin: 0 auto;
    max-width: 1200px;
    word-break: break-all;
  }
  h1 {
    margin-bottom: 30px;
    line-height: 2.5rem;
  }
}

.portfolio {
  &_loading {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: #fff;
    opacity: 1;
    transition: all 1s;
    &.is-loaded {
        opacity: 0;
    }
  }
  &_section {
    min-height: 100vh;
  }
  &_content {
    display: flex;
    &_l {

    }
    &_r {

    }
    
  }
}

// loading
.sk-fading-circle {
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
}

.sk-fading-circle .sk-circle {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.sk-fading-circle .sk-circle:before {
  content: '';
  display: block;
  margin: 0 auto;
  width: 15%;
  height: 15%;
  background-color: #333;
  border-radius: 100%;
  -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
          animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
}
.sk-fading-circle .sk-circle2 {
  -webkit-transform: rotate(30deg);
      -ms-transform: rotate(30deg);
          transform: rotate(30deg);
}
.sk-fading-circle .sk-circle3 {
  -webkit-transform: rotate(60deg);
      -ms-transform: rotate(60deg);
          transform: rotate(60deg);
}
.sk-fading-circle .sk-circle4 {
  -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
          transform: rotate(90deg);
}
.sk-fading-circle .sk-circle5 {
  -webkit-transform: rotate(120deg);
      -ms-transform: rotate(120deg);
          transform: rotate(120deg);
}
.sk-fading-circle .sk-circle6 {
  -webkit-transform: rotate(150deg);
      -ms-transform: rotate(150deg);
          transform: rotate(150deg);
}
.sk-fading-circle .sk-circle7 {
  -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
          transform: rotate(180deg);
}
.sk-fading-circle .sk-circle8 {
  -webkit-transform: rotate(210deg);
      -ms-transform: rotate(210deg);
          transform: rotate(210deg);
}
.sk-fading-circle .sk-circle9 {
  -webkit-transform: rotate(240deg);
      -ms-transform: rotate(240deg);
          transform: rotate(240deg);
}
.sk-fading-circle .sk-circle10 {
  -webkit-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
          transform: rotate(270deg);
}
.sk-fading-circle .sk-circle11 {
  -webkit-transform: rotate(300deg);
      -ms-transform: rotate(300deg);
          transform: rotate(300deg); 
}
.sk-fading-circle .sk-circle12 {
  -webkit-transform: rotate(330deg);
      -ms-transform: rotate(330deg);
          transform: rotate(330deg); 
}
.sk-fading-circle .sk-circle2:before {
  -webkit-animation-delay: -1.1s;
          animation-delay: -1.1s; 
}
.sk-fading-circle .sk-circle3:before {
  -webkit-animation-delay: -1s;
          animation-delay: -1s; 
}
.sk-fading-circle .sk-circle4:before {
  -webkit-animation-delay: -0.9s;
          animation-delay: -0.9s; 
}
.sk-fading-circle .sk-circle5:before {
  -webkit-animation-delay: -0.8s;
          animation-delay: -0.8s; 
}
.sk-fading-circle .sk-circle6:before {
  -webkit-animation-delay: -0.7s;
          animation-delay: -0.7s; 
}
.sk-fading-circle .sk-circle7:before {
  -webkit-animation-delay: -0.6s;
          animation-delay: -0.6s; 
}
.sk-fading-circle .sk-circle8:before {
  -webkit-animation-delay: -0.5s;
          animation-delay: -0.5s; 
}
.sk-fading-circle .sk-circle9:before {
  -webkit-animation-delay: -0.4s;
          animation-delay: -0.4s;
}
.sk-fading-circle .sk-circle10:before {
  -webkit-animation-delay: -0.3s;
          animation-delay: -0.3s;
}
.sk-fading-circle .sk-circle11:before {
  -webkit-animation-delay: -0.2s;
          animation-delay: -0.2s;
}
.sk-fading-circle .sk-circle12:before {
  -webkit-animation-delay: -0.1s;
          animation-delay: -0.1s;
}

@-webkit-keyframes sk-circleFadeDelay {
  0%, 39%, 100% { opacity: 0; }
  40% { opacity: 1; }
}

@keyframes sk-circleFadeDelay {
  0%, 39%, 100% { opacity: 0; }
  40% { opacity: 1; } 
}
</style>
