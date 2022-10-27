---
title: 'Next.js × Chakra UI × Markdoc で技術ブログを作るつもりだった'
date: '2022-10-01'
tags: ['next.js', 'chakra-ui']
---

## 目次

## 背景

Next.js で技術ブログを作成しています。  
マークダウンで記事を作成して管理するつもりだったのですが、ちょうど作成し始めたときに Markdoc というサービスを知りました。  
[Markdoc | A powerful, flexible, Markdown-based authoring framework](https://markdoc.dev/)

Stripe が公開したサービスなんですね。  
公式ドキュメントを見に行ったらリッチでいい感じだったので、導入してみようとした際のメモです。

## Next.js と Chakra UI のテンプレートを導入

その前に、Next.js と Chakra UI で基本形を作りましょう。  
公式に Next.js と Chakra UI のテンプレートがあるのでありがたく使わせていただきす。  
[next.js/examples/with-chakra-ui at canary · vercel/next.js · GitHub](https://github.com/vercel/next.js/tree/canary/examples/with-chakra-ui)

```bash
yarn create next-app --example with-chakra-ui {アプリ名}
```

自動整形をしたいので、公式ページを見ながら環境を整えておきます。  
[Basic Features: ESLint | Next.js](https://nextjs.org/docs/basic-features/eslint)

まずは`package.json`に整形用のスクリプトを追加します。

```json
"scripts": {
  "lint": "next lint"
}
```

早速コマンドを実行しましょう。

```bash
yarn lint
```

オプションは`Strict`にします。

> Strict: Includes Next.js' base ESLint configuration along with a stricter Core Web Vitals rule-set. This is the recommended configuration for developers setting up ESLint for the first time.

prettier も入れましょうね。  
[Basic Features: ESLint | Next.js](https://nextjs.org/docs/basic-features/eslint#prettier)

```bash
yarn add --dev eslint-config-prettier
```

`.eslintrc.json`に設定を追加しましょう

```json
{
  "extends": ["next/core-web-vitals", "prettier"]
}
```

それでは一旦起動してみましょう。

```bash
yarn dev
```

なんと既にダークモードに対応しています。  
思わず何度も切り替えちゃいますね。  
![画像01](/assets/blog/i-tried-to-create-blog-in-markdoc/01.png)
![画像02](/assets/blog/i-tried-to-create-blog-in-markdoc/02.png)

絶対パスを使いたいので、`tsconfig.json` に設定を追加しておきます。  
[Advanced Features: Absolute Imports and Module Path Aliases | Next.js](https://nextjs.org/docs/advanced-features/module-path-aliases)

```json
"compilerOptions": {
	"baseUrl": "src",
    "paths": {
      "@/components/*": ["components/*"]
    },
...
```

画像等を配置するため public ディレクトリも作成しておきましょう。

```bash
mkdir public
```

## Markdoc の導入

記事の作成には Markdoc を使いたいです。  
[Markdoc | A powerful, flexible, Markdown-based authoring framework](https://markdoc.dev/)

普通のマークダウンで書けて、かつコールアウトとかのブロックも実装できるのが良さげです。  
MDX とは違って、あくまで記事とコードは分離されるので、管理もわかりやすそうですね。  
Next.js 向けのプラグインもあるみたいなので、早速導入してみましょう。  
[Markdoc | Using Markdoc with Next.js](https://markdoc.dev/docs/nextjs)

ちなみに Markdoc×Next.js のテンプレートもあるので、人によってはこちらを使った方が早いかも？  
[GitHub - markdoc/markdoc-starter: Starter repo for quickly deploying a Markdoc app with Next.js](https://github.com/markdoc/markdoc-starter)

1. `@markdoc/markdoc` をインストールしましょう。

```bash
yarn add @markdoc/markdoc
```

2. Next.js 用に `@markdoc/next.js`もインストールします。

```bash
yarn add @markdoc/next.js
```

3. `next.config.js`に以下を追記します。

```js
const withMarkdoc = require('@markdoc/next.js')

module.exports = withMarkdoc(/* options */)({
  pageExtensions: ['md', 'mdoc', 'js', 'jsx', 'ts', 'tsx'],
})
```

`options`ではスキーマの場所やレンダリングのモードを設定することができます  
[next.config.js: Custom Page Extensions | Next.js](https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions)

`pageExtensions`については以下を参照ください  
[next.config.js: Custom Page Extensions | Next.js](https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions)

4. `/pages/`に`.md`ファイルを作成します

```text
pages
├── _app.tsx
├── posts
│   └── hello-world.md
└── index.md
```

※ `index.md` の箇所ですが、おそらくこの手順の場合、この時点では `index.tsx` になっていると思いますので`md` ファイルに変更しておきましょう。  
※ 中身は公式のサンプルをお借りしましょう。  
[markdoc-starter/index.md at main · markdoc/markdoc-starter · GitHub](https://github.com/markdoc/markdoc-starter/blob/main/pages/index.md)

5. 先ほどのマークダウンファイルに仮でテキストを入れておきましょう。

```markdown
---
title: Hello Markdown
---

# {% $markdoc.frontmatter.title %}

Hello World Markdoc!!
```

6. markdoc の設定ファイルを配置するディレクトリを作ります。

```bash
mkdir markdoc
```

7. 公式を参考に各ファイルを用意していきましょう。  
   [markdoc-starter/markdoc at main · markdoc/markdoc-starter · GitHub](https://github.com/markdoc/markdoc-starter/tree/main/markdoc)

個人的に Markdoc 用のコンポーネントはまとまっていた方が見やすいので、`components` の下にディレクトリを追加します。

```bash
mkdir ./src/components/markdoc
```

以下を参考に、`./src/components/markdoc` に markdoc 用のコンポーネントも追加しておきましょう。  
[markdoc-starter/components at main · markdoc/markdoc-starter · GitHub](https://github.com/markdoc/markdoc-starter/tree/main/components)

さて、アクセスして表示を確認してみましょう。  
![画像03](/assets/blog/i-tried-to-create-blog-in-markdoc/03.png)

おおー。表示されました。  
frontmatter に設定した内容も表示できていますね。  
変数のように利用できるのは便利そうです。

## 今回は普通のマークダウンで作成することにした

Markdoc のドキュメントも Next.js ということで中身を見てみたけれど、慣れるまでちょっと癖がありそうに感じました。  
（技術ブログとして色々やろうと思っている場合はちょっと慣れが必要かもしれない）  
[GitHub - markdoc/docs: Documentation site for Markdoc](https://github.com/markdoc/docs)

逆に、ドキュメント管理に特化するのであればとても便利そうですね。  
`Docusaurus`とかと競合になるのかしら？  
[Build optimized websites quickly, focus on your content | Docusaurus](https://docusaurus.io/)

よくよく考えると私がやりたかったのは情報発信であり、Markdoc で作ることではなかったです。  
そもそも記事を発信するのが目的なので、今回はある程度慣れている技術でとりあえず作ってしまうことにします。

## まとめ

Markdoc はリッチで便利そうなので、Docusaurus を使おうか悩んでいる場合は選択肢の一つにしても良いかもしれないなーと感じました。

※結局このブログは Next.js×Chakra UI×Markdown で作りました。
