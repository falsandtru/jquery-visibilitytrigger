(function() {
  var src = '//ajax.googleapis.com/ajax/libs/jquery/' + env.jquery + '/jquery.min.js';

  document.write('<script src="' + src + '" charset="utf-8"></script>');
  document.write('<script>console.log("MATRIX: jQuery " + $().jquery)</script>');
})();
