
suite("open", function () {

  test("open", function (done) {
    $init(1);
    $.vt.open({
      trigger: 'li',
      delay: 0,
      handler: function (i) {
        if (i) { return; }

        done();
      }
    }).open().vtrigger();

  });

});
