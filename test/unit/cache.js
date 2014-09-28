
suite("cache", function () {

  test("false", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      cache: false,
      handler: function (i, e, p, s) {
        i === 10 && done();
      }
    }).scrollTop(1000);

  });

});
