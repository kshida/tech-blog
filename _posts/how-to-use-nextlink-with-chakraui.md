---
title: 'Chakra UIのLinkとnext/linkを併用したい'
date: '2022-10-09'
tags: ['next.js', 'chakra-ui']
---

## 目次

## 背景

本ブログは Next.js と Chakra UI （補助的に Tailwind ）を使って作成しています。

作成し始めた段階では Chakra UI の`Link`コンポーネントをそのまま使っていました。  
（Chakra UI が楽しくて`next/link`をすっかり忘れていました。。）

その後しばらくしてから、サイト内遷移の UX 体験向上のため`next/link`に変更しようと思ったのですが、そういえば Chakra UI の`Link`と`next/link`はどうやって併用するんだっけ？と思った次第です。

- [next/link | Next.js](https://nextjs.org/docs/api-reference/next/link)
- [Link - Chakra UI](https://chakra-ui.com/docs/components/link)

本ブログでは既に対応は終わっているのですが、メモしていたものを投稿しようと思います。

### 環境

- "react": "^18.2.0"
- "next": "^12.0.10"
- "@chakra-ui/react": "^1.8.3"
- "@emotion/react": "^11.8.1"
- "@emotion/styled": "^11.8.1"
- "framer-motion": "^6.2.6"

## 公式ドキュメントに全て書いてある

さて、さすがは Chakra UI。
`next/link`との併用についても記載がありました。

[Usage with Next.js](https://chakra-ui.com/docs/components/link#usage-with-nextjs)

> To use the Link with Next.js, all you need to do is to wrap Link with Next.js Link component and pass the passHref prop. passHref Forces Next.js Link to send the href property to its child.

どうやら`next/link`でラップして`passHref`で渡してあげるだけで良いようです。

以下、公式のサンプルコードになります。

```tsx
<NextLink href='/home' passHref>
  <Link>Home</Link>
</NextLink>
```

私の場合は以下のように変更しました。

before

```tsx
<Box key={post.slug} borderWidth='1px' borderRadius='lg'>
  <Link
    href={`/posts/${post.slug}`}
    textDecoration='none'
    _hover={{ textDecoration: 'none' }}
    _focus={{ boxShadow: 'none' }}
  >
    （中略）
  </Link>
</Box>
```

after

```tsx
<Box key={post.slug} borderWidth='1px' borderRadius='lg'>
  <NextLink href={`/posts/${post.slug}`} passHref>
    <Link textDecoration='none' _hover={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      （中略）
    </Link>
  </NextLink>
</Box>
```

めちゃくちゃ簡単ですね！

## まとめ

`next/link`でラップして`passHref`で渡してあげましょう。

素晴らしい公式ドキュメントはこちらです。

[Chakra UI - A simple, modular and accessible component library that gives you the building blocks you need to build your React applications. - Chakra UI](https://chakra-ui.com/)
