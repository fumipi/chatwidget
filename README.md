# ページの右下に出てくるチャットアプリ

## DEMO

  - デプロイしている場合はURLを記入（任意）

## 紹介と使い方 
  - G's Academyのfirebaseの課題で作成したアプリです。
  - ページの下の方にひょこっと現れて、AIが助けてくれるチャットアプリです。
  - Firebase上のデータベースに履歴が保存されます。

## 工夫した点
  - firebaseを使わないAIとのチャットアプリを、firebaseのリアルタイムデータベースにまず保存して、その結果を表示するように改良しました。
  - AIとユーザーを区別してfirebaseに保存するようにしました。
  - そのため、再度、アプリを開いた場合にもチャット履歴が見れます。
  - また、OpenAIのAPIにはこれまでのチャット履歴を全部渡すので、流れのある会話ができます。

## 苦戦した点
  - 

## 参考にした web サイトなど

  - AIチャットアプリ https://www.codingnepalweb.com/create-chatbot-html-css-javascript/
  - Firebaseで作るチャットアプリ　https://www.youtube.com/watch?v=v2ILwppYXhY
