---
layout: bootstrap
title: open
type: page
nav: nav
class: style-api style-api-detail
---

# open() <small><span class="label label-info">chainable</span></small>
VTを設定します。`visibilitytrigger()`と異なり、繰り返し設定を行ってもコンテキストを更新しません。

## open(Setting: setting): this

<pre class="sh brush: js;">
$('ol').add('ul').vt().end().length === 2;
$('ol').add('ul').vt().end().end().length === 1;
$('ol').add('ul').vt().vt().end().end().end().length === 1;
$('ol').add('ul').vt().open().end().end().length === 1;
</pre>
