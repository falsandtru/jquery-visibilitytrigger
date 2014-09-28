
suite("delay", function () {

  test("500", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      delay: 500,
      param: new Date().getTime(),
      handler: function (i, e, p, s) {
        if (i) { return; }
        new Date().getTime() - p > 500 && done();
      }
    }).scrollTop(100);

  });

  test("1", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      delay: 1,
      param: new Date().getTime(),
      handler: function (i, e, p, s) {
        if (i) { return; }
        new Date().getTime() - p < 200 && done();
      }
    }).scrollTop(100);

  });

  test("0", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      delay: 0,
      param: new Date().getTime(),
      handler: function (i, e, p, s) {
        if (i) { return; }
        new Date().getTime() - p < 200 && done();
      }
    }).scrollTop(100);

  });

  test("nest", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      delay: 0,
      repeat: true,
      param: new Date().getTime(),
      handler: function (i, e, p, s) {
        switch (i) {
          case 10:
            $(s.container).scrollTop(2000);
            return;
          case 20:
            done();
            return;
        }
      }
    }).scrollTop(1000);

  });

});
