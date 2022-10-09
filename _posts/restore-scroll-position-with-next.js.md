---
title: 'Next.jsでブラウザバックした際にスクロール位置を復元したい'
date: '2022-10-04'
ogImage:
  url: '/assets/blog/dynamic-routing/cover.jpg'
tags: ['next.js']
---

## 目次

## 背景

Next.js で実装している時に気づいたのですが、SSG しているページから別ページへ遷移してブラウザバックすると、ページの一番上にスクロールしてしまいます。

感覚としては元のスクロール位置を表示してほしいのですが、なぜか特定のページだけうまくいきません。

これではユーザー体験が良くないので、直していこうと思います。

### 環境

- "react": "^18.2.0"
- "next": "^12.0.10"

## next.config.js の experimental.scrollRestoration を true にする

調査してみたところ、同じ現象に言及している方々を見つけました。

[【Next.js】ブラウザバック時にスクロール位置を強制的に元に戻す](https://zenn.dev/catnose99/scraps/f9b00c9acf81b4)

> next.config.js の experimental.scrollRestoration を true にすることで、ブラウザバック時もスクロール位置が復帰するようになりました！

[ブラウザバックした際に遷移前にスクロールしていたところに戻ってほしい · Issue #308 · zenn-dev/zenn-community · GitHub](https://github.com/zenn-dev/zenn-community/issues/308)

> scrollRestoration フラグ（experimental）を有効化して、スクロール位置が復元されるようになりました。

どうやら`experimental.scrollRestoration`を`true`にすれば解決するようです。

早速以下のようにして確認してみたところ、確かにブラウザバック時にスクロール位置が復元されるようになりました。

```javascript
// next.config.js
module.exports = {
  experimental: {
    scrollRestoration: true,
  },
}
```

うまく動作するようになったのは良いのですが、一体`experimental.scrollRestoration`って何なのでしょう？

## experimental.scrollRestoration ってなんだろう？

そもそもの`scrollRestoration`ですが、これは`History API`のプロパティに存在しています。  
[History.scrollRestoration - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/History/scrollRestoration)

> scrollRestoration は History インターフェイスのプロパティで、ウェブアプリケーションが履歴の移動の動作で既定のスクロール位置の復元を明示的に設定できるようにします。

値として`auto`と`manual`の 2 種類を持っており、`auto`の場合はスクロール位置が保持されるようです。

Next.js の以下コードを見ると、どうやら Next.js では`auto`がデフォルトのように見えます。  
[next.js/router.ts at 91f0a7c60182caa1952cdb5189e99052b1aecfc9 · vercel/next.js · GitHub](https://github.com/vercel/next.js/blob/91f0a7c60182caa1952cdb5189e99052b1aecfc9/packages/next/shared/lib/router/router.ts#L1022)

それではなぜスクロール位置が復元されない場合があるのでしょうか？

この点については以下の記事がとても参考になりました。ありがとうございます。  
[Next.js はどうやってスクロール位置を復元するのか](https://zenn.dev/akfm/articles/next-js-scroll-restore)

> Next.js はデフォルトでは experimental.scrollRestoration = false となっており、この場合の history.scrollRestoration の値は'auto'です。SPA では、history.scrollRestoration = 'auto'によるブラウザ側の復元処理がうまく動作しないことがあります。

冒頭に記載した私のケースに合致しますね。

つまり、Next.js でスクロール位置の復元を制御するのが`experimental.scrollRestoration`であり、このフラグを`true`に設定すると、Session Storage に遷移前のスクロール位置を保存しておいて復元するようです。

処理の概要については先ほどの Zenn の記事がとても詳しいので、気になる方はそちらをご確認ください。

個人的にすごくなるほどなぁという感じだったので、あとで時間をとってコードを読み込みたいと思います。

## まとめ

Next.js でブラウザバックした際にスクロール位置を復元するときは、next.config.js に以下の設定を追加すること。

```javascript
// next.config.js
module.exports = {
  experimental: {
    scrollRestoration: true,
  },
}
```
