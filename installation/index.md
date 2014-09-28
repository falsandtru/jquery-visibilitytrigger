---
layout: bootstrap
title: Installation
type: page
nav: nav
class: style-info
---

# Installation
画像読み込みとシンタックスハイライト機能を以下のように実装できます。

<pre class="sh brush: html;">
&lt;script charset="utf-8" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"&gt;&lt;/script&gt;
&lt;script charset="utf-8" src="/js/jquery.visibilitytrigger.js"&gt;&lt;/script&gt;
</pre>

<pre class="sh brush: js;">
$.visibilitytrigger();
$.vt({
  trigger: 'img.delay',
  handler: function () {
    this.src = this.getAttribute('data-origin');
  }
}).vtrigger();
</pre>

<pre class="sh brush: js;">
$.visibilitytrigger();
$.vt({
  trigger: 'pre.sh.delay',
  handler: function () {
    SyntaxHighlighter.highlight(SyntaxHighlighter.defaults, this);
  }
}).vtrigger();
</pre>

より高度な設定も可能です。

<pre class="sh brush: js;">
$.visibilitytrigger()
.vt({
  ns: '.img',
  trigger: 'img.delay',
  handler: function () {
    this.src = this.getAttribute('data-origin');
  },
  rush: 3,
  ahead: .1,
  skip: true
}).disable();

// any process

$.vt.enable().vtrigger();
</pre>

さらに、このような各種実装を多重登録しネームスペースによりグループ化して管理することができます。

<pre class="sh brush: js;">
$.visibilitytrigger
.open({
  ns: '.img.primary',
  trigger: '#primary img.delay',
  handler: function () {
    this.src = this.getAttribute('data-origin');
  },
  rush: 3,
  ahead: .1,
  skip: true
})
.open({
  ns: '.img.secondary',
  trigger: '#secondary img.delay',
  handler: function () {
    this.src = this.getAttribute('data-origin');
  },
  rush: 3,
  ahead: .1,
  skip: true
})
.open({
  ns: '.sh.primary',
  trigger: '#primary pre.sh.delay',
  handler: function () {
    SyntaxHighlighter.highlight(SyntaxHighlighter.defaults, this);
  },
  rush: 3,
  ahead: .1,
  skip: true,
  step: 0
})
.disable().enable('img').vtrigger();

// any process

$.vt.enable().vtrigger('primary').vtrigger();
</pre>
