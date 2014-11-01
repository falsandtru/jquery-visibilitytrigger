---
layout: bootstrap
title: Core
type: page
nav: nav
class: style-api style-api-list
---

# Core

## [visibilitytrigger()](api/core/visibilitytrigger/) <small><span class="label label-info">chainable</span></small>
VT(VisibilityTrigger)を設定します。

### [ns:](api/core/setting/ns/)
ネームスペースを設定します。

### [trigger:](api/core/setting/trigger/)
表示状態を監視する要素を設定します。

## [handler:](api/core/setting/handler/)
要素が表示された際に実行する関数を設定します。

### [param:](api/core/setting/param/)
`handler`パラメータの実行時に渡す引数を設定します。

### [chain:](api/core/setting/chain/)
`handler`パラメータの戻り値を次のパラメータとして使用するかを設定します。

### [rush:](api/core/setting/rush/)
イベント初回発生時に表示状態にかかわらずにコールバックを実行する要素数を設定します。

### [ahead:](api/core/setting/ahead/)
コールバックを実行する画面端からの距離を設定します。

### [skip:](api/core/setting/skip/)
1画面以上スクロールした際にその途中にある画面外の要素に対してコールバックを実行を省略するかを設定します。

### [repeat:](api/core/setting/repeat/)
再度表示された要素に対して繰り返しコールバックを実行するかを設定します。

### [delay:](api/core/setting/delay/)
連続したスクロールイベントが発生した場合に前回のイベントによる処理をキャンセルする待機時間を設定します。

### [step:](api/core/setting/step/)
次に選択する要素の間隔を設定します。

### [cache:](api/core/setting/cache/)
動作の高速化のため内部処理をキャッシュするかを設定します。

### [standby:](api/core/setting/standby/)
監視対象要素が事後に追加されるため監視を待機する場合に設定します。
