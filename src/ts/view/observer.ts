/// <reference path="../define.ts"/>
/// <reference path="../library/task.ts"/>

/* VIEW */

module MODULE.VIEW {
  
  export declare class ObserverTaskInterface extends LIBRARY.TaskInterface {
    reserve(task: () => void): void
    reserve(name: string, task: () => void): void
    reserve(name: string, task: (customEvent: JQueryEventObject, nativeEvent: JQueryEventObject, container: EventTarget, activator: EventTarget, layer: number) => void,
                          observer: ObserverInterface,
                          customEvent: JQueryEventObject, nativeEvent: JQueryEventObject, container: EventTarget, activator: EventTarget, layer: number): void
  }
  export class Observer {

    constructor(public model_: ModelInterface, public view_: ViewInterface, public controller_: ControllerInterface) {
    }

    task_: ObserverTaskInterface = new LIBRARY.Task(-1, 1)

    queue_ = []

    clean_(): void {
      var context = this.view_.context,
          setting = this.view_.setting,
          key = setting.nss.data_count;

      jQuery.removeData(context, setting.nss.data);
      
      this.view_.substance &&
      jQuery(context).find(setting.trigger).each(eachTrigger);
      function eachTrigger(i, element) {
        jQuery.removeData(element, key);
      }
    }

    observe(): void {
      var view = this.view_,
          setting = view.setting,
          context = view.context,
          $context = <ExtensionInterface>jQuery(view.context);

      this.clean_();

      jQuery.data(context, setting.nss.data, setting.uid);
      
      $context.bind(setting.nss.event, view, this.handlers_.customHandler);

      if (document === <any>context) {
        jQuery(window)
        .bind(setting.nss.scroll, view, this.handlers_.nativeHandler)
        .bind(setting.nss.resize, view, this.handlers_.nativeHandler);
      } else {
        $context
        .bind(setting.nss.scroll, view, this.handlers_.nativeHandler)
        .bind(setting.nss.resize, view, this.handlers_.nativeHandler);
      }
    }

    release(): void {
      var view = this.view_,
          setting = view.setting,
          context = view.context,
          $context = <JQuery>jQuery(context);

      this.clean_();

      $context.unbind(setting.nss.event);

      if (document === <any>context) {
        jQuery(window)
        .unbind(setting.nss.scroll)
        .unbind(setting.nss.resize);
      } else {
        $context
        .unbind(setting.nss.scroll)
        .unbind(setting.nss.resize);
      }
    }

    handlers_ = {
      customHandler: (customEvent: JQueryEventObject, nativeEvent?: JQueryEventObject, bubbling?: boolean, callback?: (view: ViewInterface) => any) => {
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

        if (!view.substance || callback) {
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
      nativeHandler: (event: JQueryEventObject) => {
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

      this.task_.reserve(!layer ? 'root' : 'node', this.digest, this, customEvent, nativeEvent, container, activator, layer);

      if (State.open !== this.view_.state() || State.open !== this.model_.state() || !immediate && setting.delay) {
        queue.push(setTimeout(() => void this.task_.digest('node') || void this.task_.digest(), setting.delay));
      } else {
        this.task_.digest('node');
        this.task_.digest();
      }
    }

    digest(customEvent: JQueryEventObject, nativeEvent: JQueryEventObject, container: EventTarget, activator: EventTarget, layer: number): void {
      var id: number, queue: number[] = this.queue_;
      while (id = queue.shift()) { clearTimeout(id); }

      this.view_.process(customEvent, nativeEvent, container, activator, layer);
    }

  }

}
