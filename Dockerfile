# ベースイメージとして、Node.jsのAlpine Linuxを使用 
FROM node:18.16.0-alpine3.17 as builder 

# 作業ディレクトリを設定 
WORKDIR /speakbot-frontend

# システムへの依存関係をインストール 
RUN apk update && apk add bash 

# ルートディレクトリ配下をコピー
COPY . .

# 依存関係をインストール 
RUN npm install 

# 開放するポートを指定
EXPOSE 3000 

