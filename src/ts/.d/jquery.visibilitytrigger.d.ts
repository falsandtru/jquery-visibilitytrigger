/**
 * 
 * jquery.visibilitytrigger.d.ts
 * 
 * @author falsandtru https://github.com/falsandtru/jquery-visibilitytrigger
 */

/// <reference path="jquery.d.ts"/>

interface JQuery {
    visibilitytrigger: JQueryVTStatic
    vt: JQueryVTStatic
}

interface JQueryStatic {
    visibilitytrigger: JQueryVTStatic
    vt: JQueryVTStatic
}

interface VTSetting {
    ns?: string
    trigger: string
    handler: (index?: number,
              element?: HTMLElement,
              param?: any,
              status?: {
                event: JQueryEventObject
                container: any
                activator: any
                count: number
                direction: number
              }
             ) => any
    param?: any
    chain?: boolean
    rush?: number
    ahead?: any
    skip?: boolean
    repeat?: boolean
    delay?: number
    step?: number
    cache?: boolean
    standby?: boolean
}

interface JQueryVT extends VISIBILITYTRIGGER.Core<JQueryVT>, VISIBILITYTRIGGER.Method<JQueryVTStatic>, JQuery {
}

interface JQueryVTStatic extends VISIBILITYTRIGGER.Core<JQueryVTStatic>, VISIBILITYTRIGGER.Method<JQueryVTStatic> {
}

declare module VISIBILITYTRIGGER {
    
    interface Core<T> {
        (): T
        (alias: string): T
        (setting: VTSetting): JQueryVT
        (window: Window): JQueryVT
        (document: Document): JQueryVT
        (element: HTMLElement): JQueryVT
        (elements: HTMLElement[]): JQueryVT
        (jQuery: JQuery): JQueryVT
    }
    
    interface Method<T> {
        open(setting: VTSetting): T
        close(bubbling?: boolean): T
        close(ns: string, bubbling?: boolean): T
        enable(bubbling?: boolean): T
        enable(ns: string, bubbling?: boolean): T
        disable(bubbling?: boolean): T
        disable(ns: string, bubbling?: boolean): T
        vtrigger(bubbling?: boolean): T
        vtrigger(ns: string, bubbling?: boolean): T
    }
}
