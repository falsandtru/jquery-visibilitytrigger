---
layout: bootstrap
title: standby
type: page
nav: nav
class: style-api style-api-detail
---

# standby
監視対象要素が事後に追加されるため監視を待機する場合に設定します。事後に監視対象要素が存在しなくなった場合はその時点で監視を終了します。初期値は`false`です。

## standby: boolean
有効無効を切り替えます。

<pre class="sh brush: js;">
$.vt({
  standby: true
  ...
});
</pre>
