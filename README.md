# script docs 2 csv
## 概要
- Google Docsで書かれた文字起こしの文章（スクリプト）をCSV形式に変換するスクリプトです
- InDesignなどでインポートして、表組みなどを行いやすくすることができます
- 章の見出しなどがある場合は、その章ごとにファイルを分割して保存します

## 仕様
### ファイル
- 章の見出しなどがある場合は、その章ごとにファイルを分割して保存します
- ファイル名は、`[連番]_[章タイトル].csv` となります
  - 連番は、0埋め3桁で001, 002, ... となります
- ファイルは、`output` ディレクトリに保存されます

### CSV
- １行目は、見出し行として扱われます
  - 列は、`name`, `comment` となります
- 文字コードは、shift-JIS となります
  - InDesignが扱える文字コードです
- 改行コードは、LF となります

## サンプル
### 入力するドキュメント

### 出力するCSV
- [001_sample.csv](./samples/output/001_sample.csv)

## 使い方
1. Google Docsを開き、ファイル>ダウンロード>プレーンテキスト(.txt) で、テキストファイルをダウンロードします
2. このスクリプトを実行します
3. `output` ディレクトリにCSVファイルが保存されます

## 開発
### 環境
- Node.js
- TypeScript
- Jest

### セットアップ
```bash
```

### note
- shift-JISで出力するため、文字化けが発生する可能性があります
- その場合は、CSVファイルを開いて、文字コードをshift-JISに変換してください
```bash
# https://web-generalist.com/mac_shiftjis_form_utf8/

iconv -f UTF-8 -t SHIFT-JIS [ファイル名] > [出力ファイル名]
```


## TODO
- [-] 出力サンプルをindesignで使えるのか調査
- [ ] indesignのインポート方法をドキュメントに書く
- [-] docsの出力形式を検討
- [ ] ファイルのサンプルを見ながら仕様を考える
- [ ] tsプロジェクトの作成
- [ ] フォーマッター・リンターの設定
- [ ] パースするツールの実装
- [ ] CSV作成ツールの実装
- [ ] ファイルの書き出しツールの実装
- [ ] 結合テストの実装

### できればやりたいこと
- [ ] URLからスクリプトを取得するツールの実装