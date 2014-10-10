# VisibilityTrigger

**[Document](http://falsandtru.github.io/jquery.visibilitytrigger.js/)**
 | 
**[js](https://github.com/falsandtru/jquery.visibilitytrigger.js/releases)**
 | 
**[d.ts](src/ts/.d/jquery.visibilitytrigger.d.ts)**

[![Build Status](https://travis-ci.org/falsandtru/jquery.visibilitytrigger.js.svg?branch=master)](https://travis-ci.org/falsandtru/jquery.visibilitytrigger.js)
[![Coverage Status](https://coveralls.io/repos/falsandtru/jquery.visibilitytrigger.js/badge.png?branch=master)](https://coveralls.io/r/falsandtru/jquery.visibilitytrigger.js?branch=master)
[![Dependency Status](https://gemnasium.com/falsandtru/jquery.visibilitytrigger.js.svg)](https://gemnasium.com/falsandtru/jquery.visibilitytrigger.js)

Run callback to detect an element to have been displayed by the scroll.

## Feature

* Skip
* Ahead
* Repeat
* Standby

## Usage

```javascript
$.visibilitytrigger
.open({
  ns: '.img.primary',
  trigger: '#primary img.delay',
  handler: function () {
    this.src = this.getAttribute('data-origin');
  },
  rush: 3,
  ahead: .1,
  skip: true
})
.open({
  ns: '.img.secondary',
  trigger: '#secondary img.delay',
  handler: function () {
    this.src = this.getAttribute('data-origin');
  },
  rush: 3,
  ahead: .1,
  skip: true
})
.open({
  ns: '.sh.primary',
  trigger: '#primary pre.sh.delay',
  handler: function () {
    SyntaxHighlighter.highlight(SyntaxHighlighter.defaults, this);
  },
  rush: 3,
  ahead: .1,
  skip: true,
  step: 0
})
.disable().enable('img').vtrigger();

// any process

$.vt.enable().vtrigger('primary').vtrigger();
```

## API
Sorry, there are only Japanese documents. I welcome translation.

## Browser
Support major browsers.

* IE6+
* Chrome
* Firefox
* Safari
* Opera
* Android
* iOS

## jQuery

* v1.4.2
* v1.7.2
* v1.11.1
* v2.1.1

## License
MIT License
