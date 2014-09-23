/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>

/* CONTROLLER */

module MODULE.CONTROLLER {

  export class Main extends Template implements ControllerInterface {

    constructor(public model_: ModelInterface) {
      super(model_, State.initiate);
      this.state_ = State.open;
    }
    
    exec_($context: ExtensionInterface, setting: VTSetting): any[]
    exec_($context: ExtensionInterface, alias: string): any[]
    exec_($context: ExtensionInterface, window: Window): any[]
    exec_($context: ExtensionInterface, document: Document): any[]
    exec_($context: ExtensionInterface, element: HTMLElement): any[]
    exec_($context: ExtensionStaticInterface, option: any): any[]
    exec_($context: any): any[]{
      var args = [].slice.call(arguments, 1, 2),
          option = args[0];

      $context[NAME] = NAMESPACE[NAME];
      if (NAMESPACE[this.model_.alias()]) {
        $context[this.model_.alias()] = NAMESPACE[this.model_.alias()];
      }

      switch (typeof option) {
        case 'undefined':
        case 'string':
        case 'object':
          break;
        default:
          return $context;
      }

      if (option instanceof jQuery || this.model_.isDOM(option)) {
        return $context instanceof NAMESPACE ? $context.end().add(option)[NAME]()
                                             : jQuery(option)[NAME]();
      }

      return [$context].concat(args);
    }

  }

}

module MODULE {
  export var Controller = CONTROLLER.Main
}
