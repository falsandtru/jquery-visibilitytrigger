
suite("Core", function () {

  test("init", function () {
    assert.equal(!!$.visibilitytrigger, true, "$.visibilitytrigger");
    assert.equal(!!$().visibilitytrigger, true, "$().visibilitytrigger");

    assert.equal($init(1).find('ol').length, 1, "fixture 1 ol length");
    assert.equal($init(1).find('li').length, 100, "fixture 1 li length");
    assert.equal($init(2).find('ol').length, 2, "fixture 2 ol length");
    assert.equal($init(2).find('li').length, 200, "fixture 2 li length");

  });

  test("alias", function () {

    $.visibilitytrigger();

    assert.equal($.vt, $.visibilitytrigger, "$.vt");
    assert.equal($().vt, $.visibilitytrigger, "$().vt");

    $.vt('alias');

    assert.equal($.alias, $.visibilitytrigger, "$.alias");
    assert.equal($().alias, $.visibilitytrigger, "$().alias");

  });

  test("context", function () {
    assert.equal($.vt(), $.vt, "$.vt() context");

    assert.equal($().vt().length, 0, "$().vt() length");

    assert.equal($(document).vt().length, 1, "$(document).vt() length");
    assert.equal($(document).vt()[0], document, "$(document).vt() context");

    assert.equal($().vt(document).length, 1, "$().vt(document) length");
    assert.equal($().vt(document)[0], document, "$().vt(document) context");

  });

  test("function", function () {
    assert.equal(typeof $.vt.vtrigger, 'function', "$.vt");
    assert.equal(typeof $().vt.vtrigger, 'function', "$().vt");

  });

  test("method", function () {
    assert.equal(typeof $.vt().vtrigger, 'function', "$.vt()");
    assert.equal(typeof $().vt().vtrigger, 'function', "$().vt()");

  });

  test("chain", function () {
    assert.equal(typeof $.vt().vt().vtrigger, 'function', "$.vt().vt()");
    assert.equal(typeof $().vt().vt().vtrigger, 'function', "$().vt().vt().vtrigger");

  });

  test("revert", function () {
    assert.equal($(document).vt().end().vtrigger, undefined, "$(document).vt().end() method");
    assert.equal($(document).vt().end()[0], document, "$(document).vt().end() context");

  });

  test("relation bottomup", function () {
    var $fixture = $init(2).vt();

    $fixture
    .find('ol')
    .vt({
      trigger: 'li',
      handler: new Function()
    });

    assert.equal(!!$.data(document, 'visibilitytrigger'), true, "$.data(document, 'visibilitytrigger')");
    assert.equal(!!$fixture.find('ol:first').data('visibilitytrigger'), true, "$fixture.find('ol:first'), 'visibilitytrigger')");
    assert.equal(!!$fixture.find('ol:last').data('visibilitytrigger'), true, "$fixture.find('ol:last'), 'visibilitytrigger')");

    $fixture.find('ol:first').vt().close(false);

    assert.equal(!!$.data(document, 'visibilitytrigger'), true, "$.data(document, 'visibilitytrigger')");
    assert.equal(!!$fixture.find('ol:first').data('visibilitytrigger'), false, "$fixture.find('ol:first'), 'visibilitytrigger')");
    assert.equal(!!$fixture.find('ol:last').data('visibilitytrigger'), true, "$fixture.find('ol:last'), 'visibilitytrigger')");

    $fixture.find('ol:last').vt().close(false);

    assert.equal(!!$.data(document, 'visibilitytrigger'), false, "$.data(document, 'visibilitytrigger')");
    assert.equal(!!$fixture.find('ol:first').data('visibilitytrigger'), false, "$fixture.find('ol:first'), 'visibilitytrigger')");
    assert.equal(!!$fixture.find('ol:last').data('visibilitytrigger'), false, "$fixture.find('ol:last'), 'visibilitytrigger')");

  });

  test("relation topdown", function () {
    var $fixture = $init(2).vt();

    $fixture
    .find('ol')
    .vt({
      trigger: 'li',
      handler: new Function()
    });

    assert.equal(!!$.data(document, 'visibilitytrigger'), true, "$.data(document, 'visibilitytrigger')");
    assert.equal(!!$fixture.find('ol:first').data('visibilitytrigger'), true, "$fixture.find('ol:first'), 'visibilitytrigger')");
    assert.equal(!!$fixture.find('ol:last').data('visibilitytrigger'), true, "$fixture.find('ol:last'), 'visibilitytrigger')");

    $(document).vt().close(false);

    assert.equal(!!$.data(document, 'visibilitytrigger'), false, "$.data(document, 'visibilitytrigger')");
    assert.equal(!!$fixture.find('ol:first').data('visibilitytrigger'), false, "$fixture.find('ol:first'), 'visibilitytrigger')");
    assert.equal(!!$fixture.find('ol:last').data('visibilitytrigger'), false, "$fixture.find('ol:last'), 'visibilitytrigger')");

  });

  test("relation seek", function () {
    var $fixture = $init(2).vt();

    $fixture
    .find('ol')
    .vt({
      trigger: 'li',
      handler: new Function()
    });

    assert.equal(!!$.data(document, 'visibilitytrigger'), true, "$.data(document, 'visibilitytrigger')");
    assert.equal(!!$fixture.find('ol:first').data('visibilitytrigger'), true, "$fixture.find('ol:first'), 'visibilitytrigger')");
    assert.equal(!!$fixture.find('ol:last').data('visibilitytrigger'), true, "$fixture.find('ol:last'), 'visibilitytrigger')");

    $.vt.close('');

    assert.equal(!!$.data(document, 'visibilitytrigger'), false, "$.data(document, 'visibilitytrigger')");
    assert.equal(!!$fixture.find('ol:first').data('visibilitytrigger'), false, "$fixture.find('ol:first'), 'visibilitytrigger')");
    assert.equal(!!$fixture.find('ol:last').data('visibilitytrigger'), false, "$fixture.find('ol:last'), 'visibilitytrigger')");

  });

});
