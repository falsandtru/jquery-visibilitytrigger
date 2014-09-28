
suite("rush", function () {

  test("50", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      rush: 50,
      handler: function (i, e, p) {
        switch (true) {
          case 50 === i + 1:
            break;
          case 51 === i + 1:
            break;
          default:
            return;
        }

        if (!p) {
          p = setTimeout(done, 1);
        } else {
          clearTimeout(p);
        }
        return p;
      }
    }).scrollTop(1);

  });

  test("0", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      rush: 0,
      handler: function (i, e, p) {
        done();
      }
    }).scrollTop(1);

  });

  test("-1", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      rush: -1,
      handler: function (i, e, p) {
        if (i !== 99) { return; }

        done();
      }
    }).scrollTop(1);

  });

  test("100", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      rush: 100,
      handler: function (i, e, p) {
        if (i !== 99) { return; }

        done();
      }
    }).scrollTop(1);

  });

  test("101", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      rush: 101,
      handler: function (i, e, p) {
        if (i !== 99) { return; }

        done();
      }
    }).scrollTop(1);

  });

});
