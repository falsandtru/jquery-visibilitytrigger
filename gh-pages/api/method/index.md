---
layout: bootstrap
title: Method
type: page
nav: nav
class: style-api style-api-list
---

# Method
`open()`メソッドを除くすべてのメソッドはコンテキストがjQueryのインスタンスオブジェクト`$()`である場合はコンテキストを起点とするイベントベースにより、スタティックオブジェクト`$`である場合は全登録の走査によりメソッドの対象を選択します。

`ns`パラメータを設定した場合、ネームスペースによりさらに対象を絞り込みます。`bubbling`パラメータを設定した場合、コンテキストの上位のDOM要素を走査範囲に含めます。`bubbling`パラメータはスタティックオブジェクトでは使用できません。

## [vtrigger()](api/method/vtrigger/) <small><span class="label label-info">chainable</span></small>
VTのイベント処理を実行します。

## [enable()](api/method/enable/) <small><span class="label label-info">chainable</span></small>
VTを有効にします。

## [disable()](api/method/disable/) <small><span class="label label-info">chainable</span></small>
VTを無効にします。

## [open()](api/method/open/) <small><span class="label label-info">chainable</span></small>
VTを設定します。

## [close()](api/method/close/) <small><span class="label label-info">chainable</span></small>
VTを削除します。
