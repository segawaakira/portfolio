<template>
   <div class="site">
    <header-component />
    <div class="siteContent">
      <nuxt class="has-text-centered"/>
    </div>

<!-- ▼ ナビゲーションでクリックされたポートフォリオを描画する ▼ -->
<section id="js-portfolio" class="section" v-if="drawName !== ''">
    <div class="columns">
      <div class="column is-full">
        <h1 class="title is-1">{{ drawObj.name }}</h1>
      </div>
    </div>
    <div class="columns">
      <div class="column is-half">
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
      <div class="column is-half">
        <figure v-for="image in drawObj.images" :key="image" >
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
<section class="section" style="text-align:right;" v-if="!isLogin">
  <button class="button is-text" @click="googleLogin">
    Googleアカウントでログイン
  </button>
</section>
<section class="section has-background-white-bis" style="text-align:right;" v-else>
  <button class="button is-text" @click="googleLogout">
    Googleアカウントからログアウト
  </button>
</section>
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

    <footer-component />
    <!-- ▼ LOADING ▼ -->
    <div id="js-loading" class="button portfolio_loading is-loading"></div>
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
        setTimeout(function(){
          document.getElementById("js-loading").style.display="none"
        }, 1000);
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
          // ポートフォリオの箇所にスクロール
          // setTimeout(function(){
          //   document.getElementById("js-portfolio").style.display="none"
          // }, 1000);
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
        smoothLink(headH = 0) {
          const interval = 10;               //スクロール処理を繰り返す間隔
          const divisor = 8;                  //近づく割合（数値が大きいほどゆっくり近く）
          const range = (divisor / 2) + 1;    //どこまで近づけば処理を終了するか(無限ループにならないように divisor から算出)
          const links = document.querySelectorAll('a[href^="#"]');

          for (let i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function (e) {
              e.preventDefault();
              let toY;
              let nowY = window.pageYOffset;                       //現在のスクロール値
              const href = e.target.getAttribute('href');          //href取得
              const target = document.querySelector(href);         //リンク先の要素（ターゲット）取得
              const targetRect = target.getBoundingClientRect();   //ターゲットの座標取得
              const targetY = targetRect.top + nowY - headH;        //現在のスクロール値 & ヘッダーの高さを踏まえた座標
              //スクロール終了まで繰り返す処理
              (function doScroll() {
                toY = nowY + Math.round((targetY - nowY) / divisor);  //次に移動する場所（近く割合は除数による。）
                window.scrollTo(0, toY);                              //スクロールさせる
                nowY = toY;                                           //nowY更新
                if (document.body.clientHeight - window.innerHeight < toY) {
                  //最下部にスクロールしても対象まで届かない場合は下限までスクロールして強制終了
                  window.scrollTo(0, document.body.clientHeight);
                  return;
                }
                if (toY >= targetY + range || toY <= targetY - range) {
                  //+-rangeの範囲内へ近くまで繰り返す
                  window.setTimeout(doScroll, interval);
                } else {
                  //+-range の範囲内にくれば正確な値へ移動して終了。
                  window.scrollTo(0, targetY);
                }
              })();
            });
          }
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
        this.smoothLink()
      }
      // filters: {
      //   dateFilter: function(date) {
      //     return moment(date).format('YYYY/MM/DD HH:mm:ss')
      //   }
      // }
    }
</script>

<style lang="scss" scoped>
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

.portfolio {
  &_loading {
    width: 100%;
    height: 100vh;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: #fff;
    transition: all 1s;
  }
  &_content {
    display: flex;
    &_l {

    }
    &_r {

    }
    
  }
}
</style>
