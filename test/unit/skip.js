
suite("skip", function () {

  test("true", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      skip: true,
      param: 0,
      handler: function (i, e, p) {
        switch (true) {
          case 61 === i + 1:
            p = !(p < i);
            break;
          case 62 === i + 1:
            break;
          default:
            return ++p;
        }

        if (!p) {
          p = setTimeout(done, 1);
        } else {
          clearTimeout(p);
        }
        return p;
      }
    }).scrollTop(5000);

    window.scrollBy(0, 1000);

  });

  test("back", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      skip: true,
      handler: function (i, e, p, s) {
        switch (true) {
          case 61 === i +1:
            window.scrollBy(0, -1000);
            $(s.container).scrollTop(1000);
            return;
          case s.direction < 0 && 10 === i + 1:
            break;
          case s.direction < 0 && 9 === i + 1:
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
    }).scrollTop(5000);

    window.scrollBy(0, 1000);

  });

  test("false", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      skip: false,
      param: 0,
      handler: function (i, e, p) {
        switch (true) {
          case 61 === i + 1:
            p = !(p === i);
            break;
          case 62 === i + 1:
            break;
          default:
            return ++p;
        }

        if (!p) {
          p = setTimeout(done, 1);
        } else {
          clearTimeout(p);
        }
        return p;
      }
    }).scrollTop(5000);

    window.scrollBy(0, 1000);

  });

});
