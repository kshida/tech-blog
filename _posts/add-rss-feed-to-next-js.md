---
title: 'Next.jsで作ったブログにRSSフィードを追加する'
date: '2022-10-22'
tags: ['next.js']
---

## 目次

## 背景

本ブログは Next.js で作成しています。  
自作のブログだと少しずつ機能を足していけるのが良いですよね。  
折角なら RSS フィードも生成したいなと思ったので、今回追加しようと思います。

### 環境

- "react": "^18.2.0"
- "next": "^12.0.10"
- "feed": "^4.2.2"

## ライブラリ選定

RSS フィードを生成するライブラリを探してみたところ、以下の 2 つがメジャーのようです。

- [rss - npm](https://www.npmjs.com/package/rss)
- [feed - npm](https://www.npmjs.com/package/feed)

rss は最終更新が 6 年前でした。  
しばらく更新されていないのがちょっと気になりますね。

feed は最終更新が 2 年前なので、今回はこちらを利用しようと思います。

Next.js に RSS フィードを追加するにあたり、以下 2 つの記事がとても参考になりました。

- [Next.js で動的に RSS フィードを生成する](https://zenn.dev/catnose99/articles/c7754ba6e4adac)

こちらは Zenn の catnose さんの記事です。  
rss を利用する or SSR で利用する場合はこちらをご確認ください。

- [Next.js に feed を導入して RSS と Atom のフィードを生成しよう | fwywd（フュード）powered by キカガク](https://fwywd.com/tech/next-feed-rss-atom)

こちらはキカガクの吉崎 亮介さんの記事です。  
feed を利用する or SSG で利用する場合はこちらをご確認ください。

## feed を導入し、RSS フィードを設定する

まずは feed を導入します。

```bash
yarn add feed
```

次に、公式のサンプルを参考に、RSS フィードを生成する処理を実装しましょう。  
私の場合は SSG なので、XML ファイルを生成して配置するようにします。

```tsx
// src/libs/feed.ts
import fs from 'fs'
import dayjs from 'dayjs'
import { Feed } from 'feed'
import { getAllPosts } from './api'

export const generateRssFeed = () => {
  const baseUrl = 'https://kshida-blog.com'

  const feed = new Feed({
    title: "kshida's blog",
    description: '文系エンジニアが日々の学びを分かりやすい形でアウトプットしていきます。',
    id: baseUrl,
    link: baseUrl,
    language: 'ja',
    copyright: "©2022 kshida's blog",
    updated: dayjs().toDate(),
    feed: `${baseUrl}/feed`,
    author: {
      name: 'K.Shida',
    },
  })
  // 記事一覧を取得
  const posts = getAllPosts(['title', 'date', 'slug', 'content'])
  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${baseUrl}/${post.slug}`,
      link: `${baseUrl}/${post.slug}`,
      description: `${post.content.slice(0, 300)}...`,
      date: dayjs(post.date).toDate(),
    })
  })
  // RSSフィード情報を public/rss 配下に保存する
  fs.mkdirSync('./public/rss', { recursive: true })
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2())
}
```

`feed.rss2()` について補足です。  
今回は `RSS 2.0` 形式で生成していますが、もしも `Atom 1.0` にしたい場合は `feed.atom1()`に 、`JSON Feed 1.0` にしたい場合は `feed.json1()` としてください。

最後に、`index.tsx` の中で先ほどの処理を呼ぶようにしましょう。

```tsx
// src/pages/index.tsx
export const getStaticProps = async () => {
  generateRssFeed() // RSSフィードを生成する
  （中略）

  return {
    props: { recentPosts },
  }
}
```

それでは確認してみます。
`/feed` にアクセスすると、以下のように RSS フィードが表示されました。

```xml
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>kshida's blog</title>
        <link>https://kshida-blog.com</link>
        <description>文系エンジニアが日々の学びを分かりやすい形でアウトプットしていきます。</description>
        <lastBuildDate>Sat, 22 Oct 2022 05:32:56 GMT</lastBuildDate>
        <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
        <generator>https://github.com/jpmonette/feed</generator>
        <language>ja</language>
        <copyright>©2022 kshida's blog</copyright>
        <atom:link href="https://kshida-blog.com/feed" rel="self" type="application/rss+xml"/>
        <item>
            <title><![CDATA[Next.jsで作ったブログでZennのRSSを取得したい]]></title>
            <link>https://kshida-blog.com/want-to-get-rss-of-zenn-in-next-js</link>
            <guid>https://kshida-blog.com/want-to-get-rss-of-zenn-in-next-js</guid>
            <pubDate>Tue, 11 Oct 2022 15:00:00 GMT</pubDate>
            <description><![CDATA[{descriptionが入ります}]]></description>
        </item>
        <item>
          {以下同じです}
        </item>
    </channel>
</rss>
```

## まとめ

Next.js に RSS フィードを追加してみました。  
`feed` や`rss`を使うと簡単に追加できて便利ですね。

フィードを生成したら以下のサイトで確認もお忘れなく〜。  
[W3C Feed Validation Service, for Atom and RSS](https://validator.w3.org/feed/)

今回参考にした記事を再掲して終わりです。

- [Next.js で動的に RSS フィードを生成する](https://zenn.dev/catnose99/articles/c7754ba6e4adac)
- [Next.js に feed を導入して RSS と Atom のフィードを生成しよう | fwywd（フュード）powered by キカガク](https://fwywd.com/tech/next-feed-rss-atom)
