
suite("standby", function () {

  test("true", function (done) {
    var $fixture = $init(1, true),
        $targets = $fixture.find('li').remove();

    $fixture
    .find('ol')
    .vt({
      trigger: 'li',
      standby: true,
      handler: function (i, e, p, s) {
        !i && done();
      }
    });

    window.scrollBy(0, 1000);

    $fixture.find('ol').append($targets);

    window.scrollBy(0, 1000);

  });

  test("false", function (done) {
    var $fixture = $init(1, true),
        $targets = $fixture.find('li').remove();

    $fixture
    .find('ol')
    .vt({
      trigger: 'li',
      standby: false,
      param: 0,
      handler: function (i, e, p, s) {
        done(false);
      }
    });

    assert.equal(!!$.data(document, 'visibilitytrigger'), false, 'data');

    done();

  });

});
