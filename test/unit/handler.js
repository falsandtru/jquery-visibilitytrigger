
suite("handler", function () {

  test("context", function (done) {
    $init(1);
    $.vt({
      trigger: 'li',
      handler: function (i) {
        if (i) { return; }

        assert.equal($.contains(document, this), true, 'contains');
        assert.equal($(this).is('li'), true, 'tag');
        assert.equal($(this).prev().length, 0, 'pos');

        done();
      }
    });

    window.scrollBy(0, 100);

  });

  test("arguments", function (done) {
    $init(1, true)
    .find('ol')
    .vt({
      trigger: 'li',
      handler: function (index, element, param, status) {
        if (index) { return; }

        assert.equal(index, 0, 'index');
        assert.equal(element, this, 'element');
        assert.equal(param, undefined, 'param');
        assert.equal(status.event instanceof jQuery.Event, true, 'status.event');
        assert.equal(status.container, $('.fixture ol')[0], 'status.container');
        assert.equal(status.activator, document, 'status.activator');
        assert.equal(status.count, 1, 'status.count');
        assert.equal(status.direction, 1, 'status.direction');

        done();
      }
    });

    window.scrollBy(0, 100);

  });

});
