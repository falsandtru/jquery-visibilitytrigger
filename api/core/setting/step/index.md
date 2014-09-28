---
layout: bootstrap
title: step
type: page
nav: nav
class: style-api style-api-detail
---

# step
次に選択する要素の間隔を設定します。コールバックの実行により実行元の監視対象要素が監視対象外となる場合に`0`を設定します。設定できる値は`0`または`1`のみです。初期値は`1`です。

## step: number
要素の間隔を数値で設定します。

<pre class="sh brush: js;">
$.vt({
  step: 0
  ...
});
</pre>
