
suite("ahead", function () {

  test("500", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      ahead: 500,
      handler: function (i, e, p) {
        switch (true) {
          case 26 === i + 1:
            break;
          case 27 === i + 1:
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
    }).scrollTop(1000);

    window.scrollBy(0, 1000);

  });

  test("-500", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      ahead: -500,
      handler: function (i, e, p) {
        switch (true) {
          case 16 === i + 1:
            break;
          case 17 === i + 1:
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
    }).scrollTop(1000);

    window.scrollBy(0, 1000);

  });

  test("0", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      ahead: 0,
      handler: function (i, e, p) {
        switch (true) {
          case 16 === i + 1:
            break;
          case 17 === i + 1:
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
    }).scrollTop(500);

    window.scrollBy(0, 1000);

  });

  test("99999", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      ahead: 99999,
      handler: function (i, e, p) {
        switch (true) {
          case 100 === i + 1:
            break;
          case 101 === i + 1:
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
    }).scrollTop(500);

    window.scrollBy(0, 1000);

  });

  test(".1", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      ahead: .1,
      handler: function (i, e, p) {
        switch (true) {
          case 21 + Math.floor($(window).height() / 100) === i + 1:
            break;
          case 22 + Math.floor($(window).height() / 100) === i + 1:
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
    }).scrollTop(1000);

    window.scrollBy(0, 1000);

  });

  test("-.1", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      ahead: -.1,
      handler: function (i, e, p) {
        switch (true) {
          case 21 - Math.ceil($(window).height() / 100) === i + 1:
            break;
          case 22 - Math.ceil($(window).height() / 100) === i + 1:
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
    }).scrollTop(1000);

    window.scrollBy(0, 1000);

  });

});
