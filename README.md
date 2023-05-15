# chatbot-client (React.js, Tailwind CSS, Docker, Heroku)

このプロジェクトのクライアントサイドは、React.js、Tailwind CSS、Docker、および Heroku を使用して開発

## 使用技術

- React.js: 効率的なユーザーインターフェースの構築のための JavaScript ライブラリ
- Tailwind CSS: ユーティリティファーストの CSS フレームワーク
- Docker: アプリケーションのコンテナ化技術
- Heroku: クラウドベースのアプリケーションプラットフォーム

## 外部 API

- OpenWeatherMap: W 現在の天候や予測履歴を含む各種気象データの無料 API を提供するオンラインサービス
- OpenAI ChatGPT: 対話型の質問応答、文章生成、文章の要約など、さまざまな自然言語処理タスクに応用できる柔軟な AI アシスタント

## 実装方法

### React.js

1. `create-react-app` を使って React.js のプロジェクトを作成
2. コンポーネントベースのアプローチを採用し、アプリケーションの各部分をモジュール化
3. 状態管理には、React の状態フックを使用しました。

### Tailwind CSS

1. プロジェクトに Tailwind CSS を導入
2. ユーティリティクラスを活用して、レスポンシブなデザインを実現
3. カスタムスタイルを適用するために、`@apply`ディレクティブを使用

### Docker

1. Dockerfile を作成して、アプリケーションのコンテナ化を実現しました。

## セットアップ

### local

1. `npm install` コマンドを実行して、必要なパッケージをインストールしてください。
2. `npm start` コマンドを実行して、開発サーバーを起動してください。
   ※ docker を使用する場合は、Dockerfile,docker-compose.yml を用意してください

### Docker

1. `chatbot-server`と併用してプロジェクト作成する場合は、`BuildScripts`フォルダの Makefile, docker-compose.yml を使用してください。
2. Docker がインストールされていることを確認し、clone したディレクトリの親ディレクトリに Makefile を配置して
   `make up` コマンドを実行、アプリケーションとデータベースのコンテナを起動

これでクライアントサイドがローカル環境, docker で実行できるようになります。

## デプロイ

1. Heroku CLI をインストールしてください。
2. `heroku login` コマンドを実行し、Heroku アカウントにログインしてください。
3. `heroku create` コマンドを実行して、新しい Heroku アプリを作成してください。
4. `git push heroku main` コマンドを実行して、アプリケーションを Heroku にデプロイしてください。
5. 必要に応じて、Heroku の環境変数を設定してください。

これでアプリが Heroku にデプロイされる。
詳細については、[公式ドキュメント](https://devcenter.heroku.com/ja/articles/git)を参照してください。

---

## システム構成図

<img src="img/chatbotシステム構成図.png" alt="犬">
