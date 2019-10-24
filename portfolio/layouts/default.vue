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
    <div class="portfolio_columns">
      <div class="column is-full">
        <h1 class="title is-size-1-tablet is-size-3-mobile">{{ drawObj.name }}</h1>
      </div>
    </div>
    <div class="portfolio_columns">
      <div class="portfolio_column">
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
      <div class="portfolio_column is-two-thirds">
        <figure v-for="image in drawObj.images" :key="image" style="text-align:center;">
          <img v-bind:src="image">
        </figure>
    </div>
  </div>
</section>
<!-- ▲ ナビゲーションでクリックされたポートフォリオを描画する ▲ -->

<div class="portfolio_worknav" :class="{ is_active: drawWorkNav === true }">
  <work-nav @drawPortfolio="draw" />
</div>

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
              <label class="label">番号</label>
              <div class="control">
                <input class="input" type="text" v-model="order">
              </div>
            </div>
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

    </div><!-- / .siteContent_inner -->
    </div><!-- / .siteContent -->
    <!-- ▼ NEXT、PREVボタン ▼ -->
    <section class="portfolio_link" v-if="drawWorkLink">
      <a href="#js-portfolio" @click="prev" class="portfolio_link_prev" :class="{ is_active: drawWorkNum !== 1 }">
        <div class="portfolio_link_wrap is-prev">
          PREV
          <span class="portfolio_link_border is-prev"></span>
        </div>
      </a>
      <a href="#__nuxt" class="portfolio_link_back" @click="backToTop">
        <div class="portfolio_link_wrap">
          BACK TO TOP
        </div>
      </a>
      <a href="#js-portfolio" @click="next" class="portfolio_link_next" :class="{ is_active: drawWorkNum !== drawWorkLength }">
        <div class="portfolio_link_wrap is-next">
          NEXT
          <span class="portfolio_link_border is-next"></span>
        </div>
      </a>
    </section>
    <!-- ▲ NEXT、PREVボタン ▲ -->
    <footer-component />
    <!-- ▼ LOADING ▼ -->
    <div id="js-loading" class="portfolio_loading">
      <div id="container">
        NOW LOADING
      </div>
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
          order: '',
          description: '',
          url: '',
          newImage: '',
          images: [],
          newTechnology: '',
          technologies: [],
          // 描画用data
          drawName: '',
          drawObj: [],
          drawWorkNav: true,
          drawWorkLink: false,
          drawWorkNum: '',
          drawWorkLength: '',
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
            order: this.order,
            term: this.term,
            description: this.description,
            url: this.url,
            images: this.images,
            technologies: this.technologies,
          })
          this.name = ''
          this.order = ''
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
        draw(order,name,term,description,url,images,technologies) {
          this.drawWorkNum = order;
          this.drawObj.order = order;
          this.drawName = name;
          this.drawObj.name = name;
          this.drawObj.term = term;
          this.drawObj.description = description;
          this.drawObj.url = url;
          this.drawObj.images = images;
          this.drawObj.technologies = technologies;
          this.drawWorkNav = false;
          this.drawWorkLink = true;
        },
        next() {
          const nextNum = this.drawWorkNum + 1;
          const nextLinkId = "js-portfolio-order-" + nextNum;
          document.getElementById(nextLinkId).click()
        },
        prev() {
          const prevNum = this.drawWorkNum - 1;
          const prevLinkId = "js-portfolio-order-" + prevNum;
          document.getElementById(prevLinkId).click()
        },
        backToTop() {
          this.smoothLink();
          this.drawWorkNav = true;
          this.drawWorkLink = false;
          this.drawName = '';
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
        smoothLink(){
          const headH = 0;
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
                setTimeout(function(){
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
                }, 100);
            });
          }
        },
      },
      computed: {
        portfolios() {
          return this.$store.state.portfolios.portfolios
        }
      },
      updated: function() {
        this.drawObj.images
        this.drawWorkLength = document.getElementsByClassName("worknav_item").length
        console.log(this.drawWorkNum)
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
  min-height: 100vh;
  position: relative;
}

.siteContent {
  margin-top: 100px;
  padding: 0 50px 100px;
  &_inner {
    margin: 0 auto;
    max-width: 1200px;
    word-break: break-all;
  }
  h1 {
    margin-bottom: 30px;
    line-height: 2.5rem;
    font-size: 48px;
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
  &_link {
    display: flex;
    justify-content: space-between;
    padding: 50px 0 200px;
    position: relative;
    overflow: hidden;
    font-size: 16px;
    @media screen and ( max-width:$break) {
      font-size: 14px;
    }
    &_wrap {
      width: 200px;
      height: 50px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      overflow: hidden;
      @media screen and ( max-width:$break) {
        width: 100px;
      }
      &.is-prev, &.is-next {
        @media screen and ( max-width:$break) {
          width: 80px;
        }
      } 
      &.is-prev {
        align-items: flex-end;
      } 
      &.is-next {
        align-items: flex-start;
      } 
      @media screen and ( max-width:$break) {
        .portfolio_link_border {
          &.is-prev {
            left: 0;
          } 
          &.is-next {
            right: 0;
          } 
        }
      }
      &:hover {
        .portfolio_link_border {
          &.is-prev {
            left: 0;
          } 
          &.is-next {
            right: 0;
          } 
        }
      }
    }
    &_border {
      width: 100%;
      border-bottom: 1px solid #333;
      position: absolute;
      bottom: 0;
      transition: all .3s ease-out;
      &.is-prev {
        left: -100%;
      } 
      &.is-next {
        right: -100%;
      } 
    }
    a {
      color: #333;
      &:hover {
        text-decoration: none;
      }
    }
    &_prev,
    &_next {
      display: none;
      position: absolute;
      &.is_active {
        display: block;
      }
    }
    &_prev{
      left: 0%;
    }
    &_next{
      right: 0%;
    }
    &_back{
      position: absolute;
      left: 50%;
      width: 200px;
      text-align: center;
      margin-left: -100px;
      @media screen and ( max-width:$break) {
        width: 100px;
        margin-left: -50px;
      }
    }
  }
  &_worknav {
    display: none;
    &.is_active {
      display: block;
    }
  }
}

</style>
