/**
 * 
 * jquery-visibilitytrigger
 * 
 * @name jquery-visibilitytrigger
 * @version 1.0.3
 * ---
 * @author falsandtru https://github.com/falsandtru/jquery-visibilitytrigger
 * @copyright 2012, falsandtru
 * @license MIT
 * 
 */

new (function(window, document, undefined, $) {
"use strict";
/// <reference path=".d/jquery.d.ts"/>
/// <reference path=".d/jquery.visibilitytrigger.d.ts"/>
var MODULE;
(function (MODULE) {
    MODULE.NAME = 'visibilitytrigger';
    MODULE.NAMESPACE = jQuery;

    

    

    

    

    // State
    (function (State) {
        State[State["blank"] = -2] = "blank";
        State[State["initiate"] = -1] = "initiate";
        State[State["open"] = 0] = "open";
        State[State["pause"] = 1] = "pause";
        State[State["lock"] = 2] = "lock";
        State[State["seal"] = 3] = "seal";
        State[State["error"] = 4] = "error";
        State[State["crash"] = 5] = "crash";
        State[State["terminate"] = 6] = "terminate";
        State[State["close"] = 7] = "close";
    })(MODULE.State || (MODULE.State = {}));
    var State = MODULE.State;

    

    

    

    // Function
    function GEN_UUID() {
        // version 4
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, gen);
        function gen(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16).toUpperCase();
        }
    }
    MODULE.GEN_UUID = GEN_UUID;

    function FREEZE(object, deep) {
        if (!Object.freeze || object === object['window'] || 'ownerDocument' in object) {
            return object;
        }
        !Object.isFrozen(object) && Object.freeze(object);
        if (!deep) {
            return object;
        }
        for (var i in object) {
            var prop = object[i];
            if (~'object,function'.indexOf(typeof prop) && prop) {
                FREEZE(prop, deep);
            }
        }
        return object;
    }
    MODULE.FREEZE = FREEZE;

    function SEAL(object, deep) {
        if (!Object.seal || object === object['window'] || 'ownerDocument' in object) {
            return object;
        }
        !Object.isSealed(object) && Object.seal(object);
        if (!deep) {
            return object;
        }
        for (var i in object) {
            var prop = object[i];
            if (~'object,function'.indexOf(typeof prop) && prop) {
                SEAL(prop, deep);
            }
        }
        return object;
    }
    MODULE.SEAL = SEAL;
})(MODULE || (MODULE = {}));

var MODULE;
(function (MODULE) {
    (function (MODEL) {
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));

var MODULE;
(function (MODULE) {
    (function (VIEW) {
    })(MODULE.VIEW || (MODULE.VIEW = {}));
    var VIEW = MODULE.VIEW;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
var MODULE;
(function (MODULE) {
    /* MODEL */
    (function (MODEL) {
        var Template = (function () {
            function Template(state) {
                /**
                * 拡張モジュール名。ネームスペースにこの名前のプロパティでモジュールが追加される。
                *
                * @property NAME
                * @type String
                */
                this.NAME = MODULE.NAME;
                /**
                * ネームスペース。ここにモジュールが追加される。
                *
                * @property NAMESPACE
                * @type Window|JQuery
                */
                this.NAMESPACE = MODULE.NAMESPACE;
                /**
                * UUID
                *
                * @property UUID
                * @type String
                */
                this.UUID = MODULE.GEN_UUID();
                /**
                * Modelの遷移状態を持つ
                *
                * @property state_
                * @type {State}
                */
                this.state_ = -2 /* blank */;
                this.state_ = state;
            }
            Template.prototype.MAIN = function (context) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    args[_i] = arguments[_i + 1];
                }
                return this.main_.apply(this, [context].concat(args));
            };

            Template.prototype.main_ = function (context) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    args[_i] = arguments[_i + 1];
                }
                return context;
            };
            return Template;
        })();
        MODEL.Template = Template;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
var MODULE;
(function (MODULE) {
    /* VIEW */
    (function (VIEW) {
        var Template = (function () {
            function Template(state) {
                /**
                * UUID
                *
                * @property UUID
                * @type String
                */
                this.UUID = MODULE.GEN_UUID();
                /**
                * Viewの遷移状態を持つ
                *
                * @property state_
                * @type {State}
                */
                this.state_ = -2 /* blank */;
                this.state_ = state;
            }
            return Template;
        })();
        VIEW.Template = Template;
    })(MODULE.VIEW || (MODULE.VIEW = {}));
    var VIEW = MODULE.VIEW;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
var MODULE;
(function (MODULE) {
    /* MODEL */
    (function (LIBRARY) {
        var Task = (function () {
            function Task(mode, size) {
                if (typeof mode === "undefined") { mode = 1; }
                if (typeof size === "undefined") { size = 0; }
                this.list_ = [];
                this.config_ = {
                    mode: 1,
                    size: 0
                };
                this.table_ = {};
                this.option_ = {};
                this.config_.mode = mode || this.config_.mode;
                this.config_.size = size || this.config_.size;
            }
            Task.prototype.define = function (label, mode, size) {
                if (typeof mode === "undefined") { mode = this.config_.mode; }
                if (typeof size === "undefined") { size = this.config_.size; }
                this.option_[label] = {
                    mode: mode,
                    size: size
                };
                this.table_[label] = [];
            };

            Task.prototype.reserve = function (label, task) {
                switch (typeof label) {
                    case 'string':
                        !this.option_[label] && this.define(label);

                        var config = this.option_[label], list = this.table_[label], args = [].slice.call(arguments, 2);
                        break;

                    case 'function':
                        var config = this.config_, list = this.list_, args = [].slice.call(arguments, 1);
                        break;

                    default:
                        return;
                }

                var method;
                if (config.mode > 0) {
                    method = 'push';
                } else {
                    method = 'unshift';
                }
                list[method]([task, args.shift(), args]);
            };

            Task.prototype.digest = function (label, limit) {
                switch (typeof label) {
                    case 'string':
                        limit = limit || 0;
                        var config = this.option_[label], list = this.table_[label];
                        if (!list) {
                            return;
                        }
                        break;

                    case 'number':
                    case 'undefined':
                        limit = label || 0;
                        label = undefined;
                        var config = this.config_, list = this.list_;
                        break;

                    default:
                        return;
                }

                if (list.length > config.size) {
                    if (config.mode > 0) {
                        list.splice(0, list.length - config.size);
                    } else {
                        list.splice(list.length - config.size, list.length);
                    }
                }

                ++limit;
                var task;
                while (task = limit-- && list.pop()) {
                    task.shift().apply(task.shift() || window, task.shift() || []);
                }

                if (undefined === label) {
                    var table = this.table_;
                    for (var i in table) {
                        this.digest(i, limit);
                    }
                }
            };

            Task.prototype.clear = function (label) {
                switch (typeof label) {
                    case 'string':
                        this.table_[label].splice(0, this.table_[label].length);
                        break;

                    default:
                        var table = this.table_;
                        for (var i in table) {
                            this.clear(i);
                        }
                }
            };
            return Task;
        })();
        LIBRARY.Task = Task;
    })(MODULE.LIBRARY || (MODULE.LIBRARY = {}));
    var LIBRARY = MODULE.LIBRARY;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../library/task.ts"/>
var MODULE;
(function (MODULE) {
    /* VIEW */
    (function (VIEW) {
        var Observer = (function () {
            function Observer(model_, view_, controller_) {
                var _this = this;
                this.model_ = model_;
                this.view_ = view_;
                this.controller_ = controller_;
                this.task_ = new MODULE.LIBRARY.Task(-1, 1);
                this.queue_ = [];
                this.handlers_ = {
                    customHandler: function (customEvent, nativeEvent, bubbling, callback) {
                        var event = customEvent;
                        if (_this.view_ !== _this.model_.getView(event.data)) {
                            return void _this.view_.close();
                        }

                        nativeEvent = nativeEvent instanceof jQuery.Event ? nativeEvent : undefined;
                        var view = _this.model_.getView(event.data), setting = view.setting, container = window === customEvent.currentTarget ? document : customEvent.currentTarget, activator = !nativeEvent ? container : window === nativeEvent.currentTarget ? document : nativeEvent.currentTarget, layer = document === activator || window === activator ? 0 : 1, manual = !nativeEvent;

                        !bubbling && event.stopPropagation();

                        if (!bubbling && event.target !== event.currentTarget) {
                            return;
                        }

                        if (!view.substance || callback) {
                            view.dispatch(setting.nss.event, [nativeEvent, false].concat(callback || []));
                            callback && callback(view);
                        } else if (event.target === event.currentTarget) {
                            _this.reserve(customEvent, nativeEvent, container, activator, layer, manual);
                        }
                    },
                    nativeHandler: function (event) {
                        if (_this.view_ !== _this.model_.getView(event.data)) {
                            return void _this.view_.close();
                        }

                        if (document !== event.target && event.target !== event.currentTarget || event.isDefaultPrevented()) {
                            return;
                        }
                        var view = _this.model_.getView(event.data);
                        0 /* open */ === view.state() && jQuery(window === event.currentTarget ? document : event.currentTarget).trigger(view.setting.nss.event, [event]);
                    }
                };
                MODULE.SEAL(this);
            }
            Observer.prototype.clean_ = function () {
                var context = this.view_.context, setting = this.view_.setting, key = setting.nss.data_count;

                jQuery.removeData(context, setting.nss.data);

                this.view_.substance && jQuery(context).find(setting.trigger).each(eachTrigger);
                function eachTrigger(i, element) {
                    jQuery.removeData(element, key);
                }
            };

            Observer.prototype.observe = function () {
                var view = this.view_, setting = view.setting, context = view.context, $context = jQuery(view.context);

                this.clean_();

                jQuery.data(context, setting.nss.data, setting.uid);

                $context.bind(setting.nss.event, setting.uid, this.handlers_.customHandler);

                if (document === context) {
                    jQuery(window).bind(setting.nss.scroll, setting.uid, this.handlers_.nativeHandler).bind(setting.nss.resize, setting.uid, this.handlers_.nativeHandler);
                } else {
                    $context.bind(setting.nss.scroll, setting.uid, this.handlers_.nativeHandler).bind(setting.nss.resize, setting.uid, this.handlers_.nativeHandler);
                }
            };

            Observer.prototype.release = function () {
                var view = this.view_, setting = view.setting, context = view.context, $context = jQuery(context);

                this.clean_();

                $context.unbind(setting.nss.event);

                if (document === context) {
                    jQuery(window).unbind(setting.nss.scroll).unbind(setting.nss.resize);
                } else {
                    $context.unbind(setting.nss.scroll).unbind(setting.nss.resize);
                }
            };

            Observer.prototype.reserve = function (customEvent, nativeEvent, container, activator, layer, immediate) {
                var _this = this;
                var view = this.view_, setting = view.setting, status = view.status;

                var id, queue = this.queue_;
                while (id = queue.shift()) {
                    clearTimeout(id);
                }

                this.task_.reserve(!layer ? 'root' : 'node', this.digest, this, customEvent, nativeEvent, container, activator, layer);

                if (0 /* open */ !== this.view_.state() || 0 /* open */ !== this.model_.state() || !immediate && setting.delay) {
                    queue.push(setTimeout(function () {
                        return void _this.task_.digest('node') || void _this.task_.digest();
                    }, setting.delay));
                } else {
                    this.task_.digest('node');
                    this.task_.digest();
                }
            };

            Observer.prototype.digest = function (customEvent, nativeEvent, container, activator, layer) {
                var id, queue = this.queue_;
                while (id = queue.shift()) {
                    clearTimeout(id);
                }

                this.view_.process(customEvent, nativeEvent, container, activator, layer);
            };
            return Observer;
        })();
        VIEW.Observer = Observer;
    })(MODULE.VIEW || (MODULE.VIEW = {}));
    var VIEW = MODULE.VIEW;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="observer.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MODULE;
(function (MODULE) {
    /* VIEW */
    (function (VIEW) {
        var Main = (function (_super) {
            __extends(Main, _super);
            //
            // $context
            //
            // OK document
            // OK document & elements
            // OK element
            // NG elements
            function Main(model_, controller_) {
                _super.call(this, -1 /* initiate */);
                this.model_ = model_;
                this.controller_ = controller_;
                this.observer = new VIEW.Observer(this.model_, this, this.controller_);
                this.children_ = [];
                this.status = {
                    index: 0,
                    count: 0,
                    first: true,
                    scroll: [],
                    direction: 1,
                    distance: 0,
                    turn: false,
                    end: false,
                    param: undefined
                };
            }
            Main.prototype.state = function () {
                return this.state_;
            };

            Main.prototype.initiate_ = function ($context, setting, parent) {
                var _this = this;
                // context build
                var root = null, nodes = [];
                $context = $context.map(function (i, element) {
                    switch (true) {
                        case document === element:
                        case window === element:
                            return !root ? root = document : null;
                        case _this.model_.isDOM(element) && jQuery.contains(document.documentElement, element):
                            return nodes.push(element), element;
                    }
                });

                var context = root ? root : nodes[0];

                switch (false) {
                    case !!root || 1 === nodes.length:
                    case context === document || jQuery.contains(document.documentElement, context):
                        return;
                }

                // own instance
                this.root_ = !!root;
                this.parent_ = parent || null;
                this.context = context;
                this.substance = 1 === $context.length;
                this.setting = setting;
                this.status.param = setting.param;
                this.status.scroll = [0, 0];

                if (!setting.standby && this.substance && !jQuery(context).find(setting.trigger).length) {
                    this.close();
                    return;
                }

                this.observer.observe();
                this.model_.addView(this);

                MODULE.SEAL(this);

                // child instance
                this.root_ && jQuery.each(nodes, function (i, element) {
                    var view = new MODULE.View(_this.model_, _this.controller_);
                    _this.children_.push(view);
                    view.open(jQuery(element), setting.clone(), _this);
                });

                return true;
            };

            Main.prototype.terminate_ = function () {
                this.state_ = 6 /* terminate */;

                jQuery.each(this.children_, function (i, child) {
                    return child.close();
                });

                this.observer.release();

                var parent = this.parent_;
                this.parent_ = null;

                this.model_.removeView(this.setting.uid);

                parent && parent.correct();

                return true;
            };

            Main.prototype.correct = function () {
                var _this = this;
                if (7 /* close */ === this.state()) {
                    return false;
                }

                var error = false;
                var setting = this.setting;

                // children
                // - state
                this.children_ = jQuery.grep(this.children_, function (child, i) {
                    child.correct();
                    switch (child.state()) {
                        case 5 /* crash */:
                        case 7 /* close */:
                            child.close();
                            error = error || 1 === _this.children_.length;
                            return false;
                        default:
                            return true;
                    }
                });

                switch (this.state()) {
                    case 5 /* crash */:
                        error = true;
                        break;
                }

                // - observe
                error = error || 0 /* open */ <= this.state() && setting.uid !== jQuery.data(this.context, setting.nss.data);
                error && this.close();

                return !error;
            };

            Main.prototype.open = function ($context, setting, parent) {
                $context[MODULE.NAME].close(setting.nss.event);
                if (this.initiate_($context, setting, parent)) {
                    this.state_ = 0 /* open */;
                } else {
                    this.close();
                }
            };

            Main.prototype.close = function () {
                if (this.terminate_()) {
                    this.state_ = 7 /* close */;
                } else {
                    this.state_ = 7 /* close */;
                    this.model_.removeView(this.setting.uid);
                }
            };

            Main.prototype.process = function (customEvent, nativeEvent, container, activator, layer) {
                if (!this.correct()) {
                    return;
                }

                switch (this.state()) {
                    case 0 /* open */:
                        break;
                    case 1 /* pause */:
                        this.observer.reserve(customEvent, nativeEvent, container, activator, layer, false);
                    default:
                        return;
                }

                this.state_ = 2 /* lock */;
                this.model_.process(this, customEvent, nativeEvent, container, activator);
                this.state_ = 0 /* open */;
            };

            Main.prototype.enable = function () {
                jQuery.each(this.children_, function (i, child) {
                    return child.enable();
                });
                if (0 /* open */ !== this.state() && 1 /* pause */ !== this.state()) {
                    throw new Error('Enabling only while open or pause state.');
                }
                this.state_ = 0 /* open */;
            };

            Main.prototype.disable = function () {
                jQuery.each(this.children_, function (i, child) {
                    return child.disable();
                });
                if (0 /* open */ !== this.state() && 1 /* pause */ !== this.state()) {
                    throw new Error('Disabling only while open or pause state.');
                }
                this.state_ = 1 /* pause */;
            };

            Main.prototype.dispatch = function (event, params) {
                jQuery.each(this.children_, function (i, child) {
                    if (event instanceof jQuery.Event && event.target === child.context) {
                        return;
                    }
                    jQuery(child.context).trigger(event, params);
                });
            };
            return Main;
        })(VIEW.Template);
        VIEW.Main = Main;
    })(MODULE.VIEW || (MODULE.VIEW = {}));
    var VIEW = MODULE.VIEW;
})(MODULE || (MODULE = {}));

var MODULE;
(function (MODULE) {
    MODULE.View = MODULE.VIEW.Main;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../view/main.ts"/>
var MODULE;
(function (MODULE) {
    /* CONTROLLER */
    (function (CONTROLLER) {
        var M;
        var C;
        var S;

        var Functions = (function () {
            function Functions(model, controller) {
                M = model;
                C = controller;
                S = this;
                MODULE.SEAL(this);
            }
            Functions.prototype.enable = function (key, bubbling) {
                M.lookup(this, key, bubbling, function (view) {
                    view.enable();
                });
                return this;
            };

            Functions.prototype.disable = function (key, bubbling) {
                M.lookup(this, key, bubbling, function (view) {
                    view.disable();
                });
                return this;
            };

            Functions.prototype.vtrigger = function (key, bubbling) {
                M.lookup(this, key, bubbling, function (view) {
                    jQuery(view.context).trigger(view.setting.nss.event);
                });
                return this;
            };

            Functions.prototype.open = function (setting) {
                this instanceof jQuery ? this.end()[MODULE.NAME](setting) : jQuery[MODULE.NAME](setting);
                return this;
            };

            Functions.prototype.close = function (key, bubbling) {
                M.lookup(this, key, bubbling, function (view) {
                    view.close();
                });
                return this;
            };
            return Functions;
        })();
        CONTROLLER.Functions = Functions;
    })(MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
    var CONTROLLER = MODULE.CONTROLLER;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="function.ts"/>
/// <reference path="../view/main.ts"/>
var MODULE;
(function (MODULE) {
    /* CONTROLLER */
    (function (CONTROLLER) {
        var M;
        var C;
        var S;

        var Methods = (function () {
            function Methods(model, controller) {
                M = model;
                C = controller;
                S = this;
                MODULE.SEAL(this);
            }
            return Methods;
        })();
        CONTROLLER.Methods = Methods;
    })(MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
    var CONTROLLER = MODULE.CONTROLLER;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../model/_template.ts"/>
/// <reference path="function.ts"/>
/// <reference path="method.ts"/>
var MODULE;
(function (MODULE) {
    /* CONTROLLER */
    (function (CONTROLLER) {
        var Template = (function () {
            function Template(model, state) {
                /**
                * UUID
                *
                * @property UUID
                * @type String
                */
                this.UUID = MODULE.GEN_UUID();
                /**
                * Controllerの遷移状態を持つ
                *
                * @prperty state_
                * @type {State}
                */
                this.state_ = -2 /* blank */;
                /**
                * 拡張のプロパティを指定する
                *
                * @prperty PROPERTIES
                * @type {String}
                */
                this.PROPERTIES = [];
                this.state_ = state;
                this.FUNCTIONS = new CONTROLLER.Functions(model, this);
                this.METHODS = new CONTROLLER.Methods(model, this);
                this.REGISTER(model);
            }
            Template.prototype.EXTEND = function (context) {
                if (context instanceof MODULE.NAMESPACE) {
                    if (context instanceof jQuery) {
                        // コンテクストへの変更をend()で戻せるようadd()
                        context = context.add();
                    }

                    // コンテクストに関数を設定
                    this.REGISTER_FUNCTION(context);

                    // コンテクストにメソッドを設定
                    this.REGISTER_METHOD(context);
                } else {
                    if (context !== this.EXTENSION) {
                        // コンテクストを拡張に変更
                        context = this.EXTENSION;
                    }

                    // コンテクストに関数を設定
                    this.REGISTER_FUNCTION(context);
                }

                // コンテクストのプロパティを更新
                this.UPDATE_PROPERTIES(context);
                return context;
            };

            /**
            * 拡張モジュール本体のスコープ。
            *
            * @method REGISTER
            * @param {Any} [params]* パラメータ
            */
            Template.prototype.REGISTER = function (model) {
                var S = this;
                this.EXTENSION = this.EXTENSION || function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    var context = S.EXTEND(this);
                    args = [context].concat(args);
                    args = S.EXEC.apply(S, args);
                    return args instanceof Array ? model.MAIN.apply(model, args) : args;
                };
                this.EXTEND(this.EXTENSION);

                // プラグインに関数を設定してネームスペースに登録
                window[MODULE.NAMESPACE] = window[MODULE.NAMESPACE] || {};
                if (MODULE.NAMESPACE.prototype) {
                    MODULE.NAMESPACE[MODULE.NAME] = MODULE.NAMESPACE.prototype[MODULE.NAME] = this.EXTENSION;
                } else {
                    MODULE.NAMESPACE[MODULE.NAME] = this.EXTENSION;
                }
            };

            Template.prototype.EXEC = function () {
                return this.exec_.apply(this, arguments);
            };

            Template.prototype.exec_ = function (context) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    args[_i] = arguments[_i + 1];
                }
                return [context].concat(args);
            };

            Template.prototype.REGISTER_FUNCTION = function (context) {
                var funcs = this.FUNCTIONS;
                for (var i in funcs) {
                    if ('constructor' === i) {
                        continue;
                    }
                    context[i] = funcs[i];
                }
                return context;
            };

            Template.prototype.REGISTER_METHOD = function (context) {
                var METHODS = this.METHODS;
                for (var i in METHODS) {
                    if ('constructor' === i) {
                        continue;
                    }
                    context[i] = METHODS[i];
                }
                return context;
            };

            Template.prototype.UPDATE_PROPERTIES = function (context) {
                var props = this.PROPERTIES;

                var i, len, prop;
                for (i = 0, len = props.length; i < len; i++) {
                    if ('constructor' === i) {
                        continue;
                    }
                    prop = props[i];
                    if (context[prop]) {
                        context[prop] = context[prop]();
                    }
                }
                return context;
            };
            return Template;
        })();
        CONTROLLER.Template = Template;
    })(MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
    var CONTROLLER = MODULE.CONTROLLER;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
var MODULE;
(function (MODULE) {
    /* CONTROLLER */
    (function (CONTROLLER) {
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main(model_) {
                _super.call(this, model_, -1 /* initiate */);
                this.model_ = model_;
                this.state_ = 0 /* open */;
                MODULE.SEAL(this);
            }
            Main.prototype.exec_ = function ($context) {
                var args = [].slice.call(arguments, 1, 2), option = args[0];

                $context[MODULE.NAME] = MODULE.NAMESPACE[MODULE.NAME];
                if (MODULE.NAMESPACE[this.model_.alias()]) {
                    $context[this.model_.alias()] = MODULE.NAMESPACE[this.model_.alias()];
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
                    return $context instanceof MODULE.NAMESPACE ? $context.end().add(option)[MODULE.NAME]() : jQuery(option)[MODULE.NAME]();
                }

                return [$context].concat(args);
            };
            return Main;
        })(CONTROLLER.Template);
        CONTROLLER.Main = Main;
    })(MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
    var CONTROLLER = MODULE.CONTROLLER;
})(MODULE || (MODULE = {}));

var MODULE;
(function (MODULE) {
    MODULE.Controller = MODULE.CONTROLLER.Main;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="../view/main.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        /* MODEL */
        (function (APP) {
            var Main = (function () {
                function Main(model_, controller_) {
                    this.model_ = model_;
                    this.controller_ = controller_;
                    MODULE.SEAL(this);
                }
                Main.prototype.initialize = function (option, $context) {
                    var _this = this;
                    var setting = this.configure(option, $context);

                    $context = $context.end()[MODULE.NAME](setting.global ? document : null);
                    $context = $context.map(function (i, element) {
                        switch (true) {
                            case document === element:
                                return element;
                            case window === element:
                                return ~jQuery.inArray(document, $context.get()) ? null : document;
                            case _this.model_.isDOM(element) && jQuery.contains(document.documentElement, element):
                                return element;
                            default:
                                return null;
                        }
                    });

                    if (setting.global || ~jQuery.inArray(document, $context.get()) || ~jQuery.inArray(window, $context.get())) {
                        new MODULE.View(this.model_, this.controller_).open($context, setting);
                    } else {
                        $context.each(function (i) {
                            return new MODULE.View(_this.model_, _this.controller_).open($context.eq(i), setting);
                        });
                    }
                };

                Main.prototype.configure = function (option, $context) {
                    var that = this;

                    option = jQuery.extend(true, {}, option.option || option);
                    MODULE.FREEZE(option, true);

                    var initial = {
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
                    }, force = {
                        gns: MODULE.NAME,
                        option: option,
                        clone: function () {
                            return MODULE.FREEZE(jQuery.extend(true, {}, this, { uid: MODULE.GEN_UUID() }), true);
                        }
                    }, compute = function () {
                        setting.ns = setting.ns && '.' === setting.ns.charAt(0) ? setting.ns.slice(1) : setting.ns;
                        setting.ns = setting.ns && setting.ns.split('.').sort().join('.') || '';
                        var nsArray = [MODULE.NAME].concat(setting.ns && setting.ns.split('.') || []);
                        setting.ahead = setting.ahead instanceof Array ? setting.ahead.concat(setting.ahead).slice(0, 2) : [setting.ahead, setting.ahead];
                        setting.ahead[0] = Math.abs(setting.ahead[0]) < 1 ? '*' + (setting.ahead[0] * 10) : '' + setting.ahead[0];
                        setting.ahead[1] = Math.abs(setting.ahead[1]) < 1 ? '*' + (setting.ahead[1] * 10) : '' + setting.ahead[1];
                        setting.step = +!!setting.step;
                        return {
                            uid: MODULE.GEN_UUID(),
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

                    var setting;
                    setting = jQuery.extend(true, initial, option);
                    setting = jQuery.extend(true, setting, force);
                    setting = jQuery.extend(true, setting, compute());
                    return MODULE.FREEZE(setting, true);
                };

                Main.prototype.process = function (view, customEvent, nativeEvent, container, activator, cache) {
                    var setting = view.setting, status = view.status, $targets = cache.$targets = !cache.update && setting.step ? cache.$targets : jQuery(container).find(setting.trigger), $target = $targets.eq(status.index), root = cache.root = !cache.update ? cache.root : window === view.context || document === view.context, layer = cache.layer = !cache.update ? cache.layer : document === activator || window === activator ? 0 : 1, evtCurrScroll = cache.evtCurrScroll = !cache.update ? cache.evtCurrScroll : jQuery(activator).scrollTop(), evtLastScroll = cache.evtLastScroll = !cache.update ? cache.evtLastScroll : status.scroll[layer], direction = cache.direction = !cache.update ? cache.direction : evtCurrScroll === evtLastScroll ? status.direction : evtCurrScroll < evtLastScroll ? -1 : 1, distance = cache.distance = !cache.update ? cache.distance : Math.abs(evtCurrScroll - evtLastScroll);

                    if (setting.standby && status.first && !$target.length) {
                        return;
                    }

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
                            var $win, winTop, winHeight, winBottom, $frame, frameTop, frameHeight, frameBottom, tgtTop, tgtHeight, tgtBottom, visibleTop, visibleBottom;

                            $win = cache.$win = !cache.update ? cache.$win : jQuery(window);
                            winTop = cache.winTop = !cache.update ? cache.winTop : $win.scrollTop();
                            winHeight = cache.winHeight = !cache.update ? cache.winHeight : $win.height();
                            winBottom = winTop + winHeight;

                            var aheadTop, aheadBottom, ahead, rush, topin, topout, topover, bottomin, bottomout, bottomover;

                            ahead = setting.ahead[0] + '';
                            aheadTop = cache.aheadTop = !cache.update ? cache.aheadTop : '*' === ahead.charAt(0) ? parseInt(winHeight * Number(ahead.slice(1)) + '', 10) : parseInt(ahead + '', 10);
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

                            var fire = false, step = 1, iterate = false, force = false;

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
                                        fire = status.direction === 1 ? ((!layer ? winBottom >= tgtTop + status.distance - aheadBottom : visibleBottom >= tgtTop + status.distance - aheadBottom) ? false : fire) : ((!layer ? winTop <= tgtBottom - status.distance + aheadTop : visibleTop <= tgtBottom - status.distance + aheadTop) ? false : fire);
                                    }
                                    break;
                                case setting.skip && setting.repeat:
                                    // skip
                                    fire = topin && bottomin;

                                    // repeat
                                    if (fire && !status.first && (!nativeEvent || nativeEvent.type === 'scroll')) {
                                        fire = status.direction === 1 ? ((!layer ? winBottom >= tgtTop + status.distance - aheadBottom : visibleBottom >= tgtTop + status.distance - aheadBottom) ? false : fire) : ((!layer ? winTop <= tgtBottom - status.distance + aheadTop : visibleTop <= tgtBottom - status.distance + aheadTop) ? false : fire);
                                    }
                                    break;
                            }

                            if (force) {
                                fire = iterate = true;
                                step = setting.step;
                            } else {
                                iterate = status.direction === 1 ? topin : bottomin;
                                step = setting.step ? setting.step * status.direction : !fire ? status.direction : status.direction === 1 ? 0 : -1;
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
                };
                return Main;
            })();
            APP.Main = Main;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));

var MODULE;
(function (MODULE) {
    (function (MODEL) {
        MODEL.App = MODEL.APP.Main;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.ts"/>
/// <reference path="../view/main.ts"/>
/// <reference path="../controller/main.ts"/>
var MODULE;
(function (MODULE) {
    /* MODEL */
    (function (MODEL) {
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main() {
                _super.call(this, -1 /* initiate */);
                this.controller_ = new MODULE.Controller(this);
                this.views_ = {};
                this.app_ = new MODEL.App(this, this.controller_);
                this.state_ = -2 /* blank */;
                this.alias_ = 'vt';
                this.state_ = 0 /* open */;
                MODULE.SEAL(this);
            }
            Main.prototype.state = function () {
                return this.state_;
            };

            Main.prototype.alias = function (name) {
                if (!arguments.length) {
                    return this.alias_;
                }

                //name = 'string' === typeof name ? name : name || this.alias();
                name = name || MODULE.NAME;
                this.alias_ = name;

                if (name !== MODULE.NAME && !jQuery[name] && !jQuery.fn[name]) {
                    jQuery[name] = jQuery[MODULE.NAME];
                    jQuery.fn[name] = jQuery.fn[MODULE.NAME];
                }
                return this.alias();
            };

            Main.prototype.main_ = function ($context, option) {
                switch (typeof option) {
                    case 'undefined':
                        option = this.alias();
                    case 'string':
                        this.alias(option);
                        $context[this.alias()] = $context[MODULE.NAME];
                        return $context;

                    case 'object':
                        $context = $context instanceof MODULE.NAMESPACE ? $context : jQuery(document)[MODULE.NAME]();
                        if (!option.trigger || !option.handler) {
                            return $context;
                        }
                        if (0 === option.step && option.repeat) {
                            return $context;
                        }
                        option = MODULE.FREEZE(option, true);
                        break;

                    default:
                        return $context;
                }

                this.app_.initialize(option, $context);

                return arguments[0];
            };

            Main.prototype.lookup = function ($context, key, bubbling, callback) {
                if (typeof key !== 'string' && bubbling === undefined) {
                    bubbling = !!key;
                    key = '';
                } else {
                    key = key || '';
                }
                key = jQuery.map(key.split(/\s+/), function (ns) {
                    return ns.split('.').sort().join('.');
                }).sort().join(' ');
                var regs = jQuery.map(key.split(/\s+/), function (key) {
                    return new RegExp('(?:^|[.\s])' + key + '(?:$|[.\s])');
                });
                var filter = function (view) {
                    switch (false) {
                        case !key || !!jQuery.grep(regs, function (reg) {
                            return reg.test(view.setting.ns);
                        }).length:
                        case view.correct():
                            break;
                        default:
                            callback(view);
                    }
                };
                if ($context instanceof MODULE.NAMESPACE) {
                    $context.trigger(MODULE.NAME, [null, bubbling, filter]);
                } else {
                    jQuery.each(this.views_, function (i, view) {
                        return filter(view);
                    });
                }
            };

            Main.prototype.process = function (view, customEvent, nativeEvent, container, activator) {
                switch (this.state()) {
                    case 0 /* open */:
                        break;
                    case 1 /* pause */:
                        jQuery(activator).trigger(view.setting.nss.event, [nativeEvent, false]);
                    default:
                        return;
                }

                this.state_ = 2 /* lock */;
                this.app_.process(view, customEvent, nativeEvent, container, activator, { update: true });
                this.state_ = 0 /* open */;
            };

            Main.prototype.isDOM = function (object) {
                if (!object || 'object' !== typeof object) {
                    return false;
                }
                return object === object['window'] || 'ownerDocument' in object;
            };

            Main.prototype.addView = function (view) {
                this.removeView(view.setting.uid);
                this.views_[view.setting.uid] = view;
            };

            Main.prototype.getView = function (uid) {
                return this.views_[uid];
            };

            Main.prototype.removeView = function (uid) {
                var view = this.getView(uid);
                view && 6 /* terminate */ > view.state() && view.close();
                delete this.views_[uid];
            };
            return Main;
        })(MODEL.Template);
        MODEL.Main = Main;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));

var MODULE;
(function (MODULE) {
    MODULE.Model = MODULE.MODEL.Main;
})(MODULE || (MODULE = {}));
/// <reference path="model/main.ts"/>
/// <reference path="view/main.ts"/>
/// <reference path="controller/main.ts"/>
var Module = (function () {
    function Module() {
        new MODULE.Model();
    }
    return Module;
})();

new Module();
})(window, window.document, void 0, jQuery);
