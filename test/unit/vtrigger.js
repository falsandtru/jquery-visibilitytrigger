
suite("vtrigger", function () {

  test("vtrigger", function (done) {
    $init(1);
    $.vt({
      trigger: 'li',
      delay: 0,
      handler: function (i) {
        if (i) { return; }

        done();
      }
    }).vtrigger();

  });

});
