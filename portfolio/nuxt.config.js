require('dotenv').config()
const authorName = process.env.AUTHOR_NAME
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: authorName + 'のポートフォリオサイト' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: authorName + 'のポートフォリオサイト' || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    // '@nuxtjs/bulma',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources'
  ],
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    cssSourceMap : true,
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  /*
  ** style-resources-moduleで、グローバルで変数やmixinなどを使えるように
  */
  styleResources: {
  //  sass: [
  //   '@/assets/sass/variable.sass'
  //  ],
   scss: [
    '@/assets/scss/ress.scss',
    '@/assets/scss/_valiable.scss',
    // '@/assets/scss/_mixin.scss'
   ],
  //  stylus: [
  //   '@/assets/stylus/layout.styl'
  //  ]
  },
  cssSourceMap : true,
  sourceMap: true,
}
