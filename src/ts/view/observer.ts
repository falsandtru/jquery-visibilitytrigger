/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>

/* VIEW */

module MODULE.VIEW {

  export class Observer {

    constructor(public model_: ModelInterface, public view_: ViewInterface, public controller_: ControllerInterface) {
    }

    task: ViewTaskInterface = new MODEL.Task(-1, 1)

    queue_ = []

    observe(): void {
      var view = this.view_,
          setting = view.setting,
          context = view.context,
          $context = <ExtensionInterface>jQuery(view.context)[NAME]();

      if (!setting.standby && !$context.find(setting.trigger).length) { return; }

      // init data
      $context.data(setting.nss.data, setting.uid);
      $context.find(setting.trigger).each(eachTrigger);
      function eachTrigger(i, element) {
        jQuery.removeData(element, setting.nss.data_count);
      }

      // custom event
      $context.bind(setting.nss.event, view, this.handlers_.custom);

      // alias
      //setting.nss.event !== setting.nss.alias &&
      //$context.bind(setting.nss.alias, view, this.handlers_.alias);

      if (document === <any>context) {
        jQuery(window)
        .bind(setting.nss.scroll, view, this.handlers_.native)
        .bind(setting.nss.resize, view, this.handlers_.native);
      } else {
        $context
        .bind(setting.nss.scroll, view, this.handlers_.native)
        .bind(setting.nss.resize, view, this.handlers_.native);
      }
    }

    release(): void {
      var view = this.view_,
          setting = view.setting,
          context = view.context,
          $context = <JQuery>jQuery(context)[NAME]();

      jQuery.removeData(context, setting.nss.data);
      $context.find(setting.trigger).removeData(setting.nss.data_count);

      $context
      .unbind(setting.nss.event)
      //.unbind(setting.nss.alias)
      .unbind(setting.nss.scroll)
      .unbind(setting.nss.resize);

      if (jQuery.contains(document.documentElement, context)) { return; }

      // redirect
      jQuery(window)
      .unbind(setting.nss.scroll)
      .unbind(setting.nss.resize);
    }

    handlers_ = {
      custom: (customEvent: JQueryEventObject, nativeEvent?: JQueryEventObject, bubbling?: boolean, callback?: (view: ViewInterface) => any) => {
        nativeEvent = nativeEvent instanceof jQuery.Event ? nativeEvent : undefined;
        var view = this.view_,
            setting = view.setting,
            event: JQueryEventObject = customEvent,
            container: EventTarget = window === customEvent.currentTarget ? document : customEvent.currentTarget,
            activator: EventTarget = !nativeEvent ? container : window === nativeEvent.currentTarget ? document : nativeEvent.currentTarget,
            layer: number = document === activator || window === activator ? 0 : 1,
            manual: boolean = !nativeEvent;

        !bubbling && event.stopPropagation();

        if (!bubbling && event.target !== event.currentTarget) { return; }

        if (view.redirect || callback) {
          view.dispatch(setting.nss.event, [nativeEvent, false].concat(callback || []));
          callback && callback(view);
        } else if (event.target === event.currentTarget) {
          this.reserve(customEvent, nativeEvent, container, activator, layer, manual);
        }
      },
      //alias: (event: JQueryEventObject) => {
      //  var view = this.view_;
      //  State.open === view.state() && jQuery(event.target).trigger(view.setting.nss.event, [].slice.call(arguments, 1));
      //},
      native: (event: JQueryEventObject) => {
        if (document !== event.target && event.target !== event.currentTarget || event.isDefaultPrevented()) { return; }
        var view = this.view_;
        State.open === view.state() && jQuery(window === event.currentTarget ? document : event.currentTarget).trigger(view.setting.nss.event, [event]);
      }
    }

    reserve(customEvent: JQueryEventObject, nativeEvent: JQueryEventObject, container: EventTarget, activator: EventTarget, layer: number, immediate: boolean): void {
      var view = this.view_,
          setting = view.setting,
          status = view.status;

      var id: number, queue: number[] = this.queue_;
      while (id = queue.shift()) { clearTimeout(id); }

      this.task.reserve(!layer ? 'root' : 'node', this.digest, this, customEvent, nativeEvent, container, activator, layer);

      if (State.open !== this.view_.state() || State.open !== this.model_.state() || !immediate && setting.delay) {
        queue.push(setTimeout(() => void this.task.digest('node') || void this.task.digest(), setting.delay));
      } else {
        this.task.digest('node');
        this.task.digest();
      }
    }

    digest(customEvent: JQueryEventObject, nativeEvent: JQueryEventObject, container: EventTarget, activator: EventTarget, layer: number): void {
      var id: number, queue: number[] = this.queue_;
      while (id = queue.shift()) { clearTimeout(id); }

      this.view_.process(customEvent, nativeEvent, container, activator, layer);
    }

  }

}
