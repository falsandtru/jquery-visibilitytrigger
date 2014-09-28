---
layout: bootstrap
title: ahead
type: page
nav: nav
class: style-api style-api-detail
---

# ahead
コールバックを実行する画面端からの距離を設定します。初期値は`0`です。

## ahead: number
画面端からの距離をピクセルまたは画面サイズの倍率で設定します。
正数は画面外へ、負数は画面内へ画面端からの距離を設定します。
絶対値が1以上の数値はピクセル、1未満の数値は10倍した数値による倍率となります。

<pre class="sh brush: js;">
$.vt({
  ahead: 1000 // 1000px
  ...
});

$.vt({
  ahead: .1 // $(window).height() * 1
  ...
});

$.vt({
  ahead: -.05 // $(window).height() * -0.5
  ...
});
</pre>

## ahead: array
画面端からの距離を上下個別に設定します。1つ目の要素が上端からの距離、2つ目の要素が下端からの距離となります。

<pre class="sh brush: js;">
$.vt({
  ahead: [0, .1]
  ...
});
</pre>
