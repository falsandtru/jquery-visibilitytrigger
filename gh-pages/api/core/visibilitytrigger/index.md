---
layout: bootstrap
title: visibilitytrigger
type: page
nav: nav
class: style-api style-api-detail
---

# visibilitytrigger() <small><span class="label label-info">chainable</span></small>
visibilitytriggerを設定します。

## $.visibilitytrigger( Setting: setting ): this

### $.visibilitytrigger( Setting: setting ): this
`document`オブジェクトへvisibilitytriggerを設定します。

<pre class="sh brush: js;">
$.visibilitytrigger({
  trigger: 'img',
  handler: function(){}
});
</pre>

### $().visibilitytrigger( Setting: setting ): this
コンテキストへvisibilitytriggerを設定します。個別のスクロール領域を持つ要素に対して使用します。

<pre class="sh brush: js;">
$('.scrollable').visibilitytrigger({
  trigger: 'img',
  handler: function(){}
});
</pre>

追加された独自メソッドとコンテキストは`end()`メソッドなどによりメソッドチェーンを移動することで戻せます。

## $.visibilitytrigger( Alias: string ): this
ネームスペースのエイリアスを作成します。引数により以下のように動作します。

引数なし: 既定のエイリアスである`vt`を作成

<pre class="sh brush: js;">
$.visibilitytrigger();
// $.vt === $.visibilitytrigger
</pre>

空文字: 既定のエイリアスを作成しない

<pre class="sh brush: js;">
$.visibilitytrigger('');
// $.vt === undefined
</pre>

文字列: 引数の文字列によるエイリアスを作成

<pre class="sh brush: js;">
$.visibilitytrigger('alias');
// $.alias === $.visibilitytrigger
// $.vt === undefined
</pre>

## $.visibilitytrigger( DOM: window/document/elements/jQuery ): this
`$(DOM).visibilitytrigger()`または`.add(DOM).visibilitytrigger()`のショートカットです。コンテキストに引数のオブジェクトを追加します。

## $.visibilitytrigger(): this
コンテキストにメソッドを追加して返します。初回実行時であれば既定のエイリアスを追加します。
