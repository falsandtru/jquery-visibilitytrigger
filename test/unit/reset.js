
suite("reset", function () {

  test("reset", function (done) {
    $init(1);
    $.vt({
      trigger: 'li',
      delay: 0,
      handler: function (i) {
        !i && uid && done();
      }
    }).vtrigger();

    var uid = $.data(document, 'visibilitytrigger');

    $.vt.reset().vtrigger();

  });

});
