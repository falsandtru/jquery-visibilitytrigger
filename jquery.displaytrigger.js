/*
 * 
 * displaytrigger
 * 
 * ---
 * @Copyright(c) 2012, falsandtru
 * @license MIT  http://opensource.org/licenses/mit-license.php  http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 * @version 1.2.0
 * @updated 2013/05/05
 * @author falsandtru  http://fat.main.jp/  http://sa-kusaku.sakura.ne.jp/
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
 */

( function () {
  
  if ( typeof window.jQuery === 'undefined' ) { return ; } ;
  
  var $ = jQuery = window.jQuery , undefined = void( 0 ) , win = window , doc = document , plugin_data = [ 'settings' ] ;
  
  jQuery.fn.displaytrigger = displaytrigger ;
  jQuery.displaytrigger = displaytrigger ;
  displaytrigger = null ;
  
  
  function displaytrigger( options ) {
    
    if ( typeof this === 'function' ) { return arguments.callee.apply( jQuery( win ) , arguments ) ; } ;
    
    /* validate */ var validate = typeof window.validator === 'object' ? window.validator : false ;
    /* validate */ var validate = validate ? validate.clone( { name : 'jquery.displaytrigger.js' , base : true } ) : validate ;
    /* validate */ validate && validate.start() ;
    /* validate */ validate && validate.test( 1, 1, 0, 'plugin load' ) ;
    
    var
      defaults = {
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
        mode : 'show' , // value: show/hide/toggle/ratio/border
        terminate : true ,
        reset : true
      } ,
      settings = jQuery.extend( true , {} , defaults , options ) ,
      nsArray = [ settings.gns ].concat( settings.ns || [] ) ;
    
    if ( settings.reset ) {
      jQuery.extend
      (
        true ,
        settings , {
          nss : {
            displaytrigger : nsArray.join( '.' ) ,
            scroll : [ 'scroll' ].concat( nsArray.join( ':' ) ).join( '.' ) ,
            resize : [ 'resize' ].concat( nsArray.join( ':' ) ).join( '.' ) ,
            data : nsArray.join( ':' ) ,
            array : nsArray
          } ,
          context: this ,
          scope : this[ 0 ] === win ? jQuery( doc ) : jQuery( this ) ,
          index : 0 ,
          length : 0 ,
          ahead : typeof settings.ahead in { string:1 , number:1 } ? [ settings.ahead , settings.ahead ] : settings.ahead ,
          count : 0 ,
          height : {} ,
          direction : 1 ,
          distance : 0 ,
          turn : false ,
          end : false ,
          reset : false ,
          queue : []
        }
      ) ;
    } ;
    
    
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
        .bind( settings.nss.displaytrigger , settings.id , function ( event , context ) {
          var
            settings = plugin_data[ event.data ] ,
            id ,
            scrollcontext = context ,
            displaytriggercontext = this ;
          
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
        } ) ;
        
        // node original event
        jQuery.data( element , settings.nss.data , true ) ;
        
        jQuery( element )
        .unbind( settings.nss.scroll )
        .bind( settings.nss.scroll , settings.id , function ( event ) {
          var settings = plugin_data[ event.data ] ;
          jQuery( this ).trigger( settings.nss.displaytrigger , [ this ] ) ;
        } ) ;
      
        // root original event
        if ( i !== 0 ) { continue ; } ;
        
        jQuery( win )
        .filter( function () { return settings.context[ 0 ] === win || settings.expand ; } )
        .unbind( settings.nss.resize )
        .bind( settings.nss.resize , settings.id , function ( event ) {
          var settings = plugin_data[ event.data ] ;
          settings.context.trigger( settings.nss.displaytrigger , [ this ] ) ;
        } )
        .filter( function () { return settings.context[ 0 ] !== win ; } )
        .unbind( settings.nss.scroll )
        .bind( settings.nss.scroll , settings.id , function ( event ) {
          var settings = plugin_data[ event.data ] ;
          settings.context.trigger( settings.nss.displaytrigger , [ this ] ) ;
        } ) ;
      } ;
    }
    
    function drive( event , settings , displaytriggercontext , scrollcontext ) {
      var
        area = displaytriggercontext === win ? doc : displaytriggercontext ,
        fire = false ,
        targets ,
        target ;
      
      targets = jQuery( settings.trigger , area ) ;
      target = targets.eq( settings.index ) ;
      
      var
        cs = jQuery( scrollcontext ).scrollTop() ,
        ch = settings.height[ scrollcontext === win ? 'window' : 'element' ] ,
        direction = cs === ch ? settings.direction
                              : cs < ch ? -1
                                        : 1 ,
        distance = Math.abs( cs - ch ) ;
      
      if ( settings.direction !== direction ) {
        settings.turn = true ;
        settings.end = false ;
        settings.direction = direction ;
        settings.index = settings.index < 0 ? 0
                                            : targets.length <= settings.index ? targets.length - 1
                                                                               : settings.index ;
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
          
        case settings.beforehand > settings.index && !jQuery.data( target[ 0 ] , settings.nss.data + '-fired' )  :
          fire = true ;
          break ;
          
        default :
          if ( settings.end ) { break ; } ;
          var
            wt = jQuery( win ).scrollTop() ,
            wh = jQuery( win ).height() ,
            tt = target.offset().top ,
            th = target.height() ,
            aheadIndex = ( 0 > settings.direction ? 0 : 1 ) ,
            ahead = ( -1 <= settings.ahead[ aheadIndex ] && settings.ahead[ aheadIndex ] <= 1 ? parseInt( wh * settings.ahead[ aheadIndex ] ) : parseInt( settings.ahead[ aheadIndex ] ) ) ,
            topin ,
            topout ,
            bottomin ,
            bottomout ;
          
          switch ( settings.mode ) {
            case 'ratio' :
              break ;
            case 'border' :
              var border = wt + ( settings.direction === 1 ? -ahead : wh + ahead ) ;
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
              topin = wt >= tt - wh - ahead ;
              //topout = wt < tt - wh - ahead ;
              bottomin = wt <= tt + th + ahead ;
              //bottomout = wt > tt + th + ahead ;
              
              fire = settings.turn && settings.multi &&
                     ( settings.direction === 1 ? wt - settings.distance > tt - wh - ahead
                                                : wt + settings.distance < tt + th + ahead ) ? false
                                                                                             : settings.skip ? topin && bottomin
                                                                                                             : settings.direction === 1 ? topin
                                                                                                                                        : bottomin ;
          } ;
          if ( !settings.multi && jQuery.data( target[ 0 ] , settings.nss.data + '-fired' ) ) { fire = false ; } ;
      } ;
      
      if ( fire ) {
        jQuery.data( target[ 0 ] , settings.nss.data + '-fired' , true ) ;
        settings.count += 1 ;
        settings.callback.apply( target[ 0 ] , [ event , settings.parameter , { index : settings.index , length : targets.length , direction : settings.direction } ] ) ;
      } ;
      
      if ( !targets.length ||
           ( settings.terminate && !settings.multi && settings.step !== 0 && settings.count >= targets.length ) ) {
        
        var remainder = 0 ;
        
        jQuery( displaytriggercontext ).unbind( settings.nss.displaytrigger ) ;
        jQuery( scrollcontext ).unbind( settings.nss.scroll ).unbind( settings.nss.resize ) ;
        jQuery.removeData( area , settings.nss.data ) ;
        
        for ( var i = 0 , element ; element = settings.context[ i ] ; i++ ) { remainder += jQuery.data( element , settings.nss.data ) ? 1 : 0 ; } ;
        !remainder && !settings.context[ 0 ] === win && jQuery( win ).unbind( settings.nss.scroll ).unbind( settings.nss.resize ) ;
        
        plugin_data[ settings.id ] = undefined ;
        return ;
      } ;
      
      if ( !settings.end && !fire && isFinite( settings.direction ) && ( settings.direction === 1 ? !topin : !bottomin ) ) { settings.turn = false ; return ; } ;
      
      settings.index += settings.step === 0 && !fire ? settings.direction
                                                     : settings.step === 0 && settings.direction === -1 ? settings.direction
                                                                                                        : settings.step * settings.direction ;
      
      if ( settings.end ) { return ; } ;
      return arguments.callee.apply( this , arguments ) ;
    }
  }
} )() ;
