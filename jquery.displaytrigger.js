/*
 * 
 * displaytrigger
 * 
 * ---
 * @Copyright(c) 2012, falsandtru
 * @license MIT  http://opensource.org/licenses/mit-license.php  http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 * @version 1.4.3
 * @updated 2013/08/25
 * @author falsandtru https://github.com/falsandtru/
 * @CodingConventions Google JavaScript Style Guide
 * ---
 * Note: 
 * 
 * ---
 * Example:
 * @jquery 1.7.2
 * 
 * $.displaytrigger(
 * {
 *   trigger : 'img[data-origin]' ,
 *   callback : function(){ $( this ).attr( 'src' , $( this ).attr( 'data-origin' ) ) } ,
 *   ahead : 300 ,
 *   beforehand : 1
 * } ).trigger( 'displaytrigger' ) ;
 * 
 * ---
 * Document:
 * http://sa-kusaku.sakura.ne.jp/output/displaytrigger/
 * 
 */

( function () {
  
  if ( typeof window.jQuery === 'undefined' ) { return ; } ;
  
  var $ = jQuery = window.jQuery , undefined = void( 0 ) , win = window , doc = document , plugin_data = [ 'settings' ] ;
  
  jQuery.fn.displaytrigger = displaytrigger ;
  jQuery.displaytrigger = displaytrigger ;
  displaytrigger = null ;
  
  
  function displaytrigger( options ) {
    
    if ( typeof this === 'function' ) { return arguments.callee.apply( jQuery( win ) , arguments ) ; } ;
    
    /* validate */ var validate = window.validator instanceof Object ? window.validator : false ;
    /* validate */ var validate = validate ? validate.clone( { name : 'jquery.displaytrigger.js' , base : true } ) : validate ;
    /* validate */ validate && validate.start() ;
    /* validate */ validate && validate.test( '++', 1, 0, 'displaytrigger()' ) ;
    
    var defaults = {
          id : 0 ,
          gns : 'displaytrigger' ,
          ns : undefined ,
          trigger : undefined ,
          callback : function () {} ,
          parameter : [] ,
          ahead : 0 ,
          beforehand: 0 ,
          step : 1 ,
          multi : false ,
          skip : false ,
          expand : true ,
          delay : 300 ,
          suspend : -100 ,
          mode : 'show' ,
          terminate : true
        } ,
        settings = jQuery.extend( true , {} , defaults , options ) ,
        nsArray = [ settings.gns ].concat( settings.ns || [] ) ;
    
    jQuery.extend
    (
      true ,
      settings ,
      {
        nss : {
          displaytrigger : nsArray.join( '.' ) ,
          scroll : [ 'scroll' ].concat( nsArray.join( ':' ) ).join( '.' ) ,
          resize : [ 'resize' ].concat( nsArray.join( ':' ) ).join( '.' ) ,
          data : nsArray.join( ':' ) ,
          array : nsArray
        } ,
        window: this[ 0 ] === win ,
        context: this ,
        scope : this[ 0 ] === win ? jQuery( doc ) : jQuery( this ) ,
        ahead : typeof settings.ahead in { string:0 , number:0 } ? [ settings.ahead , settings.ahead ] : undefined ,
        suspend : 1 <= settings.suspend ? settings.suspend : 0 <= settings.suspend ? parseInt( settings.delay * settings.suspend ) : Math.min( 0 , settings.delay + settings.suspend ) ,
        index : 0 ,
        length : 0 ,
        count : 0 ,
        height : {} ,
        direction : 1 ,
        distance : 0 ,
        turn : false ,
        end : false ,
        queue : []
      }
    ) ;
    
    
    if ( settings.scope.length && settings.scope.find( settings.trigger ).length && arguments.length ) { register( settings ) ; } ;
    
    /* validate */ validate && validate.end() ;
    
    return this ;
    
    
    /* function */
    
    function register( settings ) {
      
      for ( var i = 0 , element ; element = settings.context[ i ] ; i++ ) {
        
        settings.id = plugin_data.length ;
        settings.height.window = 0 ;
        settings.height.element = 0 ;
        plugin_data.push( jQuery.extend( true , {} , settings ) ) ;
        
        // custom event
        jQuery( element )
        .unbind( settings.nss.displaytrigger )
        .bind( settings.nss.displaytrigger , settings.id , function ( event , context , end ) {
          var settings = plugin_data[ event.data ] ,
              id ,
              scrollcontext = context ,
              displaytriggercontext = this ,
              fn = arguments.callee ;
          
          if ( !settings ) { return ; } ;
          
          if ( !settings.delay || !context ) {
            drive( event , settings , displaytriggercontext , scrollcontext || win ) ;
          } else {
            while ( id = settings.queue.shift() ) { clearTimeout( id ) ; } ;
            id = setTimeout( function () {
              if ( !settings ) { return ; } ;
              while ( id = settings.queue.shift() ) { clearTimeout( id ) ; } ;
              drive( event , settings , displaytriggercontext , scrollcontext || win ) ;
            } , settings.delay ) ;
            
            settings.queue.push( id ) ;
          } ;
          
          if ( settings.suspend && !end ) {
            jQuery( this ).unbind( settings.nss.displaytrigger ) ;
            setTimeout( function () {
              settings && jQuery( this ).bind( settings.nss.displaytrigger , settings.id , fn ).trigger( settings.nss.displaytrigger , [ context , true ] ) ;
            } , settings.suspend ) ;
          } ;
          
        } ) ;
        
        // node original event
        jQuery.data( element , settings.nss.data , true ) ;
        
        jQuery( element )
        .unbind( settings.nss.scroll )
        .bind( settings.nss.scroll , settings.id , function ( event ) {
          var settings = plugin_data[ event.data ] ;
          settings && jQuery( this ).trigger( settings.nss.displaytrigger , [ this ] ) ;
        } )
        .unbind( settings.nss.resize )
        .bind( settings.nss.resize , settings.id , function ( event ) {
          var settings = plugin_data[ event.data ] ;
          settings && jQuery( this ).trigger( settings.nss.displaytrigger , [ this ] ) ;
        } ) ;
      
        // root original event
        if ( i !== 0 ) { continue ; } ;
        
        jQuery( win )
        .filter( function () { return !settings.window && settings.expand ; } )
        .unbind( settings.nss.scroll )
        .bind( settings.nss.scroll , settings.id , function ( event ) {
          var settings = plugin_data[ event.data ] ;
          settings && settings.context.trigger( settings.nss.displaytrigger , [ this ] ) ;
        } )
        .unbind( settings.nss.resize )
        .bind( settings.nss.resize , settings.id , function ( event ) {
          var settings = plugin_data[ event.data ] ;
          settings && settings.context.trigger( settings.nss.displaytrigger , [ this ] ) ;
        } ) ;
      } ;
    }
    
    function drive( event , settings , displaytriggercontext , scrollcontext ) {
      var win = window ,
          doc = document ,
          area = settings.window ? doc : displaytriggercontext ,
          fire = false ,
          targets = jQuery( settings.trigger , area ) ,
          target = targets.eq( settings.index ) ,
          cs = jQuery( scrollcontext ).scrollTop() ,
          ch = settings.height[ scrollcontext === win ? 'window' : 'element' ] ,
          direction = cs === ch ? settings.direction : cs < ch ? -1 : 1 ,
          distance = Math.abs( cs - ch ) ;
      
      if ( settings.direction !== direction ) {
        settings.turn = true ;
        settings.end = false ;
        settings.direction = direction ;
        settings.index = settings.index < 0 ? 0 : targets.length <= settings.index ? targets.length - 1 : settings.index ;
        target = targets.eq( settings.index ) ;
      } ;
      settings.distance = distance === 0 ? settings.distance : distance ;
      settings.height[ scrollcontext === win ? 'window' : 'element' ] = cs ;
      settings.end = target[ 0 ] ? false : settings.end ;
      
      if ( settings.direction === -1 && settings.length < targets.length ) { settings.turn = false ; settings.end = false ; } ;
      settings.length = targets.length ;
      
      switch ( true ) {
        case !targets.length :
          break ;
          
        case settings.step === 0 && !target[ 0 ] :
          settings.index += -1 ;
          return ;
          
        case settings.index < 0 :
          settings.index = 0 ;
          settings.end = true ;
          break ;
          
        case targets.length <= settings.index :
          settings.index = targets.length - 1 ;
          settings.end = true ;
          break ;
          
        case settings.beforehand > settings.index && ( settings.multi || !settings.skip || !jQuery.data( target[ 0 ] , settings.nss.data + '-fired' ) ) :
          if ( settings.beforehand === settings.index + 1 ) { settings.beforehand = 0 ; } ;
          fire = true ;
          break ;
          
        default :
          if ( settings.end || target.is( ':hidden' ) || !settings.multi && settings.skip && jQuery.data( target[ 0 ] , settings.nss.data + '-fired' ) ) { break ; } ;
          
          var wj = jQuery( win ) ,
              ws = wj.scrollTop() ,
              wt = 0 ,
              wh = wj.outerHeight( true ) ,
              dj = jQuery( displaytriggercontext ) ,
              //ds = dj.scrollTop() ,
              dt = settings.window ? wt : dj.offset().top ,
              dh = dj.outerHeight( true ) ,
              tt = target.offset().top ,
              th = target.outerHeight( true ) ,
              aheadIndex = Math.max( 0 , settings.direction ) ,
              aheadTop = -1 <= settings.ahead[ 0 ] && settings.ahead[ 0 ] <= 1 ? parseInt( wh * settings.ahead[ 0 ] ) : parseInt( settings.ahead[ 0 ] ) ,
              aheadBottom = -1 <= settings.ahead[ 1 ] && settings.ahead[ 1 ] <= 1 ? parseInt( wh * settings.ahead[ 1 ] ) : parseInt( settings.ahead[ 1 ] ) ,
              ahead = aheadIndex ? aheadBottom : aheadTop ,
              topin ,
              topout ,
              topover ,
              bottomin ,
              bottomout ,
              bottomover ;
          
          switch ( settings.mode ) {
            case 'border' :
              var border = ws + ( settings.direction === 1 ? -ahead : wh + ahead ) ;
              topin = border >= tt ;
              bottomin = border <= tt + th ;
              
              fire = settings.turn &&
                     ( settings.direction === 1 ? border - settings.distance > tt
                                                : border + settings.distance < tt + th ) ? false
                                                                                         : settings.skip ? topin && bottomin
                                                                                                         : settings.direction === 1 ? topin
                                                                                                                                    : bottomin ;
              break ;
            case 'toggle' :
              break ;
            case 'hide' :
              break ;
            case 'show' :
            default :
              topin = wh + ws >= tt - aheadBottom && ( settings.window ? true : dt + dh >= tt - aheadBottom ) ;
              topover = settings.window ? false : topin && dt > tt + th + aheadTop ;
              //topout = ws < tt - wh - ahead ;
              bottomin = ws <= tt + th + aheadTop && ( settings.window ? true : dt <= tt + th + aheadTop ) ;
              bottomover = settings.window ? false : bottomin && dt + dh < tt - aheadBottom ;
              //bottomout = ws > tt + th + ahead ;
              
              fire = settings.turn && settings.multi &&
                     ( settings.direction === 1 ? ws - settings.distance + wh > tt - ahead
                                                : ws + settings.distance < tt + th + ahead ) ? false
                                                                                             : settings.skip ? topin && bottomin
                                                                                                             : settings.direction === 1 ? topin && !topover
                                                                                                                                        : bottomin && !bottomover && settings.multi ;
          } ;
      } ;
      
      if ( fire ) {
        !settings.multi && ++settings.count && settings.skip && jQuery.data( target[ 0 ] , settings.nss.data + '-fired' , true ) ;
        settings.callback.apply( target[ 0 ] , [ event , settings.parameter , { index : settings.index , length : targets.length , direction : settings.direction } ] ) ;
      } ;
      
      if ( !targets.length ||
           ( settings.terminate && !settings.multi && settings.step !== 0 && settings.count >= targets.length ) ) {
        
        var remainder = 0 ;
        
        jQuery( displaytriggercontext ).unbind( settings.nss.displaytrigger ).unbind( settings.nss.scroll ).unbind( settings.nss.resize ) ;
        jQuery.removeData( area , settings.nss.data ) ;
        !settings.multi && settings.skip && targets.removeData( settings.nss.data + '-fired' ) ;
        
        for ( var i = 0 , element ; element = settings.context[ i ] ; i++ ) { remainder += jQuery.data( element , settings.nss.data ) ? 1 : 0 ; } ;
        !remainder && !settings.window && settings.expand && jQuery( win ).unbind( settings.nss.scroll ).unbind( settings.nss.resize ) ;
        
        return plugin_data[ settings.id ] = undefined ;
      } ;
      
      if ( !settings.end && !fire && isFinite( ahead ) && ( settings.direction === 1 ? !topin : !bottomin ) ) { settings.turn = false ; return ; } ;
      
      settings.index += settings.step === 0 && !fire ? settings.direction
                                                     : settings.step === 0 && settings.direction === -1 ? settings.direction
                                                                                                        : settings.step * settings.direction ;
      
      settings.end || arguments.callee.apply( this , arguments ) ;
    }
  }
} )() ;
