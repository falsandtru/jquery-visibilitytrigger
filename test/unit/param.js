
suite("param", function () {

  test("boolean", function (done) {
    $init(1)
    .vt({
      trigger: 'li',
      param: true,
      handler: function (i, e, param) {
        if (0 !== i) { return; }

        true === param && done();
      }
    });

    window.scrollBy(0, 1);

  });

  test("number", function (done) {
    $init(1)
    .vt({
      trigger: 'li',
      param: 1,
      handler: function (i, e, param) {
        if (0 !== i) { return; }

        1 === param && done();
      }
    });

    window.scrollBy(0, 1);

  });

  test("string", function (done) {
    $init(1)
    .vt({
      trigger: 'li',
      param: 'param',
      handler: function (i, e, param) {
        if (0 !== i) { return; }

        'param' === param && done();
      }
    });

    window.scrollBy(0, 1);

  });

  test("array", function (done) {
    $init(1)
    .vt({
      trigger: 'li',
      param: [],
      handler: function (i, e, param) {
        if (0 !== i) { return; }

        param instanceof Array && done();
      }
    });

    window.scrollBy(0, 1);

  });

  test("object", function (done) {
    $init(1)
    .vt({
      trigger: 'li',
      param: {},
      handler: function (i, e, param) {
        if (0 !== i) { return; }

        'object' === typeof param && done();
      }
    });

    window.scrollBy(0, 1);

  });

  test("function", function (done) {
    $init(1)
    .vt({
      trigger: 'li',
      param: new Function(),
      handler: function (i, e, param) {
        if (0 !== i) { return; }

        'function' === typeof param && done();
      }
    });

    window.scrollBy(0, 1);

  });

  test("element", function (done) {
    $init(1)
    .vt({
      trigger: 'li',
      param: document.body,
      handler: function (i, e, param) {
        if (0 !== i) { return; }

        param === document.body && done();
      }
    });

    window.scrollBy(0, 1);

  });

  test("false", function (done) {
    $init(1)
    .vt({
      trigger: 'li',
      param: false,
      handler: function (i, e, param) {
        if (0 !== i) { return; }

        false === param && done();
      }
    });

    window.scrollBy(0, 1);

  });

  test("0", function (done) {
    $init(1)
    .vt({
      trigger: 'li',
      param: 0,
      handler: function (i, e, param) {
        if (0 !== i) { return; }

        0 === param && done();
      }
    });

    window.scrollBy(0, 1);

  });

  test("''", function (done) {
    $init(1)
    .vt({
      trigger: 'li',
      param: '',
      handler: function (i, e, param) {
        if (0 !== i) { return; }

        '' === param && done();
      }
    });

    window.scrollBy(0, 1);

  });

  test("null", function (done) {
    $init(1)
    .vt({
      trigger: 'li',
      param: null,
      handler: function (i, e, param) {
        if (0 !== i) { return; }

        null === param && done();
      }
    });

    window.scrollBy(0, 1);

  });

  test("undefined", function (done) {
    $init(1)
    .vt({
      trigger: 'li',
      param: undefined,
      handler: function (i, e, param) {
        if (0 !== i) { return; }

        undefined === param && done();
      }
    });

    window.scrollBy(0, 1);

  });

});
