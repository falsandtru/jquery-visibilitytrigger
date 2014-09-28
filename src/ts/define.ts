/// <reference path=".d/jquery.d.ts"/>
/// <reference path=".d/jquery.visibilitytrigger.d.ts"/>

interface JQuery {
  bind(eventType: string, handler: (eventObject?: JQueryEventObject, ...extraParameters: any[]) => any): JQuery
}
module MODULE {

  export var NAME: string = 'visibilitytrigger'
  export var NAMESPACE: any = jQuery

  /*
   * 仕様
   * -----
   * 
   * 構成
   * 
   * Rayer:
   * - View
   * - Controller
   * - Model(mvc-interface)
   * - Model(application-rogic)
   * - Model(data-access)
   * 
   * Model:
   * - class Main (mvc-interface)
   *   single instance(M)
   * - class App (application-logic)
   *   single instance(APP)
   * - class Util
   *   static (UTIL)
   * 
   * View
   * - class Main (mvc-interface)
   *   multi instance
   * 
   * Controller
   * - class Main (mvc-interface)
   *   single instance(C)
   * - class Function
   *   single instance
   * - class Method
   *   single instance
   * 
   * -----
   * 
   * 規約
   * 
   * - MVCモジュール間のアクセスは各モジュールのインターフェイスを経由し、内部機能(APP/DATA)に直接アクセスしない。
   * - UTILはどこからでも自由に使用してよい。
   * - モデルインターフェイスへ渡されるデータはすべて正規化、検疫されてないものとして自身で正規化、検疫する。
   * 
   */
  export module MODEL { }
  export module VIEW { }
  export module CONTROLLER { }

  // Model
  export declare class ModelInterface {
    constructor()

    // Property
    views: { [index: string]: ViewInterface; }

    // Model
    state(): State
    alias(name?: string): string
    lookup($context: ExtensionInterface, key: string, bubbling: boolean, callback: (view: ViewInterface) => void): void
    process(view: ViewInterface, customEvent: JQueryEventObject, nativeEvent: JQueryEventObject, container: EventTarget, activator: EventTarget): void
    isDOM(object: Object): boolean

    // View

    // Controller
  }
  export declare class AppLayerInterface {
    initialize(option: VTSetting, $context: JQuery): void
    configure(option: VTSetting, $context: JQuery): SettingInterface
    process(view: ViewInterface, customEvent: JQueryEventObject, nativeEvent: JQueryEventObject, container: EventTarget, activator: EventTarget, cache: CacheInterface): void
  }
  export declare class TaskInterface {
    constructor(mode?: number, size?: number)
    define(name: string, mode: number, size: number): void
    reserve(task: () => void): void
    reserve(name: string, task: () => void): void
    digest(name: string, limit?: number): void
    digest(limit?: number): void
    clear(name?: string): void
  }
  // View
  export declare class ViewInterface {
    constructor(model: ModelInterface, controller: ControllerInterface)
    context: HTMLElement
    setting: SettingInterface
    substance: boolean
    state(): State
    status: StatusInterface
    
    open($context: JQuery, setting: SettingInterface): void
    close(): void
    process(customEvent: JQueryEventObject, nativeEvent: JQueryEventObject, container: EventTarget, activator: EventTarget, layer: number): void
    
    correct(): boolean
    enable(): void
    disable(): void
    dispatch(event: JQueryEventObject, params: any[]): void
    dispatch(eventType: string, params: any[]): void
  }
  export declare class ViewObserverInterface {
    observe(): void
    release(): void
    reserve(customEvent: JQueryEventObject, nativeEvent: JQueryEventObject, container: EventTarget, activator: EventTarget, layer: number, immediate: boolean): void
    digest(customEvent: JQueryEventObject, nativeEvent: JQueryEventObject, container: EventTarget, activator: EventTarget, layer: number): void
  }
  export declare class ViewTaskInterface extends TaskInterface {
    reserve(task: () => void): void
    reserve(name: string, task: () => void): void
    reserve(name: string, task: (customEvent: JQueryEventObject, nativeEvent: JQueryEventObject, container: EventTarget, activator: EventTarget, layer: number) => void,
                          observer: ViewObserverInterface,
                          customEvent: JQueryEventObject, nativeEvent: JQueryEventObject, container: EventTarget, activator: EventTarget, layer: number): void
  }
  // Controller
  export declare class ControllerInterface {
    constructor()
  }

  // Enum
  export enum State { blank = -2, initiate, open, pause, lock, seal, error, crash, terminate, close }

  // Context
  export interface ExtensionInterface extends JQueryVT { }
  export interface ExtensionStaticInterface extends JQueryVTStatic { }

  // Parameter
  export interface SettingInterface extends VTSetting {
    // internal
    uid: string
    gns: string
    nss: {
      array: string[]
      name: string
      event: string
      alias: string
      scroll: string
      resize: string
      data: string
      data_count: string
    }
    global?: boolean
    option: VTSetting
    clone(): SettingInterface
  }

  // Member

  // Object
  export interface StatusInterface {
    index: number
    count: number
    first: boolean
    scroll: number[]
    direction: number
    distance: number
    turn: boolean
    end: boolean
    param: any
  }
  export interface CacheInterface {
    update: boolean
    root: boolean
    layer: number
    $targets: JQuery
    $target: JQuery
    evtCurrScroll: number
    evtLastScroll: number
    lastHeight: number
    direction: number
    distance: number
    $win: JQuery
    winTop: number
    winHeight: number
    rush: number
    aheadTop: number
    aheadBottom: number
    frameTop: number
    frameHeight: number
    visibleTop: number
    visibleBottom: number
    recursion: boolean
  }

  export var GEN_UUID: () => string = function () {
    // version 4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16).toUpperCase();
    });
  }

  //export function setTimeout(callback: (...args: any[]) => any, delay: number, ...args: any[]): number {
  //  return !document.all ? window.setTimeout.apply(window, arguments)
  //                       : window.setTimeout(callback instanceof Function ? () => callback.apply(window, args) : callback, delay);
  //};

}