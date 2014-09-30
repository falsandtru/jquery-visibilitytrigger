/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="../view/main.ts"/>

/* MODEL */

module MODULE.MODEL.APP {
  
  export class Main implements AppLayerInterface {

    constructor(public model_: ModelInterface, public controller_: ControllerInterface) {
    }

    initialize(option: VTSetting, $context: JQuery): void {
      var setting = this.configure(<SettingInterface>option, $context);

      $context = $context.end()[NAME](setting.global ? document : null);
      $context = $context.map((i, element): HTMLElement => {
        switch (true) {
          case document === element:
            return element;
          case window === element:
            return ~jQuery.inArray(document, $context.get()) ? null : <any>document;
          case this.model_.isDOM(element) && jQuery.contains(document.documentElement, element):
            return element;
          default:
            return null;
        }
      });

      if (setting.global || ~jQuery.inArray(document, $context.get()) || ~jQuery.inArray(window, $context.get())) {
        new View(<ModelInterface>this.model_, this.controller_).open($context, setting);
      } else {
        $context.each((i) => new View(<ModelInterface>this.model_, this.controller_).open($context.eq(i), setting));
      }
    }

    configure(option: VTSetting, $context: JQuery): SettingInterface {
      var that = this;

      option = jQuery.extend(true, {}, (<SettingInterface>option).option || option);

      var initial = <VTSetting>{
            ns: '',
            global: true,
            trigger: null,
            handler: null,
            param: undefined,
            chain: true,
            rush: 0,
            ahead: 0,
            skip: false,
            repeat: false,
            delay: 300,
            step: 1,
            cache: true
          },
          force = <SettingInterface>{
            gns: NAME,
            option: option,
            clone: function (): SettingInterface { return jQuery.extend(true, {}, this, { uid: GEN_UUID() }); }
          },
          compute = () => {
            setting.ns = setting.ns && '.' === setting.ns.charAt(0) ? setting.ns.slice(1) : setting.ns;
            setting.ns = setting.ns && setting.ns.split('.').sort().join('.') || '';
            var nsArray: string[] = [NAME].concat(setting.ns && setting.ns.split('.') || []);
            setting.ahead = setting.ahead instanceof Array ? setting.ahead.concat(setting.ahead).slice(0, 2) : [setting.ahead, setting.ahead]
            setting.ahead[0] = Math.abs(setting.ahead[0]) < 1 ? '*' + (setting.ahead[0] * 10) : '' + setting.ahead[0];
            setting.ahead[1] = Math.abs(setting.ahead[1]) < 1 ? '*' + (setting.ahead[1] * 10) : '' + setting.ahead[1];
            setting.step = +!!setting.step;
            return <SettingInterface>{
              uid: GEN_UUID(),
              nss: {
                name: setting.ns || '',
                array: nsArray,
                event: nsArray.join('.'),
                data: nsArray.join('-'),
                alias: [setting.gns].concat(nsArray.slice(1)).join('.'),
                scroll: ['scroll'].concat(nsArray.join(':')).join('.'),
                resize: ['resize'].concat(nsArray.join(':')).join('.'),
                data_count: '_' + nsArray.concat('count').join('-')
              }
            };
          };

      var setting: SettingInterface;
      setting = jQuery.extend(true, initial, option);
      setting = jQuery.extend(true, setting, force);
      setting = jQuery.extend(true, setting, compute());
      return setting;
    }

    process(view: ViewInterface, customEvent: JQueryEventObject, nativeEvent: JQueryEventObject, container: EventTarget, activator: EventTarget, cache: CacheInterface): void {

      var setting = view.setting,
          status = view.status,
          $targets = cache.$targets = !cache.update && setting.step ? cache.$targets : jQuery(container).find(setting.trigger),
          $target = $targets.eq(status.index),
          root: boolean =  cache.root = !cache.update ? cache.root : window === <any>view.context || document === <any>view.context,
          layer: number =  cache.layer = !cache.update ? cache.layer : document === activator || window === activator ? 0 : 1,
          evtCurrScroll = cache.evtCurrScroll = !cache.update ? cache.evtCurrScroll : jQuery(activator).scrollTop(),
          evtLastScroll = cache.evtLastScroll = !cache.update ? cache.evtLastScroll : status.scroll[layer],
          direction = cache.direction = !cache.update ? cache.direction : evtCurrScroll === evtLastScroll ? status.direction : evtCurrScroll < evtLastScroll ? -1 : 1,
          distance = cache.distance = !cache.update ? cache.distance : Math.abs(evtCurrScroll - evtLastScroll);

      if (setting.standby && status.first && !$target.length) { return; }

      if (status.direction !== direction) {
        status.turn = true;
        status.end = false;
        status.direction = direction;
        status.index = status.index < 0 ? 0 : $targets.length <= status.index ? $targets.length - 1 : status.index;
        $target = $targets.eq(status.index);
      }
      status.distance = distance === 0 ? status.distance : distance;
      status.scroll[layer] = evtCurrScroll;

      switch (true) {
        case status.index < 0 || $targets.length <= status.index:
        case !$targets.length || !$target.length:
        case !jQuery.contains(document.documentElement, $target[0]):
          break;

        default:

          var $win: JQuery, winTop: number, winHeight: number, winBottom: number,
              $frame: JQuery, frameTop: number, frameHeight: number, frameBottom: number,
              tgtTop: number, tgtHeight: number, tgtBottom: number,
              visibleTop: number, visibleBottom: number;

          $win = cache.$win = !cache.update ? cache.$win : jQuery(window);
          winTop = cache.winTop = !cache.update ? cache.winTop : $win.scrollTop();
          winHeight = cache.winHeight = !cache.update ? cache.winHeight : $win.height();
          winBottom = winTop + winHeight;

          var aheadTop: number, aheadBottom: number, ahead: string, rush: number,
              topin: boolean, topout: boolean, topover: boolean,
              bottomin: boolean, bottomout: boolean, bottomover: boolean;

          ahead = setting.ahead[0] + '';
          aheadTop = cache.aheadTop       = !cache.update ? cache.aheadTop    : '*' === ahead.charAt(0) ? parseInt(winHeight * Number(ahead.slice(1)) + '', 10) : parseInt(ahead + '', 10);
          ahead = setting.ahead[1] + '';
          aheadBottom = cache.aheadBottom = !cache.update ? cache.aheadBottom : '*' === ahead.charAt(0) ? parseInt(winHeight * Number(ahead.slice(1)) + '', 10) : parseInt(ahead + '', 10);
          rush = cache.rush = !cache.update ? cache.rush : 0 > setting.rush ? $targets.length + setting.rush + 1 : setting.rush;


          $frame = jQuery(container);
          if (root) {
            frameTop = cache.frameTop = !cache.update ? cache.frameTop : winTop;
            frameHeight = cache.frameHeight = !cache.update ? cache.frameHeight : winHeight;
            frameBottom = frameTop + frameHeight;
          } else {
            frameTop = cache.frameTop = !cache.update ? cache.frameTop : parseInt($frame.offset().top + '', 10);
            frameHeight = cache.frameHeight = !cache.update ? cache.frameHeight : $frame.outerHeight();
            frameBottom = frameTop + frameHeight;
          }

          visibleTop = cache.visibleTop = !cache.update ? cache.visibleTop : Math.max(frameTop, winTop);
          visibleBottom = cache.visibleBottom = !cache.update ? cache.visibleBottom : Math.min(frameBottom, winBottom);

          tgtTop = parseInt($target.offset().top + '', 10);
          tgtHeight = $target.outerHeight();
          tgtBottom = tgtTop + tgtHeight;

          topin = visibleBottom >= tgtTop - aheadBottom;
          bottomin = visibleTop <= tgtBottom + aheadTop;

          var fire = false,
              step = 1,
              iterate = false,
              force = false;
          
          switch (true) {
            case status.first && rush > status.index && (setting.repeat || !jQuery.data($target[0], setting.nss.data_count)):
              // rush
              force = rush > status.index;
              break;
            case !setting.skip && !setting.repeat:
              // !skip
              fire = status.direction === 1 ? topin : bottomin && ((!layer ? winTop <= tgtBottom - status.distance + aheadTop : visibleTop <= tgtBottom - status.distance + aheadTop) ? false : fire);
              break;
            case setting.skip && !setting.repeat:
              // skip
              fire = topin && bottomin;
              break;
            case !setting.skip && setting.repeat:
              // !skip
              fire = status.direction === 1 ? topin : bottomin;
              // repeat
              if (fire && !status.first && (!nativeEvent || nativeEvent.type === 'scroll')) {
                fire = status.direction === 1 ? ((!layer ? winBottom >= tgtTop + status.distance - aheadBottom : visibleBottom >= tgtTop + status.distance - aheadBottom) ? false : fire)
                                              : ((!layer ? winTop <= tgtBottom - status.distance + aheadTop : visibleTop <= tgtBottom - status.distance + aheadTop) ? false : fire);
              }
              break;
            case setting.skip && setting.repeat:
              // skip
              fire = topin && bottomin;
              // repeat
              if (fire && !status.first && (!nativeEvent || nativeEvent.type === 'scroll')) {
                fire = status.direction === 1 ? ((!layer ? winBottom >= tgtTop + status.distance - aheadBottom : visibleBottom >= tgtTop + status.distance - aheadBottom) ? false : fire)
                                              : ((!layer ? winTop <= tgtBottom - status.distance + aheadTop : visibleTop <= tgtBottom - status.distance + aheadTop) ? false : fire);
              }
              break;
          }

          if (force) {
            fire = iterate = true;
            step = setting.step;
          } else {
            iterate = status.direction === 1 ? topin : bottomin;
            step = setting.step ? setting.step * status.direction
                                : !fire ? status.direction : status.direction === 1 ? 0 : -1;
            fire = fire && !setting.repeat && jQuery.data($target[0], setting.nss.data_count) ? false : fire;
          }
          break;
      }

      if (fire) {
        status.count++;
        jQuery.data($target[0], setting.nss.data_count, (jQuery.data($target[0], setting.nss.data_count) || 0) + 1);

        status.param = setting.handler.apply($target[0], [
          status.index,
          $target[0],
          setting.chain ? status.param : setting.param,
          {
            event: nativeEvent,
            container: container,
            activator: activator,
            count: jQuery.data($target[0], setting.nss.data_count),
            direction: status.direction
          }
        ]);
      }

      $targets = iterate ? $targets : jQuery(container).find(setting.trigger);
      $target = null;

      if (!$targets.length || !setting.repeat && setting.step && status.count >= $targets.length) {
        view.close();
      } else {
        cache.update = !setting.cache;
        cache.recursion = true;

        status.index += iterate ? step : 0;

        iterate && this.process(view, customEvent, nativeEvent, container, activator, cache);
      }

      status.first = status.first ? !fire : false;
      status.turn = false;
      cache.recursion = false;
    }

  }

}

module MODULE.MODEL {
  export var App = MODEL.APP.Main
}
