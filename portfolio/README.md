# portfolio

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build

```

## ディレクトリ構成
``` 
~/
├─ assets
    画像など
├─ components
    単一ファイルコンポーネント
├─ dist
    npm run build　でデプロイした本番公開用ファイル
├─ layouts
    サイト共通のレイアウト定義
├─　middleware
     ※今回は利用していません。
    　 アプリケーションのミドルウェアを入れます。ページやページグループ（レイアウト）をレンダリングするよりも前に実行されるカスタム関数を定義できます。
├─ pages
    URLとなるビューファイル
├─ plugins
    グローバルで利用出来る関数や定数
├─ static
    robots.txt や favicon.icoなどの静的ファイル
└─ store
    Vuex ストア のファイル
```

## .envファイルについて
portfolioディレクトリのルートに.envファイルを作成します。
※FirebaseのProject IDなどを含むので、Git管理対象外としています。
firebaseのproject idと、管理用のGoogleアカウントのuidと、使用する人の名前を設定します。

### 参考.envファイル
``` 
FIREBASE_PROJECT_ID = '●●●'
GOOGLE_ID = '●●●'
AUTHOR_NAME = '●●●'
```