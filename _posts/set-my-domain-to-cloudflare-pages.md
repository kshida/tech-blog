---
title: 'Xserverドメインで取得した独自ドメインをCloudflare Pagesのカスタムドメインに設定する'
date: '2022-10-10'
ogImage:
  url: '/assets/blog/dynamic-routing/cover.jpg'
tags: ['cloudflare']
---

## 目次

## 背景

Cloudflare Pages で Next.js のブログをデプロイしています。  
GitHub との連携がスムーズでとても開発体験が良いです。

初期状態では `hoge.pages.dev` というドメインが発行されまして、SSL も標準搭載なのでとてもありがたいですよね。

でもせっかくなら独自ドメインを設定したいところです。  
Cloudflare Pages にはカスタムドメインという機能があり、独自ドメインを設定することができます。  
ということで、早速 Xserver ドメインでドメインを取得したので、Cloudflare に設定していきましょう。

### 感謝

こちらの記事を参考にしました。  
わかりやすい記事をありがとうございます！  
[Cloudflare Pages にカスタムドメインを設定する - Qiita](https://qiita.com/akitkat/items/8aeaee639ba5f2bda141)

## DNS レコードの確認・追加

上記記事の手順 1~5 まで行ったのですが、6 つ目の DNS レコードの確認・追加画面で詰まってしまいました。

既に DNS が設定されていれば DNS レコードが表示されるようなのですが、私の場合はドメイン取得したばかりなので何も表示されていません。

![画像01](/assets/blog/set-my-domain-to-cloudflare-pages/01.png)

何を設定したら良いのかちょっと悩んでしまいましたが、以下のように設定して保存すれば OK です。

- タイプ：**CNAME**
- 名前（必須）：**新しく取得した独自ドメイン**
- ターゲット（必須）：**Cloudflare で設定されているドメイン（hoge.pages.dev）**
- プロキシ：ON（初期状態のまま）
- ステータス：プロキシ済み（初期状態のまま）
- TTL：自動（初期設定のまま）

![画像02](/assets/blog/set-my-domain-to-cloudflare-pages/02.png)

Cloudflare による所有権確認に最大 24 時間かかるそうですので、気長に待ちましょう。

![画像03](/assets/blog/set-my-domain-to-cloudflare-pages/03.png)

## ネームサーバーを変更する

手順 4 に記載のネームサーバーを Xserver に追加します。

Xserver の「ネームサーバー設定」から変更可能です。

「その他のサービスで利用する」を選択し、先ほどの 手順 4 のネームサーバーを 2 つとも追加しましょう。

![画像04](/assets/blog/set-my-domain-to-cloudflare-pages/04.png)

設定が保存できたら、Cloudflare 側でも変更を保存します。  
「完了しました、ネームサーバーをチェックしてください」という青いボタンですね。

## クイックスタートガイド

セキュリティの設定も行いましょう。

![画像05](/assets/blog/set-my-domain-to-cloudflare-pages/05.png)

ここはお好みでどうぞ。

## ネームサーバーをチェック

クイックスタートガイドを設定 or スキップすると概要画面が表示されます。

恐らくこの時点ではまだネームサーバのチェックが終わっておらず、以下のようなボタンが表示されていると思います。

![画像06](/assets/blog/set-my-domain-to-cloudflare-pages/06.png)

このまま放置でも 24 時間ほどでチェックしてくれるようですが、せっかくなのでボタンをクリックして今すぐチェックしてもらいましょう。

私の場合は数分ほどで完了メールが届きました！

Cloudflare で以下のように表示されていれば、ドメインと Cloudflare の紐付けは完了です。

![画像07](/assets/blog/set-my-domain-to-cloudflare-pages/07.png)

## カスタムドメインをアクティブにする

最後に Pages のカスタムドメイン画面で設定をアクティブにします。

最初にカスタムドメインを入力した画面に移動し、先ほど設定した独自ドメインを入力してください。

すると以下のようにドメインをアクティブにする確認画面が表示されます。

![画像08](/assets/blog/set-my-domain-to-cloudflare-pages/08.png)

内容を確認したらドメインをアクティブにしましょう。

反映されるまで最大 48 時間かかるとのことですが、私の場合は 1~2 分でアクティブになりました！

![画像09](/assets/blog/set-my-domain-to-cloudflare-pages/09.png)

## まとめ

Cloudflare Pages に独自ドメインを設定するのは簡単だった。
