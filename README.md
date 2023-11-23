# ページの右下に出てくるチャットアプリ

## DEMO

  - デプロイしている場合はURLを記入（任意）

## 紹介と使い方

  - 一定時間動作がないとページの下の方にひょこっと現れて、AIが助けてくれるチャットアプリです。
  - Firebase上のデータベースに履歴が保存されます。

## 工夫した点
  - firebaseを使わないAIとのチャットアプリを、firebaseのリアルタイムデータベースにまず保存して、その結果を表示するように改良しました。
  - AIとユーザーを区別してfirebaseに保存するようにしました。
  - そのため、またアプリを開いた場合にもチャット履歴が見れます。

## 苦戦した点
  - 

## 参考にした web サイトなど

  - AIチャットアプリ https://www.codingnepalweb.com/create-chatbot-html-css-javascript/
  - Firebaseで作るチャットアプリ　https://www.youtube.com/watch?v=v2ILwppYXhY
