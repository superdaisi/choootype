# choootype.js
====

## ファイル構成

- `README.md`
  - このファイルです。
- `src`
  - ソースコードです。

## 対応ブラウザ

- IEを除く各種モダンブラウザ最新バージョン

## 使い方

ライブラリを読み込む
```
<script src="your/path/choootype.js"></script>
```

関数を実行！
```
<script>
  choootype();
</script>
```

クラス名`.chootype`の部分の文字がはみ出ると緊張帯がかかります。

任意のセレクタ名で設定する場合は、IDやクラス名で設定します。
```
<script>
  choootype('#yourId .yourClass');
</script>
```

## オプション

choootypeでは以下のオプションが利用できます。

| パラメータ | 形式 | 概要 | デフォルト値 |
| :ｰｰｰ: | --- | --- | --- |
| `min` | {Number} | 長体の最小値を設定します。0.6ぐらいが見やすいですが、設定した値より計算値が小さい場合は、文字が切れてしまいます。 | 0 |

