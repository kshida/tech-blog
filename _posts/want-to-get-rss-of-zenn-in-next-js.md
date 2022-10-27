---
title: 'Next.jsで作ったブログでZennのRSSを取得したい'
date: '2022-10-12'
tags: ['next.js']
---

## 目次

## 背景

Next.js でブログを作ったので、せっかくなら Zenn にある自分の記事へのリンクも表示したいです。

catnose さんやプログラミングをするパンダさん、すてぃんさんの記事を見て、「とても素敵だな〜、私も一箇所に紐づけられるようにしたいな」と思っていました。

- [チーム個々人のテックブログを RSS で集約するサイトを作った（Next.js）](https://zenn.dev/catnose99/articles/cb72a73368a547756862)
- [トップページ - パンダのプログラミングブログ](https://panda-program.com/)
- [Home | stin's blog](https://blog.stin.ink/)

今回 Next.js でブログを作ったので、このブログをハブとして自分の発信物を紐づけられたら良いなと考えています。

### 環境

- "react": "^18.2.0"
- "next": "^12.0.10"
- "rss-parser": "^3.12.0"

## React で RSS 情報を取得する

Zenn には以下のような形で、ユーザごとに RSS が用意されています。  
`https://zenn.dev/{username}/feed`

[Zenn を RSS フィードで購読する](https://zenn.dev/zenn/articles/zenn-feed-rss)

場所はこちらですね。  
![画像01](/assets/blog/want-to-get-rss-of-zenn-in-next-js/01.png)

今回はこの RSS を使って Next.js のビルド時に自分の記事情報を取得しようと思います。

RSS のパースについては以下を使います。  
[rss-parser - npm](https://www.npmjs.com/package/rss-parser)

先ほどの catnose さんの記事にも記載されているように、とても簡単に RSS のパースができるライブラリのようです。

> RSS のパースは rss-parser というパッケージを使うと簡単です。
>
> [チーム個々人のテックブログを RSS で集約するサイトを作った（Next.js）](https://zenn.dev/catnose99/articles/cb72a73368a547756862)

上記記事は 2020 年末公開の記事のため、最新の状況を軽く調査してみたのですが、RSS の取得については現時点でも `rss-parser` が安定のようでした。

それでは早速実装していきましょう。

このブログでは `yarn` を使っているので、`yarn` で導入します。  
[rss-parser | Yarn - Package Manager](https://yarnpkg.com/package/rss-parser)

```bash
yarn add rss-parser
```

Zenn の rss を取得する処理を書いていきましょう。

デフォルトでは取得できる数が 20 件ほどに制限されているようです。

> デフォルトではフィードに出力される投稿（記事・本）の数は 20 ほどに制限されています。すべての公開された投稿を出力したい場合は`https://zenn.dev/ユーザー名/feed?all=1`のように`all=1`というクエリ文字列を指定します。

今回は全件取得したいので、公式の記載にしたがって `?all=1` をつけましょう。

```tsx
import Parser from 'rss-parser'
import dayjs from 'dayjs'

export const getZennRssFeed = async () => {
  const feed = await new Parser().parseURL('https://zenn.dev/kshida/feed?all=1')
  return feed.items.map(item => ({
  return {
    pagePosts: feed.items.map((item) => ({
      title: item.title ?? '',
      date: item.pubDate ? dayjs(item.pubDate).format('YYYY-MM-DD') : '',
      slug: item.link ?? 'https://zenn.dev/kshida',
    })),
    totalCount: feed.items.length,
  }
}
```

return の中身はこのブログに合わせたものになっているので、もしこのコードを参考にされる場合は各々の設定に合わせて変更くださいませ。

あとは各ページで表示してあげれば OK ですね。

ちなみに、以下のように表示することができました！
![画像02](/assets/blog/want-to-get-rss-of-zenn-in-next-js/02.png)

とても簡単でしたね！

## まとめ

以下のコミットで色々調整しまして、最終形は以下となりました。  
トップページでは Zenn の記事を含めて投稿日が新しい順に表示されるようにしています。
![画像03](/assets/blog/want-to-get-rss-of-zenn-in-next-js/03.png)

最近は体調崩したり業務が忙しかったりして、しばらく Zenn に投稿できていなかったのですが、これで Zenn への投稿も捗ります。
