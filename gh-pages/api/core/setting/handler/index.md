---
layout: bootstrap
title: handler
type: page
nav: nav
class: style-api style-api-detail
---

# handler
監視対象要素が表示された場合に実行する関数を設定します。必須パラメータです。

## handler: function (index: number, element: Element, param: Any, status: Status)
監視対象要素が表示された場合に実行されます。

以下のようにコンテキストと引数が設定されます。

var|type|description
---|----|-----------
this|Element|表示された監視対象要素
index|number|監視対象要素のインデクス
element|HTMLElement|thisに同じ
param|Any|`param`パラメータの値またはコールバックの戻り値
status|Status|VTの各種状態を持つオブジェクト

`status`オブジェクトのプロパティは以下の通りです。

name|value|description
----|-----|-----------
event|jQueryEvent/undefined|実行元であるネイティブイベント
container|document/element|監視対象要素の直近のスクロール領域を持つ要素
activator|document/element|実行元のスクロール領域を持つ要素
count|number|コールバックの実行回数
direction|number|スクロール方向(1/-1)

<pre class="sh brush: js;">
$.vt({
  handler: function(index, element, param, status) {}
  ...
});
</pre>
