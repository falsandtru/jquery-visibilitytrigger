(function() {
  var env = 'object' === typeof __karma__ ? __karma__.config.args[0] : {};
  for (var i in env) { }
  env = i ? env : {
    jquery: '1.4.2'
  };

  window.env = env;
})();