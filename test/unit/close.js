
suite("close", function () {

  test("close", function (done) {
    $init(1);
    $.vt({
      trigger: 'li',
      delay: 0,
      handler: function (i) {
        if (i) { return; }

        done(false);
      }
    }).close().vtrigger();

    setTimeout(done, 100);

  });

});
