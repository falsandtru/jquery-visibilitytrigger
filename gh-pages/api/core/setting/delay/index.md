---
layout: bootstrap
title: delay
type: page
nav: nav
class: style-api style-api-detail
---

# delay
連続したスクロールイベントが発生した場合に前回のイベントによる処理をキャンセルする待機時間を設定します。初期値は`300`です。

## delay: number
前回のイベントによる処理をキャンセルする待機時間をミリ秒で設定します。

<pre class="sh brush: js;">
$.vt({
  delay: 100
  ...
});
</pre>
