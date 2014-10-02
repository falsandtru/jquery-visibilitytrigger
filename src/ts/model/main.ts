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
      SEAL(this);
    }

    private controller_: ControllerInterface = new Controller(this)
    private views_: { [index: string]: ViewInterface; } = {}
    private app_: AppLayerInterface = new MODEL.App(this, this.controller_)
    state_: State = State.blank
    state(): State { return this.state_; }

    private alias_: string = 'vt'
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
          option = FREEZE(option, true);
          break;

        default:
          return $context;
      }

      this.app_.initialize(option, <JQuery>$context);

      return arguments[0];
    }

    lookup($context: ExtensionInterface, key: string, bubbling: boolean, callback: (view: ViewInterface) => void): void {
      if (typeof key !== 'string' && bubbling === undefined) {
        bubbling = !!key;
        key = '';
      } else {
        key = key || '';
      }
      key = jQuery.map(key.split(/\s+/), (ns) => ns.split('.').sort().join('.')).sort().join(' ');
      var regs = jQuery.map(key.split(/\s+/), (key) => new RegExp('(?:^|[.\s])' + key + '(?:$|[.\s])'));
      var filter = (view: ViewInterface) => {
        switch (false) {
          case !key || !!jQuery.grep(regs, (reg) => reg.test(view.setting.ns)).length:
          case view.correct():
            break;
          default:
            callback(view);
        }
      }
      if ($context instanceof NAMESPACE) {
        $context.trigger(NAME, [null, bubbling, filter]);
      } else {
        jQuery.each(this.views_, (i, view) => filter(view));
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
      if (!object || 'object' !== typeof object) { return false; }
      return object === object['window'] || 'ownerDocument' in object;
    }

    addView(view: ViewInterface): void {
      this.removeView(view.setting.uid);
      this.views_[view.setting.uid] = view;
    }

    getView(uid: string): ViewInterface {
      return this.views_[uid];
    }

    removeView(uid: string): void {
      var view = this.getView(uid);
      view && State.terminate > view.state() && view.close();
      delete this.views_[uid];
    }

  }
  
}

module MODULE {
  export var Model = MODEL.Main
}
