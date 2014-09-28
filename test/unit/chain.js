
suite("chain", function () {

  test("boolean", function (done) {
    $init(1)
    .vt({
      trigger: 'li',
      handler: function (i, e, param) {
        switch (i) {
          case 0:
            return true;
          case 1:
            return true === param ? false : 0;
          case 2:
            return false === param ? true : 0;
          case 3:
            return param && done();
          default:
        }
      }
    });

    window.scrollBy(0, 1000);

  });

  test("number", function (done) {
    $init(1)
    .vt({
      trigger: 'li',
      handler: function (i, e, param) {
        switch (i) {
          case 0:
            return i;
          case 1:
            return 0 === param && i;
          case 2:
            return 1 === param && i;
          case 3:
            return param && done();
          default:
        }
      }
    });

    window.scrollBy(0, 1000);

  });

  test("string", function (done) {
    $init(1)
    .vt({
      trigger: 'li',
      handler: function (i, e, param) {
        switch (i) {
          case 0:
            return 'chain';
          case 1:
            return 'chain' === param ? '' : 0;
          case 2:
            return '' === param ? true : 0;
          case 3:
            return param && done();
          default:
        }
      }
    });

    window.scrollBy(0, 1000);

  });

  test("array", function (done) {
    $init(1)
    .vt({
      trigger: 'li',
      handler: function (i, e, param) {
        switch (i) {
          case 0:
            return ['chain'];
          case 1:
            return 1 === param.length ? [] : 0;
          case 2:
            return 0 === param.length ? true : 0;
          case 3:
            return param && done();
          default:
        }
      }
    });

    window.scrollBy(0, 1000);

  });

  test("object", function (done) {
    $init(1)
    .vt({
      trigger: 'li',
      handler: function (i, e, param) {
        switch (i) {
          case 0:
            return {};
          case 1:
            return 'object' === typeof param ? null : 0;
          case 2:
            return null === param ? true : 0;
          case 3:
            return param && done();
          default:
        }
      }
    });

    window.scrollBy(0, 1000);

  });

  test("function", function (done) {
    $init(1)
    .vt({
      trigger: 'li',
      handler: function (i, e, param) {
        switch (i) {
          case 0:
            return new Function();
          case 1:
            return 'function' === typeof param ? undefined : 0;
          case 2:
            return undefined === param ? true : 0;
          case 3:
            return param && done();
          default:
        }
      }
    });

    window.scrollBy(0, 1000);

  });

  test("element", function (done) {
    $init(1)
    .vt({
      trigger: 'li',
      handler: function (i, e, param) {
        switch (i) {
          case 0:
            return document.body;
          case 1:
            return document.body === param ? window : 0;
          case 2:
            return window === param ? true : 0;
          case 3:
            return param && done();
          default:
        }
      }
    });

    window.scrollBy(0, 1000);

  });

});
