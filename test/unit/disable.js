
suite("disable", function () {

  test("disable", function (done) {
    $init(1);
    $.vt({
      trigger: 'li',
      delay: 0,
      handler: function (i) {
        if (i) { return; }

        done(false);
      }
    }).disable().vtrigger();

    setTimeout(done, 100);

  });

});
