$(function () {
  $('<div>').addClass('counter').append($('<div>').addClass('yellow')).append($('<div>').addClass('green')).appendTo('body');
  $('<li>').html(0).appendTo('<ol>').parent().map(function () {
    var ol = $(this), li = $(this).children(), i = 100;
    while (--i) { ol.append(li.clone()) }
    return ol[0];
  }).appendTo('body');
});
