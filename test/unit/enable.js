
suite("enable", function () {

  test("enable", function (done) {
    $init(1);
    $.vt({
      trigger: 'li',
      delay: 0,
      handler: function (i) {
        if (i) { return; }

        done();
      }
    }).disable().enable().vtrigger();

  });

});
