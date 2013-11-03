/*
 * 
 * displaytrigger
 * 
 * ---
 * @Copyright(c) 2012, falsandtru
 * @license MIT  http://opensource.org/licenses/mit-license.php  http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 * @version 1.5.1
 * @updated 2013/11/03
 * @author falsandtru https://github.com/falsandtru/
 * @CodingConventions Google JavaScript Style Guide
 * ---
 * Note:
 * 
 * ---
 * Example:
 * @jquery 1.7.2
 * 
 * $.displaytrigger( {
 *   trigger : 'img[data-origin]',
 *   callback : function(){ $( this ).attr( 'src', $( this ).attr( 'data-origin' ) ) },
 *   ahead : 300,
 *   beforehand : 1
 * } ).trigger( 'displaytrigger' ) ;
 * 
 * ---
 * Document:
 * http://sa-kusaku.sakura.ne.jp/output/displaytrigger/
 * 
 */

( function ( jQuery ) {
  
  var win = window, doc = document, undefined = void( 0 ), plugin_data = [ 'settings' ] ;
  
  jQuery.fn.displaytrigger = jQuery.displaytrigger = function ( options ) {
    
    if ( typeof this === 'function' ) { return arguments.callee.apply( jQuery( win ), arguments ) ; }
    
    /* validate */ var validate = window.validator instanceof Object ? window.validator.clone( { name : 'jquery.displaytrigger.js', base : true } ) : false ;
    /* validate */ validate && validate.start() ;
    /* validate */ validate && validate.test( '++', 1, options, 'displaytrigger()' ) ;
    
    /* validate */ validate && validate.test( '++', 1, 0, 'initialize' ) ;
    var defaults = {
          id : 0,
          gns : 'displaytrigger',
          ns : undefined,
          trigger : undefined,
          callback : function () {},
          parameter : [],
          ahead : 0,
          beforehand: 0,
          step : 1,
          multi : false,
          skip : false,
          expand : true,
          delay : 300,
          suspend : -100,
          mode : 'show',
          terminate : true
        },
        settings = jQuery.extend( true, {}, defaults, options ),
        nsArray = [ settings.gns ].concat( settings.ns || [] ) ;
    
    /* validate */ validate && validate.test( '++', 1, 0, 'overwrite' ) ;
    jQuery.extend
    (
      true,
      settings,
      {
        nss : {
          displaytrigger : nsArray.join( '.' ),
          scroll : [ 'scroll' ].concat( nsArray.join( ':' ) ).join( '.' ),
          resize : [ 'resize' ].concat( nsArray.join( ':' ) ).join( '.' ),
          data : nsArray.join( ':' ),
          array : nsArray
        },
        window: this[ 0 ] === win,
        context: this,
        scope : this[ 0 ] === win ? jQuery( doc ) : jQuery( this ),
        ahead : typeof settings.ahead in { string:0, number:0 } ? [ settings.ahead, settings.ahead ] : undefined,
        suspend : 1 <= settings.suspend ? settings.suspend : 0 <= settings.suspend ? parseInt( settings.delay * settings.suspend ) : Math.max( 0, settings.delay + settings.suspend ),
        index : 0,
        length : 0,
        count : 0,
        height : {},
        direction : 1,
        distance : 0,
        turn : false,
        end : false,
        queue : [],
        options : options,
        validate : validate
      }
    ) ;
    
    
    /* validate */ validate && validate.test( '++', 1, 0, 'register' ) ;
    if ( settings.scope.length && settings.scope.find( settings.trigger ).length && arguments.length ) { register( settings ) ; }
    
    /* validate */ validate && validate.end() ;
    
    return this ;
    
    
    /* function */
    
    function register( settings ) {
      
      for ( var i = 0, element ; element = settings.context[ i ] ; i++ ) {
        
        settings.id = plugin_data.length ;
        settings.height = [ 0, 0 ] ;
        plugin_data.push( jQuery.extend( true, {}, settings ) ) ;
        
        // custom event
        jQuery( element )
        .unbind( settings.nss.displaytrigger )
        .bind( settings.nss.displaytrigger, settings.id, function ( event, context, end ) {
          var settings = plugin_data[ event.data ],
              id,
              scrollcontext = context,
              displaytriggercontext = this,
              fn = arguments.callee ;
          
          if ( !settings ) { return ; }
          
          if ( !settings.delay || !context ) {
            drive( event, settings, displaytriggercontext, scrollcontext || win ) ;
          } else {
            while ( id = settings.queue.shift() ) { clearTimeout( id ) ; }
            id = setTimeout( function () {
              if ( !settings ) { return ; }
              while ( id = settings.queue.shift() ) { clearTimeout( id ) ; }
              drive( event, settings, displaytriggercontext, scrollcontext || win ) ;
            }, settings.delay ) ;
            
            settings.queue.push( id ) ;
          }
          
          if ( settings.suspend && !end ) {
            jQuery( this ).unbind( settings.nss.displaytrigger ) ;
            setTimeout( function () {
              settings && jQuery( displaytriggercontext ).bind( settings.nss.displaytrigger, settings.id, fn ).trigger( settings.nss.displaytrigger, [ scrollcontext, true ] ) ;
            }, settings.suspend ) ;
          }
          
        } ) ;
        
        // node original event
        jQuery.data( element, settings.nss.data, settings.id ) ;
        
        jQuery( element )
        .unbind( settings.nss.scroll )
        .bind( settings.nss.scroll, settings.id, function ( event ) {
          var settings = plugin_data[ event.data ] ;
          settings && jQuery( this ).trigger( settings.nss.displaytrigger, [ this ] ) ;
        } )
        .unbind( settings.nss.resize )
        .bind( settings.nss.resize, settings.id, function ( event ) {
          var settings = plugin_data[ event.data ] ;
          settings && jQuery( this ).trigger( settings.nss.displaytrigger, [ this ] ) ;
        } ) ;
      
        // root original event
        if ( i !== 0 ) { continue ; }
        
        jQuery( win )
        .filter( function () { return !settings.window && settings.expand ; } )
        .unbind( settings.nss.scroll )
        .bind( settings.nss.scroll, settings.id, function ( event ) {
          var settings = plugin_data[ event.data ] ;
          settings && settings.context.trigger( settings.nss.displaytrigger, [ this ] ) ;
        } )
        .unbind( settings.nss.resize )
        .bind( settings.nss.resize, settings.id, function ( event ) {
          var settings = plugin_data[ event.data ] ;
          settings && settings.context.trigger( settings.nss.displaytrigger, [ this ] ) ;
        } ) ;
      }
    }
    
    function drive( event, settings, displaytriggercontext, scrollcontext ) {
      /* validate */ var validate = settings.validate ? settings.validate.clone( { name : 'jquery.displaytrigger.js - drive()' } ) : false ;
      /* validate */ validate && validate.start() ;
      /* validate */ validate && ( validate.scope = function( code ){ return eval( code ) ; } ) ;
      /* validate */ validate && validate.test( '++', 1, [ settings, window === scrollcontext ], 'drive()' ) ;
      
      /* validate */ validate && validate.test( '++', 1, 0, 'initialize' ) ;
      var win = window,
          doc = document,
          area = settings.window ? doc : displaytriggercontext,
          fire = false,
          targets = jQuery( settings.trigger, area ),
          target = targets.eq( settings.index ),
          cs = jQuery( scrollcontext ).scrollTop(),
          ch = settings.height[ Number( scrollcontext === win ) ],
          direction = cs === ch ? settings.direction : cs < ch ? -1 : 1,
          distance = Math.abs( cs - ch ) ;
      
      /* validate */ validate && validate.test( '++', 1, 0, 'setting' ) ;
      if ( settings.id !== jQuery.data( displaytriggercontext, settings.nss.data ) ) { return plugin_data[ settings.id ] = undefined ; }
      if ( settings.direction !== direction ) {
        settings.turn = true ;
        settings.end = false ;
        settings.direction = direction ;
        settings.index = settings.index < 0 ? 0 : targets.length <= settings.index ? targets.length - 1 : settings.index ;
        target = targets.eq( settings.index ) ;
      }
      settings.distance = distance === 0 ? settings.distance : distance ;
      settings.height[ Number( scrollcontext === win ) ] = cs ;
      settings.end = target[ 0 ] ? false : settings.end ;
      
      if ( settings.direction === -1 && settings.length < targets.length ) { settings.turn = false ; settings.end = false ; }
      settings.length = targets.length ;
      
      /* validate */ validate && validate.test( '++', 1, settings, 'switch' ) ;
      switch ( true ) {
        case !targets.length :
          /* validate */ validate && validate.test( '*', 1, 0, 'case !targets.length' ) ;
          break ;
          
        case settings.step === 0 && !target[ 0 ] :
          /* validate */ validate && validate.test( '*', 1, 0, 'case settings.step === 0 && !target[ 0 ]' ) ;
          settings.index += -1 ;
          /* validate */ validate && validate.end() ;
          return ;
          
        case settings.index < 0 :
          /* validate */ validate && validate.test( '*', 1, 0, 'case settings.index < 0' ) ;
          settings.index = 0 ;
          settings.end = true ;
          break ;
          
        case targets.length <= settings.index :
          /* validate */ validate && validate.test( '*', 1, 0, 'case targets.length <= settings.index' ) ;
          settings.index = targets.length - 1 ;
          settings.end = true ;
          break ;
          
        case settings.beforehand > settings.index && ( settings.multi || !settings.skip || !jQuery.data( target[ 0 ], settings.nss.data + '-fired' ) ) :
          /* validate */ validate && validate.test( '*', 1, 0, 'case settings.beforehand > settings.index &&' ) ;
          if ( settings.beforehand === settings.index + 1 ) { settings.beforehand = 0 ; }
          fire = true ;
          break ;
          
        default :
          /* validate */ validate && validate.test( '*', 1, 0, 'default' ) ;
          if ( settings.end || target.is( ':hidden' ) || !settings.multi && settings.skip && jQuery.data( target[ 0 ], settings.nss.data + '-fired' ) ) { break ; }
          
          /* validate */ validate && validate.test( '++', 1, 0, 'initialize' ) ;
          var wj = jQuery( win ),
              ws = wj.scrollTop(),
              wt = 0,
              wh = wj.height(),
              dj = jQuery( displaytriggercontext ),
              //ds = dj.scrollTop(),
              dt = settings.window ? wt : dj.offset().top,
              dh = settings.window ? wh : dj.outerHeight( true ),
              tt = target.offset().top,
              th = target.outerHeight( true ),
              aheadIndex = Math.max( 0, settings.direction ),
              aheadTop = -1 <= settings.ahead[ 0 ] && settings.ahead[ 0 ] <= 1 ? parseInt( wh * settings.ahead[ 0 ] ) : parseInt( settings.ahead[ 0 ] ),
              aheadBottom = -1 <= settings.ahead[ 1 ] && settings.ahead[ 1 ] <= 1 ? parseInt( wh * settings.ahead[ 1 ] ) : parseInt( settings.ahead[ 1 ] ),
              ahead = aheadIndex ? aheadBottom : aheadTop,
              topin,
              topout,
              topover,
              bottomin,
              bottomout,
              bottomover ;
          
          /* validate */ validate && validate.test( '++', 1, settings.mode, 'check' ) ;
          switch ( settings.mode ) {
            case 'border' :
              var border = ws + ( settings.direction === 1 ? -ahead : wh + ahead ) ;
              topin = border >= tt ;
              bottomin = border <= tt + th ;
              
              /* validate */ validate && validate.test( '++', 1, [ border, topin, bottomin ], 'border' ) ;
              fire = settings.turn && ( settings.direction === 1 ? border - settings.distance > tt : border + settings.distance < tt + th )
                     ? false
                     : settings.skip ? topin && bottomin
                                     : settings.direction === 1 ? topin
                                                                : bottomin ;
              break ;
            case 'toggle' :
              /* validate */ validate && validate.test( '++', 1, [], 'toggle' ) ;
              break ;
            case 'hide' :
              /* validate */ validate && validate.test( '++', 1, [], 'hide' ) ;
              break ;
            case 'show' :
            default :
              topin = wh + ws >= tt - aheadBottom && ( settings.window ? true : dt + dh >= tt - aheadBottom ) ;
              topover = settings.window || scrollcontext !== win ? false : topin && dt > tt + th + aheadTop ;
              //topout = ws < tt - wh - ahead ;
              bottomin = ws <= tt + th + aheadTop && ( settings.window ? true : dt <= tt + th + aheadTop ) ;
              bottomover = settings.window || scrollcontext !== win ? false : bottomin && dt + dh < tt - aheadBottom ;
              //bottomout = ws > tt + th + ahead ;
              
              /* validate */ validate && validate.test( '++', 1, [ topin, topover, bottomin, bottomover ], 'show' ) ;
              fire = settings.turn && settings.multi && ( settings.direction === 1 ? ws - settings.distance + wh > tt - ahead : ws + settings.distance < tt + th + ahead )
                     ? false
                     : settings.skip ? topin && bottomin
                                     : settings.direction === 1 ? topin && !topover
                                                                : bottomin && !bottomover && settings.multi ;
          }
      }
      
      /* validate */ validate && validate.test( '/', 1, fire, 'fire' ) ;
      if ( fire ) {
        !settings.multi && ++settings.count && settings.skip && jQuery.data( target[ 0 ], settings.nss.data + '-fired', settings.id ) ;
        false === settings.callback.apply( target[ 0 ], [ event, settings.parameter, { index : settings.index, length : targets.length, direction : settings.direction } ] ) &&
        !settings.multi && settings.count-- && settings.skip && jQuery.removeData( target[ 0 ], settings.nss.data + '-fired' ) && ( fire = false ) ;
      }
      
      /* validate */ validate && validate.test( '++', 1, 0, 'terminate' ) ;
      if ( !targets.length || settings.terminate && !settings.multi && settings.step !== 0 && settings.count >= targets.length ) {
        
        var remainder = 0 ;
        
        /* validate */ validate && validate.test( '*', 1, 0, 'unbind node event' ) ;
        jQuery( displaytriggercontext ).unbind( settings.nss.displaytrigger ).unbind( settings.nss.scroll ).unbind( settings.nss.resize ) ;
        /* validate */ validate && validate.test( '++', 1, 0, 'remove data' ) ;
        jQuery.removeData( area, settings.nss.data ) ;
        !settings.multi && settings.skip && targets.removeData( settings.nss.data + '-fired' ) ;
        
        for ( var i = 0, element ; element = settings.context[ i ] ; i++ ) { remainder += jQuery.data( element, settings.nss.data ) ? 1 : 0 ; }
        /* validate */ validate && validate.test( '++', 1, 0, 'unbind root event' ) ;
        !remainder && !settings.window && settings.expand && jQuery( win ).unbind( settings.nss.scroll ).unbind( settings.nss.resize ) ;
        
        /* validate */ validate && validate.end() ;
        return plugin_data[ settings.id ] = undefined ;
      }
      
      /* validate */ validate && validate.test( '++', 1, 0, 'exit' ) ;
      if ( !settings.end && !fire && isFinite( ahead ) && ( settings.direction === 1 ? !topin : !bottomin ) ) {
        /* validate */ validate && validate.end() ;
        return settings.turn = false ;
      }
      
      /* validate */ validate && validate.test( '++', 1, 0, 'increment' ) ;
      settings.index += settings.step === 0 && !fire ? settings.direction
                                                     : settings.step === 0 && settings.direction === -1 ? settings.direction
                                                                                                        : settings.step * settings.direction ;
      
      /* validate */ validate && validate.end() ;
      settings.end || arguments.callee.apply( this, arguments ) ;
    }
  }
} )( jQuery ) ;
