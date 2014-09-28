---
layout: bootstrap
title: cache
type: page
nav: nav
class: style-api style-api-detail
---

# cache
動作の高速化のため内部処理をキャッシュするかを設定します。コールバックの実行により監視対象要素数が変化する場合などに`false`を設定します。初期値は`true`です。

## cache: boolean
有効無効を切り替えます。

<pre class="sh brush: js;">
$.vt({
  cache: false
  ...
});
</pre>
