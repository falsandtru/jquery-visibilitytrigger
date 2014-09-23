/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.ts"/>
/// <reference path="../view/main.ts"/>
/// <reference path="../controller/main.ts"/>

/* MODEL */

module MODULE.MODEL {
  
  export class Main extends Template implements ModelInterface {

    constructor() {
      super(State.initiate);
      this.state_ = State.open;
    }

    controller_: ControllerInterface = new Controller(this)
    views: { [index: string]: ViewInterface; } = {}
    app_: AppLayerInterface = new MODEL.App(this, this.controller_)
    state_: State = State.blank
    state(): State { return this.state_; }

    alias_: string = 'vt'
    alias(name?: string): string {
      if (!arguments.length) { return this.alias_; }

      //name = 'string' === typeof name ? name : name || this.alias();
      name = name || NAME;
      this.alias_ = name;

      if (name !== NAME && !jQuery[name] && !jQuery.fn[name]) {
        jQuery[name] = jQuery[NAME];
        jQuery.fn[name] = jQuery.fn[NAME];

      }
      return this.alias();
    }

    main_($context: ExtensionInterface, setting: VTSetting): ExtensionInterface
    main_($context: ExtensionInterface, alias: string): ExtensionInterface
    main_($context: ExtensionStaticInterface, setting: VTSetting): ExtensionStaticInterface
    main_($context: ExtensionStaticInterface, alias: string): ExtensionStaticInterface
    main_($context: any, option: any): any {

      switch (typeof option) {
        case 'undefined':
          option = this.alias();
        case 'string':
          this.alias(option);
          $context[this.alias()] = $context[NAME];
          return $context;

        case 'object':
          $context = $context instanceof NAMESPACE ? $context : jQuery(document)[NAME]();
          if (!option.trigger || !option.handler) { return $context; }
          if (0 === option.step && option.repeat) { return $context; }
          break;

        default:
          return $context;
      }

      this.app_.initialize(option, <JQuery>$context);

      return arguments[0];
    }

    lookup($context: ExtensionInterface, key: string, bubbling: boolean, callback: (view: ViewInterface) => void): void {
      if ('string' !== typeof key) {
        bubbling = !!key;
        key = '';
      }
      key = key && key.split('.').sort().join('.') || '';
      var filter = (view: ViewInterface) => {
        var context = <any>view.context;
        switch (false) {
          case !key || key === view.setting.ns:
          case this.isDOM(context):
          case window === context || document === context || jQuery.contains(document.documentElement, context):
            break;
          default:
            view.correct() && callback(view);
        }
      }
      if ($context instanceof NAMESPACE) {
        $context.trigger(NAME, [null, bubbling, filter]);
      } else {
        jQuery.each(this.views, (i, view) => filter(view));
      }
    }
    
    process(view: ViewInterface, customEvent: JQueryEventObject, nativeEvent: JQueryEventObject, container: EventTarget, activator: EventTarget): void {
      switch (this.state()) {
        case State.open:
          break;
        case State.pause:
          jQuery(activator).trigger(view.setting.nss.event, [nativeEvent, false]);
        default:
          return;
      }

      this.state_ = State.lock;
      this.app_.process(view, customEvent, nativeEvent, container, activator, <CacheInterface>{ update: true });
      this.state_ = State.open;
    }

    isDOM(object: Object): boolean {
      switch (true) {
        case 'object' !== typeof object:
        case null === object:
          return false;
        case window === object:
        case document === object:
        case 'ownerDocument' in object:
          return true;
        default:
          return false;
      }
    }

  }
  
}

module MODULE {
  export var Model = MODEL.Main
}
