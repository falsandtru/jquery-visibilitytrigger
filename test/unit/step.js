
suite("step", function () {

  test("0", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      step: 0,
      handler: function (i, e, p, s) {
        $(this).remove();
        !$('.fixture li').length && setTimeout(done, 10);
      }
    }).scrollTop(10000);

  });

});
