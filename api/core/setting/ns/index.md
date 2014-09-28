---
layout: bootstrap
title: ns
type: page
nav: nav
class: style-api style-api-detail
---

# ns
ネームスペースを設定します。VTを複数設定する場合は必須です。ネームスペースは各種メソッドの実行において対象の絞り込みに使用できます。初期値は`''`です。

## ns: string
文字列によりネームスペースを設定します。ネームスペースであることを視覚的に明示するために先頭に`.`をつけることができます。この先頭のドットは動作に何の影響も与えません。

<pre class="sh brush: js;">
$.vt({
  ns: 'namespace.0'
  ...
});
</pre>

<pre class="sh brush: js;">
$.vt({
  ns: '.namespace.0'
  ...
});
</pre>
