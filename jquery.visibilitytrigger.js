/*
 * 
 * visibility trigger
 * 
 * ---
 * @Copyright(c) 2012, falsandtru
 * @license MIT http://opensource.org/licenses/mit-license.php
 * @version 0.0.3
 * @updated 2013/11/30
 * @author falsandtru https://github.com/falsandtru/
 * @CodingConventions Google JavaScript Style Guide
 * ---
 * Note:
 * 
 * ---
 * Example:
 * @jquery 1.7.2
 * 
 * $.visibilitytrigger( {
 *   trigger: 'img[data-origin]',
 *   callback: function(){ $( this ).attr( 'src', $( this ).attr( 'data-origin' ) ) },
 *   ahead: 300,
 *   beforehand: 1
 * } ).vtrigger() ;
 * 
 * ---
 * Document:
 * https://github.com/falsandtru/jquery.visibilitytrigger.js
 * 
 */

( function ( jQuery, window, document, undefined ) {
  
  var Store ;
  
  function registrate( jQuery, window, document, undefined, Store ) {
    jQuery.fn[ Store.name ] = jQuery[ Store.name ] = function () {
      
      return initialize.apply( this, [
        jQuery, window, document, undefined, Store
      ].concat( [].slice.call( arguments ) ) ) ;
    } ;
    Store.setProperties.call( jQuery[ Store.name ] ) ;
  }
  
  function initialize( jQuery, window, document, undefined, Store, option ) {
    
    
    var $context = this ;
    
    // polymorphism
    switch ( true ) {
      case typeof option === 'object' && ( jQuery( option, document )[0] || option === window || option === document ):
        $context = $context instanceof jQuery ? $context.add( option ) : jQuery( option ) ;
        Store.setProperties.call( $context, null, Store ) ;
        return $context ;
      case typeof option === 'object':
        $context = $context instanceof jQuery ? $context.add() : jQuery( document ) ;
        Store.setAlias( option.gns ) ;
        Store.setProperties.call( $context, option.ns || '', Store ) ;
        if ( !option.trigger || !option.callback ) {
          return $context ;
        }
        break ;
        
      case option === 'string':
      default :
        $context = $context instanceof jQuery ? $context.add() : $context ;
        Store.setAlias( option ) ;
        Store.setProperties.call( $context, null, Store ) ;
        return $context ;
    }
    
    // setting
    var setting ;
    setting = typeof option === 'object' && jQuery.extend( true,
      {
        gns: Store.name,
        ns: null,
        context: null,
        trigger: null,
        callback: function () {},
        parameter: [],
        ahead: 0,
        beforehand: 0,
        step: 1,
        multi: false,
        skip: false,
        extend: true,
        cache: true,
        delay: 300,
        interval: 0,
        reset: true,
        terminate: true
      },
      option,
      {
        id: 0,
        nss: null,
        root: !$context.parent()[0],
        first: true,
        index: 0,
        count: 0,
        height: [ 0, 0 ],
        direction: 1,
        distance: 0,
        turn: false,
        end: false,
        queue: [],
        status: {
          active: true
        },
        timestamp: 0,
        option: option
      }
    ) ;
    
    setting.nss = {
      array: [ Store.name ].concat( setting.ns && String( setting.ns ).split( '.' ) || [] )
    } ;
    jQuery.extend( true, setting, {
        nss: {
          name: setting.ns || '',
          event: setting.nss.array.join( '.' ),
          alias: Store.alias ? [ Store.alias ].concat( setting.nss.array.slice( 1 ) ).join( '.' ) : false,
          scroll: [ 'scroll' ].concat( setting.nss.array.join( ':' ) ).join( '.' ),
          resize: [ 'resize' ].concat( setting.nss.array.join( ':' ) ).join( '.' ),
          data: setting.nss.array.join( '-' ),
          data_fired: setting.nss.array.concat( 'fired' ).join( '-' )
        },
        ahead: typeof setting.ahead in { string: 0, number: 0 } ? [ setting.ahead, setting.ahead ]: undefined
      }
    ) ;
    
    // registrate
    Store.registrate.call( $context, jQuery, window, document, undefined, Store, setting ) ;
    
    return $context ;
  }
  
  function Task( callback ) {
    var args = [].slice.call( arguments, 1 ) ;
    return function () {
      callback.apply( this, args.concat( [].slice.call( arguments ) ) ) ;
    } ;
  }
  
  Store = {
    name: 'visibilitytrigger',
    alias: 'vt',
    ids: [0],
    settings: [0],
    relations: {},
    count: 0,
    countTask: 0,
    countDrive: 0,
    countEvent: 0,
    countRedirect: 0,
    countCallback: 0,
    search: function ( key, callback, endcall ) {
      var settings, setting, ids, id, reg, result ;
      
      if ( !key && key !== '' && this.vtUID && this instanceof jQuery ) {
        if ( typeof this.vtNamespace === 'string' ) {
          key = this.vtNamespace ;
      } } // if | if
      switch ( this instanceof jQuery ? key ? typeof key : String( key )
                                      : 'direct:' + ( key ? typeof key : String( key ) ) ) {
        // all
        case 'direct:undefined':
        case 'direct:boolean':
        case 'direct:false':
        case 'direct:null':
        case 'direct:0':
        case 'direct:number':
        case 'number':
        case 'direct:string':
        case 'direct:':
          return Store.redirect.call( this, key, false, callback ) ;
        // namespace + context
        case 'string':
        case '':
          reg = new RegExp( typeof key === 'string' ? key && '^' + key.replace( /([.*+?^=!:${}()|[\]\/\\])/g, '\\$1' ) + '(?:$|\.)' || '^$' : '' ) ;
        // context
        case 'undefined':
        case 'null':
        case '0':
        case 'boolean':
        case 'false':
          var events, event ;
          settings = Store.settings ;
          for ( var i = 0, element ; element = this[ i ] ; i++ ) {
            switch ( true ) {
              case 'object' !== typeof ( events = jQuery.data( element, 'events' ) ):
              case !events || 'object' !== typeof ( events = events[ Store.name ] ):
                continue;
                break ;
            }
            
            for ( var j = 0 ; event = events[ j ] ; j++ ) {
              if ( typeof event.data !== 'number' && event.type !== Store.name ) {
                continue ;
              }
              id = event.data ;
              switch ( key ? typeof key : String( key ) ) {
                case 'number':
                  if ( ( setting = settings[ id ] ) && id === key ) {
                    if ( ( result = callback.call( this, setting ) ) !== undefined ) { return result ; }
                  }
                  break ;
                case 'string':
                case '':
                  if ( ( setting = settings[ id ] ) && reg.test( event.namespace ) ) {
                    if ( ( result = callback.call( this, setting ) ) !== undefined ) { return result ; }
                  }
                  break ;
                default :
                  if ( ( setting = settings[ id ] ) ) {
                    if ( ( result = callback.call( this, setting ) ) !== undefined ) { return result ; }
                  }
              }
            }
          }
          if ( endcall && ( result = callback.call( this ) ) !== undefined ) { return result ; }
          break ;
      }
      return this ;
    },
    redirect: function ( key, bubbling, callback, endcall ) {
      var settings, setting, ids, id, reg, result ;
      
      if ( !key && key !== '' && this.vtUID && this instanceof jQuery ) {
        if ( typeof this.vtNamespace === 'string' ) {
          key = this.vtNamespace ;
      } } // if | if
      switch ( this instanceof jQuery ? key ? typeof key : String( key )
                                      : 'direct:' + ( key ? typeof key : String( key ) ) ) {
        // all
        case 'direct:undefined':
        case 'direct:boolean':
        case 'direct:false':
        case 'direct:null':
        case 'direct:0':
          ids = Store.ids ;
          settings = Store.settings ;
          for ( var i = 1, len = ids.length ; id = ids[ i ] ; i++ ) {
            if ( setting = settings[ id ] ) {
              if ( ( result = callback.call( this, setting ) ) !== undefined ) { return result ; }
          } } // if | for
          if ( endcall && ( result = callback.call( this ) ) !== undefined ) { return result ; }
          return this ;
        case 'direct:number':
        case 'number':
          id = key ;
          settings = Store.settings ;
          if ( setting = settings[ id ] ) {
            if ( ( result = callback.call( this, setting ) ) !== undefined ) { return result ; }
          }
          if ( endcall && ( result = callback.call( this ) ) !== undefined ) { return result ; }
          return this ;
        case 'direct:string':
        case 'direct:':
          ids = Store.ids ;
          settings = Store.settings ;
          reg = new RegExp( typeof key === 'string' ? key && '^' + key.replace( /([.*+?^=!:${}()|[\]\/\\])/g, '\\$1' ) + '(?:$|\.)' || '^$' : '' ) ;
          for ( var i = 1, len = ids.length ; id = ids[ i ] ; i++ ) {
            if ( ( setting = settings[ id ] ) && reg.test( setting.nss.name ) ) {
              if ( ( result = callback.call( this, setting ) ) !== undefined ) { return result ; }
          } } // if | for
          if ( endcall && ( result = callback.call( this ) ) !== undefined ) { return result ; }
          return this ;
        // namespace + context
        case 'string':
        case '':
          this.trigger( Store.name + ( key ? '.' + key : '' ), [ callback, bubbling ] ) ;
          break ;
        // context
        case 'undefined':
        case 'null':
        case '0':
        case 'boolean':
        case 'false':
          this.trigger( Store.name, [ callback, bubbling ] ) ;
          break ;
      }
      return this ;
    },
    setAlias:  function ( name ) {
      Store.alias = typeof name === 'string' ? name : Store.alias ;
      if ( Store.name !== Store.alias && !jQuery[ Store.alias ] ) {
        jQuery.fn[ Store.alias ] = jQuery[ Store.alias ] = jQuery.fn[ Store.name ] ;
      }
    },
    setProperties: function ( namespace ) {
      
      this.vtUID = ++Store.count ;
      
      this.vtNamespace = typeof namespace === 'string' ? namespace : null ;
      
      this.isRegistrate = function ( key ) {
        var reg = new RegExp( typeof key === 'string' ? key && '^' + key.replace( /([.*+?^=!:${}()|[\]\/\\])/g, '\\$1' ) + '(?:$|\.)' || '^$' : '' ) ;
        return true === Store.search.call( this, key, function ( setting ) {
          if ( reg.test( setting.nss.name ) ) {
            return true ;
          }
        } ) ;
      } ;
      
      this.enable = function ( key, bubbling ) {
        return Store.redirect.call( this, key, bubbling, function ( setting ) {
          setting.status.active = true ;
        } ), this ;
      } ;
      
      this.disable = function ( key, bubbling ) {
        return Store.redirect.call( this, key, bubbling, function ( setting ) {
          setting.status.active = false ;
        } ), this ;
      } ;
      
      this.reset = function ( key, bubbling ) {
        var reg = new RegExp( typeof key === 'string' ? key && '^' + key.replace( /([.*+?^=!:${}()|[\]\/\\])/g, '\\$1' ) + '(?:$|\.)' || '^$' : '' ) ;
        return Store.redirect.call( this, key, bubbling, function ( setting ) {
          if ( reg.test( setting.nss.name ) ) {
            this.release( setting.id )[ Store.name ]( setting.option ) ;
          }
        } ), this ;
      } ;
      
      this.release = function ( key, bubbling ) {
        return Store.redirect.call( this, key, bubbling, function ( setting ) {
          Store.terminate( setting ) ;
        } ), this ;
      } ;
      
      this.vtrigger = function ( key, bubbling, layer ) {
        var keys ;
        keys = typeof key === 'string' ? key.split( /,\s*/ ) : [ key ] ;
        for ( var i = 0, len = keys.length ; i < len ; i++ ) {
          key = keys[ i ] ;
          Store.redirect.call( this, key, bubbling, function ( setting, layer ) {
            jQuery( setting.context ).trigger( Store.name + ( setting.nss.name ? '.' + setting.nss.name : '' ), [ layer ] ) ;
          } ) ;
        }
        return this ;
      } ;
    },
    registrate: function ( jQuery, window, document, undefined, Store, setting ) {
      
      var $context, settings, $relations, ids ;
      $context = this ;
      ids = Store.ids ;
      settings = Store.settings ;
      
      var $win, $doc, $windoc ;
      $win = jQuery( window) ;
      $doc = jQuery( document ) ;
      $windoc = $win.add( $doc ) ;
      
      var fn, args, option ;
      fn = arguments.callee ;
      args = [].slice.call( arguments ) ;
      option = setting.reset ;
      
      for ( var i = 0 ; i < 2 ; i++ ) {
        $context = $context[ i ] === window ? $context.not( window ).add( document ) : $context ;
      }
      
      for ( var i = 0, $element, element ; element = $context[ i ] ; i++ ) {
        $element = jQuery( element )[ Store.name ]() ;
        if ( setting.terminate && !$element.find( setting.trigger )[0] ) { return ; }
        
        if ( !Store.search.call( $element, setting.nss.name, function ( setting ) {
          switch ( setting.reset && typeof setting.reset || setting.reset ) {
            case 'boolean':
              this.release( setting.nss.name ) ;
              return true ;
            case 'object':
              Store.redirect.call( $element, setting.nss.name, false, function ( setting ) {
                jQuery.extend( true, setting, setting.reset ) ;
              } ) ;
              return false;
            default :
              return false;
          }
        } ) ) {
          continue ;
        }
        
        setting = jQuery.extend( true, {}, setting ) ;
        setting.id = settings.length ;
        setting.context = element ;
        ids.push( setting.id ) ;
        settings[ setting.id ] = setting ;
        jQuery.data( element, setting.nss.data, setting.id ) ;
        if ( setting.root || setting.extend ) {
          $relations = Store.relations[ setting.nss.name ] ;
          if ( !$relations ) {
            Store.relations[ setting.nss.name ] = $relations = $element ;
          } else {
            Store.relations[ setting.nss.name ] = $relations = $relations.add( $element ) ;
        } } // if | if
        
        !setting.multi && $element.find( setting.trigger ).removeData( setting.nss.data_fired ) ;
        
        // custom event
        $element
        .bind( setting.nss.event, setting.id, function ( event, arg1, arg2 ) {
          
          Store.countEvent++ ;
          var setting, nativeEvent, customEvent, context, eventcontext, manual, task ;
          var fn, bubbling ;
          
          setting = Store.settings[ event.data ] ;
          context = this ;
          customEvent = event ;
          manual = true ;
          
          if ( !setting ) { return ; }
          
          switch ( arg1 && typeof arg1 || arg1 ) {
            // own method
            case 'function':
              
              fn = arg1 ;
              bubbling = arg2 ;
              !bubbling && customEvent.stopPropagation() ;
              return fn.apply( jQuery( context )[ Store.name ](), [ setting ].concat( [].slice.call( arguments, 3 ) ) ) ;
              
            // native event
            case 'object':
              
              nativeEvent = arg1 ;
              manual = false ;
              
            // own trigger
            // user trigger
            default :
              
              eventcontext = manual ? arg1 === 0 ? document
                                                 : customEvent.target
                                    : nativeEvent.target ;
              fn = arguments.callee ;
              customEvent.stopPropagation() ;
          }
          
          if ( jQuery( setting.trigger, eventcontext ).first().is( ':hidden' ) ) { return ; }
          
          task = new Task( function ( customEvent, nativeEvent, eventcontext, setting ) {
            switch ( true ) {
              case !Store.settings[ setting.id ]:
              case !setting.status.active:
                break ;
              case setting.id !== jQuery.data( customEvent.currentTarget, setting.nss.data ):
                jQuery( customEvent.currentTarget )[ Store.name ]().release( setting.id ) ;
                break ;
              default :
                Store.drive( jQuery, window, document, undefined, Store, customEvent, nativeEvent, eventcontext, setting ) ;
            }
          }, customEvent, nativeEvent, eventcontext ) ;
          
          if ( manual || !setting.delay ) {
            task = task( setting ) ;
          } else {
            var id ;
            while ( id = setting.queue.shift() ) { clearTimeout( id ) ; }
            id = setTimeout( function () {
              if ( !setting ) { return ; }
              while ( id = setting.queue.shift() ) { clearTimeout( id ) ; }
              Store.countTask++ ;
              task = setting && task( setting ) ;
            }, setting.delay ) ;
            
            setting.queue.push( id ) ;
          }
          
        } ) ;
        
        // node event
        $element.not( document )
        .bind( setting.nss.scroll, setting.id, function ( event ) {
          Store.countRedirect++ ;
          var setting = Store.settings[ event.data ] ;
          setting && setting.status.active && jQuery( event.currentTarget ).trigger( setting.nss.event, [ event ] ) ;
          event.stopPropagation() ;
        } )
        .bind( setting.nss.resize, setting.id, function ( event ) {
          Store.countRedirect++ ;
          var setting = Store.settings[ event.data ] ;
          setting && setting.status.active && jQuery( event.currentTarget ).trigger( setting.nss.event, [ event ] ) ;
          event.stopPropagation() ;
        } ) ;
        
        // root event
        if ( i > 0 ) { continue ; }
        
        // redirect
        var count = 0 ;
        $windoc.not( element )
        .bind( setting.nss.event, setting.nss.event, function ( event ) {
          Store.countRedirect++ ;
          var eventname = event.data ;
          var $context, args ;
          
          if ( event.target === window ) {
            
            jQuery( document ).trigger( eventname, [].slice.call( arguments, 1 ) ) ;
            
          } else if ( event.currentTarget === document ) {
            
            var layer = Number( Boolean( event.target !== event.currentTarget ) ) ;
            
            args = [].slice.call( arguments, 1 ) ;
            switch ( typeof args[ 0 ] ) {
              // native event
              case 'object':
                break ;
              // own method
              case 'function':
                args.push( layer ) ;
                break ;
              // own trigger
              case 'number':
                break ;
              // user trigger
              case 'undefind':
                args.push( layer ) ;
                break ;
            }
            !count++ &&
            jQuery( Store.relations[ eventname.replace( /^\w+\.?/, '' ) || '' ] ).filter( layer ? event.target : '*' ).not( document ).trigger( eventname, args ) ;
            count-- ;
          }
          event.stopPropagation() ;
        } ) ;
        
        // alias
        setting.nss.alias &&
        $windoc
        .bind( setting.nss.alias, setting.nss.event, function ( event ) {
          Store.countRedirect++ ;
          var eventname = event.data ;
          jQuery( event.target ).trigger( eventname, [].slice.call( arguments, 1 ) ) ;
          event.stopPropagation() ;
        } ) ;
        
        // extend
        ( setting.root || setting.extend ) &&
        $win
        .bind( setting.nss.scroll, setting.nss.event, function ( event ) {
          Store.countRedirect++ ;
          var eventname = event.data ;
          jQuery( event.currentTarget ).trigger( eventname, [ event ] ) ;
          event.stopPropagation() ;
        } )
        .bind( setting.nss.resize, setting.nss.event, function ( event ) {
          Store.countRedirect++ ;
          var eventname = event.data ;
          jQuery( event.currentTarget ).trigger( eventname, [ event ] ) ;
          event.stopPropagation() ;
        } ) ;
      }
    },
    drive: function ( jQuery, window, document, undefined, Store, customEvent, nativeEvent, eventcontext, setting, info ) {
      
      Store.countDrive++ ;
      var $context, $eventcontext, layer,  fire, increment, call, targets, target, evtScroll, evtHeight, direction, distance ;
      
      info = info || {} ;
      $context = info.context = info.update ? info.context : jQuery( customEvent.currentTarget ) ;
      $eventcontext = info.eventcontext = info.update ? info.eventcontext : jQuery( eventcontext ) ;
      root = info.root = info.update ? info.root : !$context.parent()[0] ;
      layer = info.layer = info.update ? info.layer : Number( Boolean( $eventcontext.parent()[0] ) ) ;
      fire = false ;
      increment = false ;
      call = false ;
      targets = info.targets = info.update && setting.step ? info.targets : $context.find( setting.trigger ) ;
      targets = info.targets = setting.index >= 0 || targets.length > setting.index ? info.targets : $context.find( setting.trigger ) ;
      evtScroll = info.evtScroll = info.update ? info.evtScroll : $eventcontext.scrollTop() ;
      evtHeight = info.evtHeight = info.update ? info.evtHeight : setting.height[ layer ] ;
      direction = info.direction = info.update ? info.direction : evtScroll === evtHeight ? setting.direction : evtScroll < evtHeight ? -1 : 1 ;
      distance = info.distance = info.update ? info.distance : Math.abs( evtScroll - evtHeight ) ;
      target = targets.eq( setting.index ) ;
      
      if ( setting.direction !== direction ) {
        setting.turn = true ;
        setting.end = false ;
        setting.direction = direction ;
        setting.index = setting.index < 0 ? 0 : targets.length <= setting.index ? targets.length - 1 : setting.index ;
        target = targets.eq( setting.index ) ;
      }
      setting.distance = distance === 0 ? setting.distance : distance ;
      setting.height[ layer ] = evtScroll ;
      
      switch ( true ) {
        case setting.index < 0 || targets.length <= setting.index:
          break ;
          
        case !targets.length || !target[0]:
          break ;
          
        default:
          
          var $win, winTop, winHeight, winBottom,
              $frame, frameTop, frameHeight, frameBottom,
              tgtTop, tgtHeight, tgtBottom,
              visibleTop, visibleBottom ;
          
          $win = info.$win = info.update ? info.$win : jQuery( window ) ;
          winTop = info.winTop = info.update ? info.winTop : $win.scrollTop() ;
          winHeight = info.winHeight = info.update ? info.winHeight : $win.height() ;
          winBottom = winTop + winHeight ;
          
          var aheadIndex, aheadTop, aheadBottom, ahead,
              topin, topout, topover,
              bottomin, bottomout, bottomover ;
          
          aheadIndex = Math.max( 0, setting.direction ) ;
          aheadTop = info.aheadTop = info.update ? info.aheadTop : -1 <= setting.ahead[ 0 ] && setting.ahead[ 0 ] <= 1 ? parseInt( winHeight * setting.ahead[ 0 ], 10 ) : parseInt( setting.ahead[ 0 ], 10 ) ;
          aheadBottom = info.aheadBottom = info.update ? info.aheadBottom : -1 <= setting.ahead[ 1 ] && setting.ahead[ 1 ] <= 1 ? parseInt( winHeight * setting.ahead[ 1 ], 10 ) : parseInt( setting.ahead[ 1 ], 10 ) ;
          ahead = aheadIndex ? aheadBottom : aheadTop ;
          
          
          $frame = $context ;
          if ( setting.root ) {
            frameTop = info.frameTop = info.update ? info.frameTop : winTop ;
            frameHeight = info.frameHeight = info.update ? info.frameHeight : winHeight ;
            frameBottom = frameTop + frameHeight ;
          } else {
            frameTop = info.frameTop = info.update ? info.frameTop : parseInt( $frame.offset().top, 10 ) ;
            frameHeight = info.frameHeight = info.update ? info.frameHeight : $frame.outerHeight() ;
            frameBottom = frameTop + frameHeight ;
          }
          
          visibleTop = info.visibleTop = info.update ? info.visibleTop : Math.max( frameTop, winTop ) ;
          visibleBottom = info.visibleBottom = info.update ? info.visibleBottom : Math.min( frameBottom, winBottom ) ;
          
          tgtTop = parseInt( target.offset().top, 10 ) ;
          tgtHeight = target.outerHeight() ;
          tgtBottom = tgtTop + tgtHeight ;
          
          topin = visibleBottom >= tgtTop - aheadBottom ;
          bottomin = visibleTop <= tgtBottom + aheadTop ;
          
          call = setting.direction === 1 ? topin : bottomin ;
          switch ( true ) {
            case !layer ? visibleTop > frameBottom + ahead || visibleBottom < frameTop - ahead : false:
              call = setting.direction === 1 ? visibleTop > frameBottom && frameBottom >= tgtTop - aheadBottom
                                             : visibleBottom < frameTop && frameTop <= tgtBottom + aheadTop ;
              break ;
            case setting.first && setting.beforehand > setting.index && ( setting.multi || !jQuery.data( target[ 0 ], setting.nss.data_fired ) ):
              // beforehand
              if ( setting.beforehand > setting.index ) {
                fire = call = true ;
              } else {
                setting.beforehand = 0 ;
              }
              break ;
            case !setting.skip && !setting.multi:
              // !skip
              fire = setting.direction === 1 ? topin : bottomin ;
              break ;
            case setting.skip && !setting.multi:
              // skip
              fire = topin && bottomin ;
              break ;
            case !setting.skip && setting.multi:
              // !skip
              fire = setting.direction === 1 ? topin : bottomin ;
              // multi
              if ( !setting.first && ( !nativeEvent || nativeEvent.type !== 'resize' ) ) {
                fire = setting.direction === 1 ? ( ( !layer ? winBottom > tgtTop + setting.distance - ahead : visibleBottom > tgtTop + setting.distance - ahead ) ? false : fire )
                                               : ( ( !layer ? winTop < tgtBottom - setting.distance + ahead : visibleTop < tgtBottom - setting.distance + ahead ) ? false : fire ) ;
              }
              break ;
            case setting.skip && setting.multi:
              // skip
              fire = topin && bottomin ;
              // multi
              if ( !setting.first && ( !nativeEvent || nativeEvent.type !== 'resize' ) ) {
                fire = setting.direction === 1 ? ( ( !layer ? winBottom > tgtTop + setting.distance - ahead : visibleBottom > tgtTop + setting.distance - ahead ) ? false : fire )
                                               : ( ( !layer ? winTop < tgtBottom - setting.distance + ahead : visibleTop < tgtBottom - setting.distance + ahead ) ? false : fire ) ;
              }
              break ;
          }
          increment = setting.step ? setting.step * setting.direction : fire ? setting.direction === -1 && -1 || 0 : setting.direction ;
          
          if ( fire && !setting.multi ) {
            fire = target[ 0 ] && jQuery.data( target[ 0 ], setting.nss.data_fired ) ? false : fire ;
            fire = setting.turn && !info.recursion ? false : fire ;

          }
          break ;
      }
      
      if ( fire ) {
        if ( setting.interval ) {
          var now = ( new Date() ).getTime() ;
          if ( setting.interval <= now - setting.timestamp ) {
            setting.timestamp = now ;
          } else {
            var task = new Task( function ( customEvent, nativeEvent, setting ) {
              jQuery( customEvent.currentTarget ).trigger( setting.nss.event, [ nativeEvent ] ) ;
            }, customEvent, nativeEvent ) ;
            
            id = setTimeout( function () {
              task = setting && task( setting ) ;
            }, Math.max( setting.interval - now + setting.timestamp, 50 ) ) ;
            setting.queue.push( id ) ;
            
            return true ;
        } } // if | if
        
        Store.countCallback++ ;
        !setting.multi && ++setting.count && jQuery.data( target[ 0 ], setting.nss.data_fired, setting.id ) ;
        false === setting.callback.apply( target[ 0 ], [
          customEvent,
          nativeEvent,
          {
            contaner: $context[ 0 ],
            activator: eventcontext,
            selector: setting.trigger,
            index: setting.index,
            direction: setting.direction,
            distance: setting.distance,
            relations: setting.root || setting.extend ? Store.relations[ setting.nss.name ] : null,
            parameter: setting.parameter
          }
        ] ) &&
        !setting.multi && setting.count-- && jQuery.removeData( target[ 0 ], setting.nss.data_fired ) && ( fire = false ) ;
      }
      
      if ( setting.terminate && ( !targets.length || setting.step && setting.count >= targets.length ) ) {
        $context[ Store.name ]().release( setting.id ) ;
        return true;
      }
      
      setting.index += call ? increment : 0 ;
      
      info.update = info.update || setting.cache ;
      if ( !info.recursion ) {
        info.recursion = true ;
        call && arguments.callee.apply( this, [].slice.call( arguments ).concat( [ info ] ) ) ;
      } else {
        call && arguments.callee.apply( this, arguments ) ;
      }
      
      setting.first = false ;
      setting.turn = false ;
      info.recursion = false ;
      return true ;
    },
    terminate: function ( setting ) {
      var $context, context, settings, $relations ;
      
      context = setting.context ;
      $context = jQuery( context ) ;
      
      jQuery.removeData( context, setting.nss.data ) ;
      !setting.multi && $context.find( setting.trigger ).removeData( setting.nss.data_fired ) ;
      
      $context
      .unbind( setting.nss.event )
      .unbind( setting.nss.scroll )
      .unbind( setting.nss.resize ) ;
      
      if ( setting.root || setting.extend ) {
        settings = Store.settings ;
        $relations = Store.relations[ setting.nss.name ] ;
        Store.relations[ setting.nss.name ] = $relations = $relations.not( $context ) ;
        if ( !$relations[0] ) {
          jQuery( window )
          .unbind( setting.nss.scroll )
          .unbind( setting.nss.resize )
          .add( document )
          .unbind( setting.nss.event )
          .unbind( setting.nss.alias ) ;
        }
      } else {
        $relations = [] ;
      }
      
      ids = Store.ids ;
      for ( var i = ids.length ; id = ids[ --i ] ; ) {
        if ( id === setting.id ) {
          ids.splice( i, 1 ) ;
          Store.settings[ id ] = undefined ;
          break ;
      } } // if | for
    }
  } ;
  
  registrate.apply( this, [].slice.call( arguments ).concat( [ Store ] ) ) ;
} ) ( jQuery, window, document, void 0 ) ;
