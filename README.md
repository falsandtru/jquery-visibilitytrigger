#visibilitytrigger

visibilitytrigger(vt)は特定のHTML要素が画面内に表示されることをトリガーとしてスクリプトを遅延実行するjQueryプラグインです。

ページの初期表示時において、表示領域外にあるコンテンツの読み込みやこれに対するスクリプトの実行などを抑制・待機することでページの表示を高速化することができます。

##概要
指定のHTML要素が画面下の表示領域外から表示領域内に入り、画面に表示されることをトリガーとしてコールバックに設定した関数を、表示された個別のHTML要素を基点に実行します。

たとえば、LazyLoadのような画像遅延読み込み機能を次のような形で簡単に実装できます。

```javascript
$.visibilitytrigger({
  trigger : 'img[data-origin]' ,
  callback : function(){ this.src = $(this).attr('data-origin'); }
}).vtrigger() ;
```

<a href="http://sa-kusaku.sakura.ne.jp/output/visibilitytrigger/" target="_blank">このサイト</a>の画像読み込みやコードのシンタックスハイライトもvisibilitytriggerの機能により実行されています。これは、スマートフォンなど処理能力の低い端末でサイトを表示する場合に顕著なレスポンス向上効果があります。

※パラメータで`skip`を有効にしていない場合、画面の下端より上に位置しているトリガーとなるHTML要素（以下トリガー要素）は画面の表示領域外にあってもすべて表示されているものとして扱われ、コールバック関数が実行されます。

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
+ コールバック関数の実行頻度の制御（`interval``delay`）。
+ <a href="http://sa-kusaku.sakura.ne.jp/output/validator/">validator</a>によるユーザー環境下でのエラー検出

##使用法
visibilitytriggerはvtというエイリアスで呼び出すことができます。以下、vtをvisibilitytriggerの略称として使用します。また、エイリアスはjQueryでまだ使用されていない範囲で自由に追加することができます。ただし、最初の1回は必ずvisibilitytriggerを使用してエイリアスを登録しなければなりません。

###用語
説明のため以下のとおり定義して用語を使用します。

####イベントアクション
クリックやスクロールなどのイベントに結び付けられて実行される関数の動作

####トリガー要素
表示状態の評価対象であるHTML要素

###jQuery
v1.7.2の使用を推奨します。

v1.4.2から動作します。

###Register

####*$.visibilitytrigger( Setting as object )*
####*$.fn.visibilitytrigger( Setting as object )*
イベントアクション（vtカスタムイベント）を登録します。コンテキストが指定されなかった場合は`$(document).vt(Setting)`のショートカットとなり`document`オブジェクトに登録されます。コンテキストには複数の要素を設定することができ、実行状態は個別に管理されます。複数回vtを実行して登録する場合は個別にネームスペースを設定してください。

このプラグインは独自の`vt`イベントを持ち、末尾に`.vtrigger()`を加えて`vt`イベントを実行することで`scroll`イベントを発生させずにイベントアクションを実行させることができます。ネームスペースを設定した場合は`.vtrigger('namespace')`となります。`scroll`イベントを介さず`vt`イベントを直接実行するため`scroll`イベントとそのイベントアクションに影響を与えません。vtのイベントアクションの実行によりトリガー要素がチェックされ、条件に一致するトリガー要素を基点として個別にコールバック関数が実行されます。`mult`パラメータが無効かつ`skip`パラメータが有効である場合のみ、コールバック関数の戻り値に`false`を指定することで実行をスキップすることができます。

```javascript
$.visibilitytrigger({ trigger:'.target' }).vtrigger();
$('.container').visibilitytrigger({ trigger:'.target' }).vtrigger();
```

####*$.visibilitytrigger( Element as element )*
コンテキストを追加します。`$(Element).vt()``.add(Element).vt()`のショートカットです。コンテキストがある状態でvtを実行した場合、jQueryの`.end()`メソッドにより実行前の選択状態に戻ることができます。

####*$.visibilitytrigger( Alias as string )*
visibilitytriggerのエイリアスを登録します。パラメータが設定されなかった場合は初期値である`vt`が登録されます。空文字`''`を設定した場合は初期値が削除されエイリアスが登録されません。

```javascript
$.visibilitytrigger();
$.vt('vtalias');
$.vtalias(Setting);
```

```javascript
$.visibilitytrigger('');
$.vt(); // error
```

####*$.visibilitytrigger()*
vtのメソッドを追加したコンテキストを返します。初回実行時である場合は、エイリアスの初期値である`vt`をエイリアスに登録します。この登録はパラメータに空文字`''`を設定することで回避できます

###Parameter
パラメータはすべてパラメータ用オブジェクトのプロパティに設定して渡します。パラメータとなるオブジェクトのプロパティは以下のとおりです

####*gns: Alias as string*
グローバルネームスペースです。設定値はエイリアスとして登録されます。初期値は`visibilitytrigger`です。

####*ns: Namespace as string*
ネームスペースです。vtを複数登録する場合は個別のネームスペースを設定してください。初期値は`null`です。

####*trigger: Selector as string* **（必須）**
表示状態を評価するHTML要素をjQueryセレクタで設定します。

####*callback: function( customEvent, nativeEvent, info )* **（必須）**
トリガー実行時に呼ばれるコールバック関数を設定します。コンテキストとして評価対象のHTML要素が与えられます。`info`の内容は次のとおりです。

#####*activator*
イベントを起動した要素

#####*contaner*
vtのコンテキストのうちトリガー要素の属するもの

#####*selector*
vt登録時に設定されたセレクタ

#####*index*
トリガー要素のインデクス

#####*direction*
スクロール方向

#####*distance*
スクロール距離

#####*relations*
コンテキストに複数の要素が設定された場合、それらの要素

#####*parameter*
登録時に設定したパラメータ

####*parameter: any*
コールバック関数に渡されるパラメータを設定します。

####*ahead: Distance*
コールバック関数を実行する表示位置を画面端からの距離で設定します。初期値は`0`です。

#####*ahead: Distance as number*
画面端からの距離をピクセルで設定します。

#####*ahead: Distance as string*
画面端からの距離を比率で設定します。`*2`は画面の高さの2倍となります

#####*ahead: Distances as array*
画面端からの距離を配列で上下個別に設定します。配列の１つ目の要素が上端からの距離、２つ目の要素が下端からの距離となります。

####*beforehand: Index / Switch*
あらかじめコールバック関数を実行するHTML要素数を設定します。初期値は`0`で無効です。

#####*beforehand: Index as number*
正数は先頭から、負数は末尾から数えます。`-1`はすべてのターゲット要素が対象となります。

#####*beforehand: Switch as boolean*
`true`は`-1`、`false`は`0`となります。

####*step: Step as number*
次に表示状態を評価するHTML要素のインデクスの増減値を設定します。初期値は`1`です。

通常は設定の必要はありませんが、コールバック関数の実行により基点となったHTML要素が削除される場合に`0`を設定するなど、DOM上において基点となったHTML要素以前の位置に存在したトリガー要素の数が固定的に変化する場合に有用です。

####*multi: boolean*
同一のトリガー要素に対してコールバック関数を複数回実行可能にするかを設定します。初期値は`false`で無効です。

####*skip: boolean*
画面の表示領域外に存在するトリガー要素のコールバック関数の実行をスキップするかを設定します。初期値は`false`で無効です。

####*extend: boolean*
`$.fn.visibilitytrigger`により登録したイベントアクションを、設定したHTML要素のスクロールに加えて`window`オブジェクトのスクロールからも実行させるかを設定します。初期値は`true`で有効です。

`$.fn.visibilitytrigger`によりイベントアクションが登録されたHTML要素（スクロール領域を持つHTML要素。トリガー要素ではない。）が大量にある場合は動作が重くなる可能性があるため、`$.fn.visibilitytrigger`を使用して重くなった場合は無効の設定を試してください。

####*delay: Millisecond as number*
コールバック関数（正確にはコールバック関数を実行するかを決めるトリガー要素のチェック）がスクロールイベント発生後実行されるまでの待機時間を`50`を最小値とするミリ秒で設定します。待機時間が経過する前に新たなスクロールが行われた場合は前回までのスクロールによる待機中のコールバック関数の実行はキャンセルされます。jQueryの`trigger()`メソッドによりvisibilitytriggerイベントを直接発生させた場合は`delay`の設定にかかわらずただちに実行されます。初期値は`300`です。

####*interval: Millisecond as number*
コールバック関数の実行間隔を`50`を最小値とするミリ秒で設定します。ほかの処理を割り込ませる隙間を作ることになるため擬似的なプライオリティーとして使用できます。初期値は`0`で無効です。

####*reset: reset: Switch as boolean / Setting as object*
`reset()`メソッドを実行した場合の動作を設定します。`true`を設定した場合は既存の登録を削除し、同じ設定で新たに登録しなおします。オブジェクトによりパラメータの初期化値を設定した場合はその値で実行状態を初期化します（例：`{ index: 0, count: 0 }`）。`false`を設定した場合は既存の登録を変更せず、自動的に削除されるか`release()`メソッドで削除するまで上書きすることもできません。初期値は`true`です。

####*terminate: boolean*
すべてのトリガー要素のコールバック関数の実行後に`vt`イベントの登録を自動的に解除するかを設定します。`multi`が有効の場合は無効です。初期値は`true`で自動的に解除されます。

###Method
コンテキストが設定されている場合（`$(document).vt().method`）はコンテキストで絞込み、設定されていない場合（`$.vt.function`）はすべての登録が対象となります。コンテキストが設定されている場合の走査はjQueryの`trigger()`メソッドを使用し、設定されていない場合はすべての登録を持つ配列を使用して行われます。

`Key`にはネームスペースを設定し、設定された場合はこれによりネームスペースが絞り込まれます。`img`は`img.0``img.abc`に一致し、`imgimg``some.img`に一致しません。`img.0`は`img``0``0.img`に一致します。設定されなかった場合はコンテキスト内のすべての登録が対象となります。

`Bubbling`にはコンテキストを設定して使用する場合（内部で`trigger()`メソッドを使用）にバブリングにより親要素も対象とするかを設定します。

####*enable( [ Key as string [, Bubbling as boolean ]] )*
vtを有効にします。

####*disable( [ Key as string [, Bubbling as boolean ]] )*
vtを無効にします。

####*reset( [ Key as string [, Bubbling as boolean ]] )*
`Setting.reset`の値に応じてvtの登録を初期化します。

####*release( [ Key as string [, Bubbling as boolean ]] )*
vtの登録を削除します。

####*vtrigger( [ Key as string [, Bubbling as boolean ]] )*
vtのイベントアクションを実行します。jQueryの`trigger()`メソッドの拡張です。イベントタイプを省略し、ネームスペースのみで動作します。また、カンマまたはスペース区切りで複数のネームスペースを設定できます。

####*isRegistrate( [ Key as string ] )*
vtが登録されているかを確認します。親要素は対象となりません。

###Property
なし

##記述例
###導入
シンプルな実行例です。３００個の緑色のブロックを表示と同時に黄色に塗ります。

実行する関数は`callback`に設定し、実行時に渡す引数は`parameter`に設定します。引数は第一引数がイベントオブジェクト、第二引数が設定した`parameter`となります。

**<a href="http://falsandtru.github.io/visibilitytrigger/demo/install/" target="_blank">demo</a>**

```javascript
  $.vt({ trigger: 'li', callback: callback }).vtrigger();
```

```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>visibilitytrigger</title>
<script type="text/javascript" charset="utf-8" src="/lib/jquery-1.7.2.min.js"></script>
<script type="text/javascript" charset="utf-8" src="/lib/jquery.visibilitytrigger.min.js"></script>
<script type="text/javascript">

$(function()
{
  var elt=$('li:first-child');
  for(var i=1;i<300;i++){ $(elt).clone(true).insertAfter(elt); }
  
  $.visibilitytrigger();
  
  $.vt({ trigger: 'li', callback: callback }).vtrigger();
});

function callback(event, arg)
{
  $(this).removeClass('green').addClass('yellow');
  ++this.innerHTML;
  $('div.green').text($('li.green').length);
  $('div.yellow').text($('li.yellow').length);
}

</script>
<style type="text/css">

/* 省略 */

</style>
</head>
<body>
  <h1>visibilitytrigger</h1>
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
visibilitytriggerの動作がもっとも可視化されたデモです。

`multi`を有効にすることで同一のトリガー要素に対して繰り返しコールバック関数を実行させることができます。この場合は`terminate`の設定にかかわらず、トリガー要素が存在しなくなることが解除条件となります。

白色のブロックを下方向へのスクロールにより表示された場合は黄色に、上方向へのスクロールにより表示された場合は緑色に塗ります。

**<a href="http://falsandtru.github.io/visibilitytrigger/demo/multi/" target="_blank">demo</a>**

```javascript
  $('ol').vt({ trigger: 'li', callback: callback, multi: true }).vtrigger();
```

###先読み - ahead
表示領域に`ahead`で設定した距離まで近づいた時点でコールバック関数を実行します。通常は正数を設定しますが今回は負数を設定して表示領域内でコールバック関数の動作を視認できる形で実行させます。

**<a href="http://falsandtru.github.io/visibilitytrigger/demo/ahead/" target="_blank">demo</a>**

```javascript
  $.vt({ trigger: 'li', callback: callback, ahead: -200 }).vtrigger();
```

###事前実行 - beforehand
先頭から`beforehand`で設定した数のHTML要素のコールバック関数をあらかじめ実行します。

**<a href="http://falsandtru.github.io/visibilitytrigger/demo/beforehand/" target="_blank">demo</a>**

```javascript
  $.vt({ trigger: 'li', callback: callback, beforehand: 10 }).vtrigger();
```

###実行待機 - delay
コールバック関数がスクロール完了後実行されるまでの待機時間をミリ秒で設定します。待機時間が経過する前に新たなスクロールが行われた場合は前回までのスクロールによる待機中のコールバック関数はキャンセルされます。つまり、待機時間がスクロール中のスクロールイベントの発生間隔より長ければスクロール中にはコールバック関数が実行されません。待機とキャンセルを行わず、コールバック関数をスクロールイベントの発生ごとに即座に実行させたい場合は`0`を設定します。

スクロール中の`visibilitytrigger`イベントをキャンセルすることでトリガー要素の表示状態を評価する回数を大幅に減らすことができるため、実行速度の低い環境（IE8以下のブラウザ）では有効にすることを推奨します。スマートフォンなどのブラウザではスクロールイベントの発生自体が抑制されているため考慮は不要です。実行環境による設定の切り替えは<a href="http://sa-kusaku.sakura.ne.jp/output/clientenv/">jquery.clientenv.js</a>を使用すると簡単に行うことができます

**<a href="http://falsandtru.github.io/visibilitytrigger/demo/delay/" target="_blank">demo</a>**

```javascript
  $.vt({ trigger: 'li', callback: callback, delay: 1000 }).vtrigger();
```

###実行間隔 - interval
コールバック関数を実行する間隔を設定します。サーバーへのリクエスト間隔を制御したい場合などに有効です。また、コールバック関数を連続して実行せず待機中にほかの処理を割り込ませることができるため擬似的なプライオリティーとしても使用できます。

スクロール中の`visibilitytrigger`イベントをキャンセルすることでトリガー要素の表示状態を評価する回数を大幅に減らすことができるため、実行速度の低い環境（IE8以下のブラウザ）では有効にすることを推奨します。スマートフォンなどのブラウザではスクロールイベントの発生自体が抑制されているため考慮は不要です。実行環境による設定の切り替えは<a href="http://sa-kusaku.sakura.ne.jp/output/clientenv/">jquery.clientenv.js</a>を使用すると簡単に行うことができます

**<a href="http://falsandtru.github.io/visibilitytrigger/demo/interval/" target="_blank">demo</a>**

```javascript
  $.vt({ trigger: 'li', callback: callback, interval: 1000 }).vtrigger();
```

###迂回実行 - skip
表示領域が瞬間的に移動された場合に、移動元と移動先の間に存在し、移動前後いずれにおいても表示されなかったトリガー要素に対してはコールバック関数を実行しません。旧版のscrolltrigerとの主な相違点となる動作です。

**<a href="http://falsandtru.github.io/visibilitytrigger/demo/skip/" target="_blank">demo</a>**

```javascript
  $.vt({ trigger: 'li', callback: callback, skip: true }).vtrigger();
```

###実行撤回 - return false
コールバック関数の戻り値に`false`を設定した場合、そのトリガー要素のイベントアクションを実行しなかったものとして扱い、再度実行可能な状態にします。デモは5の倍数番目の要素が1回目の実行はキャンセルされ2回目の実行で完了します。

**<a href="http://falsandtru.github.io/visibilitytrigger/demo/cancel/" target="_blank">demo</a>**

```javascript
  $.vt({ trigger: 'li', callback: callback }).vtrigger();
```

###対象指定 - $.fn.visibilitytrigger
指定のHTML要素にイベントアクションを登録できます。`extend: false`を設定しなければ`window`オブジェクトのスクロールイベントからもイベントアクションが起動します。スクロールイベントを持つHTML要素が複数対象となる場合でも個別にイベントを管理します。

**<a href="http://falsandtru.github.io/visibilitytrigger/demo/fn/" target="_blank">demo</a>**

```javascript
  $('ol').visibilitytrigger({ trigger: 'li', callback: callback }).vtrigger();
```

###名前空間 - ns
ネームスペースを`ns`で設定することで同一の領域に複数のイベントアクションを登録できます。トリガーの引数にネームスペースを加えると個別にイベントアクションが実行されます。

**<a href="http://falsandtru.github.io/visibilitytrigger/demo/ns/sequent/" target="_blank">demo</a>**

```javascript
  $.vt({ ns: 'odd', trigger: 'li:odd', callback: callback, parameter: 'odd' }).vtrigger('odd');
  $.vt({ ns: 'even', trigger: 'li:even', callback: callback, parameter: 'even' }).vtrigger('even');
```

複数のイベントアクションを登録後にネームスペースを設定せずに`visibilitytrigger`イベントを実行することで同じオブジェクトに登録されているイベントアクションをまとめて実行することもできます。

**<a href="http://falsandtru.github.io/visibilitytrigger/demo/ns/mass/" target="_blank">demo</a>**

```javascript
  $.vt({ ns: 'odd', trigger: 'li:odd', callback: callback, parameter: 'odd' });
  $.vt({ ns: 'even', trigger: 'li:even', callback: callback, parameter: 'even' });
  $.vt(document).vtrigger();
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

###<a href="https://github.com/falsandtru/jquery.visibilitytrigger.js">visibilitytrigger</a>
スクロールにより特定のHTML要素が画面に表示されることを条件としてスクリプトを遅延実行させます。

###<a href="http://sa-kusaku.sakura.ne.jp/output/clientenv/">clientenv</a>
サイトの閲覧者のOS、ブラウザ、フォント対応などを判定してクロスブラウザ対応の労力を軽減します。

###<a href="http://sa-kusaku.sakura.ne.jp/output/validator/">validator</a>
JavaScriptの動作検証とエラーレポートを行う、インストール不要の埋め込み型検証ツールです。

###<a href="http://sa-kusaku.sakura.ne.jp/output/spage/">spage</a>
AutoPagerやAutoPatchWorkのようなページの自動読み込み＆継ぎ足し機能をウェブサイトに実装します。
