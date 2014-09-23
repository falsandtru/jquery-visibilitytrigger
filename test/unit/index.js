
mocha.setup('tdd');
mocha.setup('bdd');
var assert = chai.assert;
//expectの機能を読み込み
var expect = chai.expect;
//shouldの機能を読み込み
chai.Should();

mocha.checkLeaks();
mocha.globals(['jQuery*']);

window.onload = typeof __karma__ === 'undefined' && function() {
  $.mocha.run();
};

$.ajaxSetup({ async: false, cache: true });

function $init(count, nest) {
  count = count || 0;

  $.visibilitytrigger.close();

  var $fixture = $('<div/>', { 'class': 'fixture' }),
      $ol = $('<ol/>'),
      $li = $('<li/>');

  $('.fixture').remove();
  $.each(Array(100), function () { $ol.append($li.clone()); });
  $.each(Array(count), function () { $fixture.append($ol.clone()); });

  nest &&
  $fixture.find('ol').css({
    height: "1000px",
    "overflow-x": "hidden",
    "overflow-y": "scroll"
  });
  $fixture.appendTo('body');
  window.scrollTo(0, $fixture.offset().top - $(window).height());
  return $fixture;
}

var base = window.__karma__ ? "/base/test/" : "./";

$.visibilitytrigger();

document.write('<script src="' + base + 'unit/core.js" charset="utf-8"><\/script>');

document.write('<script src="' + base + 'unit/ns.js" charset="utf-8"><\/script>');
document.write('<script src="' + base + 'unit/handler.js" charset="utf-8"><\/script>');
document.write('<script src="' + base + 'unit/param.js" charset="utf-8"><\/script>');
document.write('<script src="' + base + 'unit/chain.js" charset="utf-8"><\/script>');
document.write('<script src="' + base + 'unit/rush.js" charset="utf-8"><\/script>');
document.write('<script src="' + base + 'unit/ahead.js" charset="utf-8"><\/script>');
document.write('<script src="' + base + 'unit/skip.js" charset="utf-8"><\/script>');
document.write('<script src="' + base + 'unit/repeat.js" charset="utf-8"><\/script>');
document.write('<script src="' + base + 'unit/delay.js" charset="utf-8"><\/script>');
document.write('<script src="' + base + 'unit/step.js" charset="utf-8"><\/script>');
document.write('<script src="' + base + 'unit/cache.js" charset="utf-8"><\/script>');
document.write('<script src="' + base + 'unit/standby.js" charset="utf-8"><\/script>');

document.write('<script src="' + base + 'unit/disable.js" charset="utf-8"><\/script>');
document.write('<script src="' + base + 'unit/enable.js" charset="utf-8"><\/script>');
document.write('<script src="' + base + 'unit/vtrigger.js" charset="utf-8"><\/script>');
document.write('<script src="' + base + 'unit/open.js" charset="utf-8"><\/script>');
document.write('<script src="' + base + 'unit/close.js" charset="utf-8"><\/script>');
