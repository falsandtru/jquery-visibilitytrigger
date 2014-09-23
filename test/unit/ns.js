
suite("ns", function () {

  test("data", function () {
    var $fixture = $init(5).vt();

    $fixture
    .find('ol:gt(0)')
    .vt({
      trigger: 'li',
      handler: new Function()
    });

    $fixture
    .find('ol:gt(1)')
    .vt({
      ns: 'a',
      trigger: 'li',
      handler: new Function()
    });

    $fixture
    .find('ol:gt(2)')
    .vt({
      ns: 'b',
      trigger: 'li',
      handler: new Function()
    });

    assert.equal(!!$.data(document, 'visibilitytrigger'), true, "");
    assert.equal(!!$fixture.find('ol:eq(0)').data('visibilitytrigger'), false, "");
    assert.equal(!!$fixture.find('ol:eq(1)').data('visibilitytrigger'), true, "");
    assert.equal(!!$fixture.find('ol:eq(2)').data('visibilitytrigger'), true, "");
    assert.equal(!!$fixture.find('ol:eq(3)').data('visibilitytrigger'), true, "");

    assert.equal(!!$.data(document, 'visibilitytrigger-a'), true, "");
    assert.equal(!!$fixture.find('ol:eq(0)').data('visibilitytrigger-a'), false, "");
    assert.equal(!!$fixture.find('ol:eq(1)').data('visibilitytrigger-a'), false, "");
    assert.equal(!!$fixture.find('ol:eq(2)').data('visibilitytrigger-a'), true, "");
    assert.equal(!!$fixture.find('ol:eq(3)').data('visibilitytrigger-a'), true, "");

    assert.equal(!!$.data(document, 'visibilitytrigger-b'), true, "");
    assert.equal(!!$fixture.find('ol:eq(0)').data('visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(1)').data('visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(2)').data('visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(3)').data('visibilitytrigger-b'), true, "");

    $fixture.find('ol:eq(0)').vt().close(false);

    assert.equal(!!$.data(document, 'visibilitytrigger'), true, "");
    assert.equal(!!$fixture.find('ol:eq(0)').data('visibilitytrigger'), false, "");
    assert.equal(!!$fixture.find('ol:eq(1)').data('visibilitytrigger'), true, "");
    assert.equal(!!$fixture.find('ol:eq(2)').data('visibilitytrigger'), true, "");
    assert.equal(!!$fixture.find('ol:eq(3)').data('visibilitytrigger'), true, "");

    assert.equal(!!$.data(document, 'visibilitytrigger-a'), true, "");
    assert.equal(!!$fixture.find('ol:eq(0)').data('visibilitytrigger-a'), false, "");
    assert.equal(!!$fixture.find('ol:eq(1)').data('visibilitytrigger-a'), false, "");
    assert.equal(!!$fixture.find('ol:eq(2)').data('visibilitytrigger-a'), true, "");
    assert.equal(!!$fixture.find('ol:eq(3)').data('visibilitytrigger-a'), true, "");

    assert.equal(!!$.data(document, 'visibilitytrigger-b'), true, "");
    assert.equal(!!$fixture.find('ol:eq(0)').data('visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(1)').data('visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(2)').data('visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(3)').data('visibilitytrigger-b'), true, "");

    $fixture.find('ol:eq(1)').vt().close('a', false);

    assert.equal(!!$.data(document, 'visibilitytrigger'), true, "");
    assert.equal(!!$fixture.find('ol:eq(0)').data('visibilitytrigger'), false, "");
    assert.equal(!!$fixture.find('ol:eq(1)').data('visibilitytrigger'), true, "");
    assert.equal(!!$fixture.find('ol:eq(2)').data('visibilitytrigger'), true, "");
    assert.equal(!!$fixture.find('ol:eq(3)').data('visibilitytrigger'), true, "");

    assert.equal(!!$.data(document, 'visibilitytrigger-a'), true, "");
    assert.equal(!!$fixture.find('ol:eq(0)').data('visibilitytrigger-a'), false, "");
    assert.equal(!!$fixture.find('ol:eq(1)').data('visibilitytrigger-a'), false, "");
    assert.equal(!!$fixture.find('ol:eq(2)').data('visibilitytrigger-a'), true, "");
    assert.equal(!!$fixture.find('ol:eq(3)').data('visibilitytrigger-a'), true, "");

    assert.equal(!!$.data(document, 'visibilitytrigger-b'), true, "");
    assert.equal(!!$fixture.find('ol:eq(0)').data('visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(1)').data('visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(2)').data('visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(3)').data('visibilitytrigger-b'), true, "");

    $fixture.find('ol:eq(2)').vt().close('b', true);

    assert.equal(!!$.data(document, 'visibilitytrigger'), true, "");
    assert.equal(!!$fixture.find('ol:eq(0)').data('visibilitytrigger'), false, "");
    assert.equal(!!$fixture.find('ol:eq(1)').data('visibilitytrigger'), true, "");
    assert.equal(!!$fixture.find('ol:eq(2)').data('visibilitytrigger'), true, "");
    assert.equal(!!$fixture.find('ol:eq(3)').data('visibilitytrigger'), true, "");

    assert.equal(!!$.data(document, 'visibilitytrigger-a'), true, "");
    assert.equal(!!$fixture.find('ol:eq(0)').data('visibilitytrigger-a'), false, "");
    assert.equal(!!$fixture.find('ol:eq(1)').data('visibilitytrigger-a'), false, "");
    assert.equal(!!$fixture.find('ol:eq(2)').data('visibilitytrigger-a'), true, "");
    assert.equal(!!$fixture.find('ol:eq(3)').data('visibilitytrigger-a'), true, "");

    assert.equal(!!$.data(document, 'visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(0)').data('visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(1)').data('visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(2)').data('visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(3)').data('visibilitytrigger-b'), false, "");

    $fixture.find('ol:eq(3)').vt().close(false);

    assert.equal(!!$.data(document, 'visibilitytrigger'), true, "");
    assert.equal(!!$fixture.find('ol:eq(0)').data('visibilitytrigger'), false, "");
    assert.equal(!!$fixture.find('ol:eq(1)').data('visibilitytrigger'), true, "");
    assert.equal(!!$fixture.find('ol:eq(2)').data('visibilitytrigger'), true, "");
    assert.equal(!!$fixture.find('ol:eq(3)').data('visibilitytrigger'), false, "");

    assert.equal(!!$.data(document, 'visibilitytrigger-a'), true, "");
    assert.equal(!!$fixture.find('ol:eq(0)').data('visibilitytrigger-a'), false, "");
    assert.equal(!!$fixture.find('ol:eq(1)').data('visibilitytrigger-a'), false, "");
    assert.equal(!!$fixture.find('ol:eq(2)').data('visibilitytrigger-a'), true, "");
    assert.equal(!!$fixture.find('ol:eq(3)').data('visibilitytrigger-a'), false, "");

    assert.equal(!!$.data(document, 'visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(0)').data('visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(1)').data('visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(2)').data('visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(3)').data('visibilitytrigger-b'), false, "");

    $fixture.find('ol:eq(3)').vt().close(true);

    assert.equal(!!$.data(document, 'visibilitytrigger'), false, "");
    assert.equal(!!$fixture.find('ol:eq(0)').data('visibilitytrigger'), false, "");
    assert.equal(!!$fixture.find('ol:eq(1)').data('visibilitytrigger'), false, "");
    assert.equal(!!$fixture.find('ol:eq(2)').data('visibilitytrigger'), false, "");
    assert.equal(!!$fixture.find('ol:eq(3)').data('visibilitytrigger'), false, "");

    assert.equal(!!$.data(document, 'visibilitytrigger-a'), false, "");
    assert.equal(!!$fixture.find('ol:eq(0)').data('visibilitytrigger-a'), false, "");
    assert.equal(!!$fixture.find('ol:eq(1)').data('visibilitytrigger-a'), false, "");
    assert.equal(!!$fixture.find('ol:eq(2)').data('visibilitytrigger-a'), false, "");
    assert.equal(!!$fixture.find('ol:eq(3)').data('visibilitytrigger-a'), false, "");

    assert.equal(!!$.data(document, 'visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(0)').data('visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(1)').data('visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(2)').data('visibilitytrigger-b'), false, "");
    assert.equal(!!$fixture.find('ol:eq(3)').data('visibilitytrigger-b'), false, "");

  });
  
  test("native", function () {
    var $fixture = $init(4).vt();

    $fixture.find('ol').css({width: "50px", float: 'left'});

    var a, b;

    $fixture
    .find('ol')
    .vt({
      trigger: 'li',
      handler: new Function()
    });

    $fixture
    .find('ol:gt(0)')
    .vt({
      ns: 'a',
      trigger: 'li',
      handler: function (i) {
        i === 0 && ++a;
      }
    });

    $fixture
    .find('ol:gt(1)')
    .vt({
      ns: 'b',
      trigger: 'li',
      handler: function (i) {
        i === 0 && a && ++b && done();
      }
    });

  });

});
