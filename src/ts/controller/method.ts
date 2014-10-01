/// <reference path="../define.ts"/>
/// <reference path="function.ts"/>
/// <reference path="../view/main.ts"/>

/* CONTROLLER */

module MODULE.CONTROLLER {
  var M: ModelInterface
  var S: Methods

  export class Methods {

    constructor(model: ModelInterface) {
      M = model;
      S = this;
      SEAL(this);
    }

  }

}
