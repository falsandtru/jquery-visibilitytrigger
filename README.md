#displaytrigger

displaytriggerは特定のHTML要素が画面内に表示されることをトリガーとしてスクリプトを遅延実行するjQueryプラグインです。

ページの初期表示時において、表示領域外にあるコンテンツの読み込みやこれに対するスクリプトの実行などを抑制・待機することでページの表示を高速化することができます。

##概要
指定のHTML要素が画面下の表示領域外から表示領域内に入り、画面に表示されることをトリガーとしてコールバックに設定した関数を、表示された個別のHTML要素を基点に実行します。

たとえば、LazyLoadのような画像遅延読み込み機能を次のような形で簡単に実装できます。

```javascript
$.displaytrigger({
  trigger : 'img[data-origin]' ,
  callback : function(){ this.src = $(this).attr('data-origin'); }
}).trigger('displaytrigger') ;
```

<a href="http://sa-kusaku.sakura.ne.jp/output/displaytrigger/" target="_blank">このサイト</a>の画像読み込みやコードのシンタックスハイライトもdisplaytriggerの機能により実行されています。これは、スマートフォンなど処理能力の低い端末でサイトを表示する場合に顕著なレスポンス向上効果があります。

※パラメータで`skip`を有効にしていない場合、画面の下端より上に位置しているトリガーとなるHTML要素（以下トリガー要素）は画面の表示領域外にあってもすべて表示されているものとして扱われ、コールバック関数が実行されます（旧版であるscrolltriggerの互換動作）。

##特徴

+ HTML要素が画面外から画面内に入った瞬間にだけ実行されます。
+ スクロール完了後一定時間経過するまで実行を待機することができます。
+ トリガー要素が大量にある場合でも要素数に影響されず高速に動作します。
+ 処理能力の低いブラウザでも比較的高速に動作します。
+ 個別のスクロール領域も対象にできます。
+ HTML要素が画面端から指定の距離に到達した時点でコールバック関数を実行することができます。
+ コールバック関数をあらかじめ指定の数だけ実行できます。
+ そのほか自由度の高い柔軟な設定が可能です。

##対応

+ コールバック関数を実行する画面端からの距離の設定（`ahead`）。
+ displaytriggerの実行頻度の制御（`delay``suspend`）。
+ <a href="http://sa-kusaku.sakura.ne.jp/output/validator/">validator</a>によるユーザー環境下でのエラー検出

##使用法

###jQuery
v1.7.2の使用を推奨します。

v1.4.2から動作します。

###Register

####*$.displaytrigger( Parameter as object )*
イベントアクション（displaytriggerカスタムイベント）を登録します。`window`オブジェクトに登録されます。複数の登録を行う場合は個別にネームスペースを設定してください。

このプラグインは独自の`displaytrigger`イベントを持ち、末尾に`.trigger('displaytrigger')`を加えて`displaytrigger`イベントを実行することで`scroll`イベントを発生させずにイベントアクションを実行させることができます。ネームスペースを設定した場合は`.trigger('displaytrigger.namespace')`となります。ネームスペースを設定せずに`.trigger('displaytrigger')`により`displaytrigger`イベントを実行した場合、同じオブジェクトに登録されたすべての`displaytrigger`イベントとそのイベントアクションが実行されます。`scroll`イベントを介さず`displaytrigger`イベントを直接実行するため`scroll`イベントとそのイベントアクションに影響を与えません。displaytriggerのイベントアクションの実行によりトリガー要素がチェックされ、条件に一致するトリガー要素を基点として個別にコールバック関数が実行されます。独自イベント名は初期値では`displaytrigger`となっていますが`gns`プロパティを設定することで変更できます。

```javascript
$.displaytrigger({ trigger:'.target' }).trigger('displaytrigger');
```

####*$.fn.displaytrigger( Parameter as object )*
CSSの`overflow`プロパティの値を`auto`または`scroll`に設定し、かつ、`position`プロパティの値を初期値である`static`以外に設定した個別のHTML要素にイベントアクションを登録できます。

`expand: false`を設定せずに`$.fn.displaytrigger`により複数のHTML要素に登録を行う場合は必ずネームスペースを設定してください。

```javascript
$('.container').displaytrigger({ trigger:'.target' }).trigger('displaytrigger');
```

###Parameter
パラメータはすべてパラメータ用オブジェクトのプロパティに設定して渡します。パラメータとなるオブジェクトのプロパティは以下のとおりです

####*gns: Namespace as string*
グローバルネームスペースです。通常は設定は不要です。

####*ns: Namespace as string*
ネームスペースです。ネームスペースを設定する場合はこちらを使用してください。

####*trigger: Selector as string* **（必須）**
表示状態を確認するHTML要素をjQueryセレクタで選択します。

####*callback: function( event, parameter, scrollinfo )*
トリガー実行時に呼ばれるコールバック関数を設定します。

####*parameter: array*
コールバック関数に渡されるパラメータを配列で設定します。

####*ahead: Distance*
コールバック関数を実行する表示位置を画面端からの距離で設定します。設定値が`-1`以上`1`以下である場合は、画面の高さに設定値を乗じた値（トリガー要素の-100～100%の高さ）となります。初期値は`0`です。

#####*ahead: Distance as number*
コールバック関数を実行する画面端からの距離を数値で設定します。

#####*ahead: Distances as array*
コールバック関数を実行する画面端からの距離を配列で上下個別に設定します。配列の１つ目の要素が上端からの距離、２つ目の要素が下端からの距離となります。

####*beforehand: Index as number*
あらかじめコールバック関数を実行するHTML要素の範囲を先頭からの数で設定します。初期値は`0`です。

####*step: Step as number*
次に表示状態を確認するHTML要素のインデクスの増減値を設定します。初期値は`1`です。

通常は設定の必要はありませんが、コールバック関数の実行により基点となったHTML要素が削除される場合に`0`を設定するなど、DOM上において基点となったHTML要素以前の位置に存在したトリガー要素の数が固定的に変化する場合に有用です。

####*multi: boolean*
同一のトリガー要素に対してコールバック関数を複数回実行可能にするかを設定します。初期値は`false`で無効です。

####*skip: boolean*
画面の表示領域外に存在するトリガー要素のコールバック関数の実行をスキップするかを設定します。初期値は`false`であり、旧版であるscrolltriggerの互換として動作します。この場合、画面の表示領域外であっても画面の下端より上に位置しているすべてのトリガー要素でコールバック関数が実行されます。

####*expand: boolean*
`$.fn.displaytrigger`により登録したイベントアクションを、設定したHTML要素のスクロールに加えて`window`オブジェクトのスクロールからも実行させるかを設定します。初期値は`true`で有効です。

`$.fn.displaytrigger`によりイベントアクションが登録されたHTML要素（スクロール領域を持つHTML要素。トリガー要素ではない。）が大量にある場合は動作が重くなる可能性があるため、`$.fn.displaytrigger`を使用して重くなった場合は無効の設定を試してください。

####*delay: Millisecond as number*
コールバック関数（正確にはコールバック関数を実行するかを決めるトリガー要素のチェック）がスクロールイベント発生後実行されるまでの待機時間をミリ秒で設定します。待機時間が経過する前に新たなスクロールが行われた場合は前回までのスクロールによる待機中のコールバック関数の実行はキャンセルされます。jQueryの`trigger`メソッドによりdisplaytriggerイベントを直接発生させた場合は`delay`の設定にかかわらずただちに実行されます。初期値は`300`です。

####*suspend: number*
displaytriggerイベントの発生後、このイベントの発生を抑制する時間をミリ秒で設定します。抑制中はdisplaytriggerイベントを発生させても無効となります。設定値を0にするとイベントが抑制されません。初期値は`-100`です。

#####*suspend: Millisecond as number*
設定値が正数である場合、設定値が抑制時間となります。設定値が負数である場合、`delay`に設定値を加えた値（最小値を0とする`delay`より短い時間）が抑制時間となります。

#####*suspend: Rate as number*
設定値が0以上1未満の小数である場合、`delay`に設定値を乗じた値が抑制時間となります。

####*mode: Mode as string*
displaytriggerの動作モードを設定します。`show``border`モード（設定値）が設定できます。初期値は`"show"`です。

各モードの動作は次のとおりです。

#####*show*
トリガー要素が画面内に表示されることをトリガーとしてイベントアクションを実行します。

#####*border*
トリガー要素が境界線を越えることをトリガーとしてイベントアクションを実行します。初期状態では下方向へのスクロール時は画面上端、上方向へのスクロール時は画面下端が境界となります。画面内に表示されている（上下に）隣接するトリガー要素を交互に切り替えてコールバック関数を実行することができます。

####*terminate: boolean*
すべてのトリガー要素のコールバック関数の実行後にdisplaytriggerイベントの登録を自動的に解除するかを設定します。`multi: true`が設定されている場合は無効です。初期値は`true`で自動的に解除されます。ただし、トリガー要素が存在しなくなった時点で設定にかかわらず自動的に解除されます。

このように基本的にその他の設定に応じて適切なタイミングで自動的に解除されるため通常は設定は不要です。

###Method
なし

###Property
なし

##記述例
###導入
シンプルな実行例です。３００個の緑色のブロックを表示と同時に黄色に塗ります。

実行する関数は`callback`に設定し、実行時に渡す引数は`parameter`に設定します。引数は第一引数がイベントオブジェクト、第二引数が設定した`parameter`となります。

**<a href="http://sa-kusaku.sakura.ne.jp/output/displaytrigger/demo/install/" target="_blank">demo</a>**

```javascript
  $.displaytrigger({ trigger: 'li', callback: callback }).trigger('displaytrigger');
```

```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>displaytrigger</title>
<script type="text/javascript" charset="utf-8" src="/lib/jquery-1.7.2.min.js"></script>
<script type="text/javascript" charset="utf-8" src="/lib/jquery.displaytrigger.min.js"></script>
<script type="text/javascript">

$(function()
{
  var elt=$('li:first-child');
  for(var i=1;i<300;i++){ $(elt).clone(true).insertAfter(elt); }
  
  $.displaytrigger({ trigger: 'li', callback: callback }).trigger('displaytrigger');
  
  
});

function callback(event, arg)
{
  $(this).removeClass('green').addClass('yellow').text(arg);
  $('div.green').text($('li.green').length);
  $('div.yellow').text($('li.yellow').length);
}

</script>
<style type="text/css">

/* 省略 */

</style>
</head>
<body>
  <h1>displaytrigger</h1>
  <div class="counter">
    <div class="yellow"></div>
    <div class="green"></div>
  </div>
  <ol>
    <li class="green"></li>
  </ol>
</body>
</html>
```

###複数回実行 - multi
displaytriggerの動作がもっとも可視化されたデモであり、旧版のscrolltrigerとの主な相違点となる動作です。

`multi`を有効にすることにより実行回数制限を解除することで同一のトリガー要素に対して繰り返しコールバック関数を実行させることができます。この場合は`terminate`の設定にかかわらず、トリガー要素が存在しなくなることが解除条件となります。

白色のブロックを下方向へのスクロールにより表示された場合は黄色に、上方向へのスクロールにより表示された場合は緑色に塗ります。

**<a href="http://sa-kusaku.sakura.ne.jp/output/displaytrigger/demo/multi/" target="_blank">demo</a>**

```javascript
  $.displaytrigger({ trigger: 'li', callback: callback, multi: true, delay: 300 }).trigger('displaytrigger');
```

###先読み - ahead
表示領域に`ahead`で設定した距離まで近づいた時点でコールバック関数を実行します。通常は正数を設定しますが今回は負数を設定して表示領域内でコールバック関数の動作を視認できる形で実行させます。

**<a href="http://sa-kusaku.sakura.ne.jp/output/displaytrigger/demo/ahead/" target="_blank">demo</a>**

```javascript
  $.displaytrigger({ trigger: 'li', callback: callback, ahead: -200 }).trigger('displaytrigger');
```

###事前実行 - beforehand
先頭から`beforehand`で設定した数のHTML要素のコールバック関数をあらかじめ実行します。

**<a href="http://sa-kusaku.sakura.ne.jp/output/displaytrigger/demo/beforehand/" target="_blank">demo</a>**

```javascript
  $.displaytrigger({ trigger: 'li', callback: callback, ahead: -200, beforehand: 10 }).trigger('displaytrigger');
```

###実行待機 - delay
コールバック関数がスクロール完了後実行されるまでの待機時間をミリ秒で設定します。待機時間が経過する前に新たなスクロールが行われた場合は前回までのスクロールによる待機中のコールバック関数はキャンセルされます。つまり、待機時間がスクロール中のスクロールイベントの発生間隔より長ければスクロール中にはコールバック関数が実行されません。待機とキャンセルを行わず、コールバック関数をスクロールイベントの発生ごとに即座に実行させたい場合は`0`を設定します。

スクロール中の`displaytrigger`イベントをキャンセルすることでトリガー要素の表示状態を確認する回数を大幅に減らすことができるため、実行速度の低い環境（IE8以下のブラウザ）では有効にすることを推奨します。スマートフォンなどのブラウザではスクロールイベントの発生自体が抑制されているため考慮は不要です。実行環境による設定の切り替えは<a href="http://sa-kusaku.sakura.ne.jp/output/clientenv/">jquery.clientenv.js</a>を使用すると簡単に行うことができます

**<a href="http://sa-kusaku.sakura.ne.jp/output/displaytrigger/demo/delay/" target="_blank">demo</a>**

```javascript
  $.displaytrigger({ trigger: 'li', callback: callback, delay: 1000 }).trigger('displaytrigger');
```

###迂回実行 - skip
表示領域が瞬間的に移動された場合に、移動元と移動先の間に存在し、移動前後いずれにおいても表示されなかったトリガー要素に対してはコールバック関数を実行しません。旧版のscrolltrigerとの主な相違点となる動作です。

**<a href="http://sa-kusaku.sakura.ne.jp/output/displaytrigger/demo/skip/" target="_blank">demo</a>**

```javascript
  $.displaytrigger({ trigger: 'li', callback: callback, delay: 1000, skip: true }).trigger('displaytrigger');
```

###対象指定 - $.fn.displaytrigger
指定のHTML要素にイベントアクションを登録できます。`expand: false`を設定しなければ`window`オブジェクトのスクロールイベントからもイベントアクションが起動します。スクロールイベントを持つHTML要素が複数対象となる場合でも個別にイベントを管理します。

**<a href="http://sa-kusaku.sakura.ne.jp/output/displaytrigger/demo/fn/" target="_blank">demo</a>**

```javascript
  $('ol').displaytrigger({ trigger: 'li', callback: callback, ahead: -200, beforehand: 5 }).trigger('displaytrigger');
```

###名前空間 - ns
ネームスペースを`ns`で設定することで同一の領域に複数のイベントアクションを登録できます。トリガーの引数にネームスペースを加えると個別にイベントアクションが実行されます。

**<a href="http://sa-kusaku.sakura.ne.jp/output/displaytrigger/demo/ns/sequent/" target="_blank">demo</a>**

```javascript
  $.displaytrigger({ ns: 'odd', trigger: 'li:odd', callback: callback, parameter: ['odd'], ahead: -200 }).trigger('displaytrigger.odd');
  $.displaytrigger({ ns: 'even', trigger: 'li:even', callback: callback, parameter: ['even'], ahead: -200 }).trigger('displaytrigger.even');
```

複数のイベントアクションを登録後にネームスペースを設定せずに`displaytrigger`イベントを実行することで同じオブジェクトに登録されているイベントアクションをまとめて実行することもできます。

**<a href="http://sa-kusaku.sakura.ne.jp/output/displaytrigger/demo/ns/mass/" target="_blank">demo</a>**

```javascript
  $.displaytrigger({ ns: 'odd', trigger: 'li:odd', callback: callback, parameter: ['odd'], ahead: -200 });
  $.displaytrigger({ ns: 'even', trigger: 'li:even', callback: callback, parameter: ['even'], ahead: -200 });
  $.displaytrigger().trigger('displaytrigger')  /* または $(window).trigger('displaytrigger'); */
```

##補足
HTML上の記述順序とブラウザ上の表示順序が一致していない場合は正常に動作しない場合があります。

ドキュメント内の用語の用法にはあまり自信がありません。間違いやバグに気づかれた方は<a href="http://sa-kusaku.sakura.ne.jp/service/board/">掲示板</a>または<a href="http://sa-kusaku.sakura.ne.jp/service/contact/">連絡フォーム</a>からご連絡ください。

##ライセンス - MIT License
以下に定める条件に従い、本ソフトウェアおよび関連文書のファイル（以下「ソフトウェア」）の複製を取得するすべての人に対し、ソフトウェアを無制限に扱うことを無償で許可します。これには、ソフトウェアの複製を使用、複写、変更、結合、掲載、頒布、サブライセンス、および/または販売する権利、およびソフトウェアを提供する相手に同じことを許可する権利も無制限に含まれます。
上記の著作権表示および本許諾表示を、ソフトウェアのすべての複製または重要な部分に記載するものとします。
ソフトウェアは「現状のまま」で、明示であるか暗黙であるかを問わず、何らの保証もなく提供されます。ここでいう保証とは、商品性、特定の目的への適合性、および権利非侵害についての保証も含みますが、それに限定されるものではありません。 作者または著作権者は、契約行為、不法行為、またはそれ以外であろうと、ソフトウェアに起因または関連し、あるいはソフトウェアの使用またはその他の扱いによって生じる一切の請求、損害、その他の義務について何らの責任も負わないものとします。

<a href="http://opensource.org/licenses/mit-license.php" target="_blank">http://opensource.org/licenses/mit-license.php</a>  
<a href="http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license" target="_blank">http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license</a>

##jQuery Plugins

###<a href="https://github.com/falsandtru/jquery.pjax.js">pjax</a>
HTML5による高速なページ移動機能をウェブサイトに実装します。

###<a href="https://github.com/falsandtru/jquery.displaytrigger.js">displaytrigger</a>
スクロールにより特定のHTML要素が画面に表示されることを条件としてスクリプトを遅延実行させます。

###<a href="http://sa-kusaku.sakura.ne.jp/output/clientenv/">clientenv</a>
サイトの閲覧者のOS、ブラウザ、フォント対応などを判定してクロスブラウザ対応の労力を軽減します。

###<a href="http://sa-kusaku.sakura.ne.jp/output/validator/">validator</a>
JavaScriptの動作検証とエラーレポートを行う、インストール不要の埋め込み型検証ツールです。

###<a href="http://sa-kusaku.sakura.ne.jp/output/spage/">spage</a>
AutoPagerやAutoPatchWorkのようなページの自動読み込み＆継ぎ足し機能をウェブサイトに実装します。

<style>
body {
  font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo, Osaka, "ＭＳ Ｐゴシック", "MS PGothic", Helvetica, Arial, freesans, clean, sans-serif;
}
</style>
