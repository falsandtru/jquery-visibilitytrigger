
suite("repeat", function () {

  test("true", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      repeat: true,
      param: 0,
      handler: function (i, e, p, s) {
        switch (true) {
          case s.direction > 0 && 1 === i + 1:
            return ++p;
          case s.direction < 0 && 1 === i + 1:
            assert.equal(++p, 2, 'count');
            done();
            break;
          case 10 === i + 1:
            assert.equal(s.direction, 1, 'turn');
            return p;
          case 11 === i + 1:
            $(s.container).scrollTop(0);
          default:
            return p;
        }
      }
    }).scrollTop(1000);

  });
  
  test("false", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      repeat: false,
      param: 0,
      handler: function (i, e, p, s) {
        switch (true) {
          case s.direction > 0 && 1 === i + 1:
            break;
          case s.direction < 0 && 1 === i + 1:
            clearTimeout(p);
            break;
          case s.direction > 0 && 10 === i + 1:
            return setTimeout(done, 400);
          case 10 === i + 1:
            assert.equal(s.direction, 1, 'turn');
            return p;
          case 11 === i + 1:
            $(s.container).scrollTop(0);
          default:
            return p;
        }
      }
    }).scrollTop(1000);

  });

  test("top", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      repeat: true,
      param: 0,
      handler: function (i, e, p, s) {
        switch (true) {
          case s.direction > 0 && 1 === i +1:
            $(s.container).scrollTop(0);
            return;
          case s.direction < 0 && 1 === i + 1:
            assert.equal(s.count, 2, 'top');
            break;
          case 11 === i + 1:
            $(s.container).scrollTop(50);
          default:
            return;
        }

        if (!p) {
          p = setTimeout(done, 400);
        } else {
          clearTimeout(p);
        }
        return p;
      }
    }).scrollTop(1000);

  });

  test("bottom", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      repeat: true,
      param: 0,
      handler: function (i, e, p, s) {
        switch (true) {
          case s.direction < 0 && 100 === i + 1:
          case s.direction > 0 && 100 === i + 1:
            $(s.container).scrollTop(9000);
            assert.equal(s.count, 1, 'bottom');
            break;
          default:
            return;
        }

        if (!p) {
          p = setTimeout(done, 400);
        } else {
          clearTimeout(p);
        }
        return p;
      }
    }).scrollTop(8950);

    window.scrollBy(0, 1000);

  });

  test("skip", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      repeat: true,
      skip: true,
      param: 0,
      handler: function (i, e, p, s) {
        switch (true) {
          case s.direction > 0 && 1 === i + 1:
            return ++p;
          case s.direction < 0 && 1 === i + 1:
            assert.equal(++p, 1, 'count');
            done();
            break;
          case 10 === i + 1:
            assert.equal(s.direction, 1, 'turn');
            return p;
          case 11 === i + 1:
            $(s.container).scrollTop(0);
          default:
            return p;
        }
      }
    }).scrollTop(1000);

  });

});
