/*
 * 
 * displaytrigger
 * 
 * ---
 * @Copyright(c) 2012, falsandtru
 * @license MIT  http://opensource.org/licenses/mit-license.php  http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 * @version 1.1.2
 * @updated 2013/04/12
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

( function() {
  
  if ( typeof window[ 'jQuery' ] === 'undefined' ) { return ; } ;
  
  window[ 'undefined' ] = void( 0 ) ;
  var $ = jQuery = window[ 'jQuery' ] , plugin_data = [ 'settings' ] ;
  
  window[ 'jQuery' ][ 'fn' ][ 'displaytrigger' ] = displaytrigger ;
  window[ 'jQuery' ][ 'displaytrigger' ]    = displaytrigger ;
  displaytrigger = null ;
  
  function displaytrigger( options ) {
    if ( typeof this === 'function' ) { return arguments.callee.apply( jQuery( window ) , arguments ) ; } ;
    var
      win = window ,
      doc = document ,
      defaults = {
        id : 0 ,
        gns : 'displaytrigger' ,
        ns : undefined ,
        trigger : undefined ,
        callback : function() {} ,
        parameter : [] ,
        ahead : 0 ,
        beforehand: 0 ,
        index : 0 ,
        step : 1 ,
        once : true ,
        skip : false ,
        expand : true ,
        delay : 300 ,
        terminate : true ,
        reset : true
      } ,
      settings = jQuery.extend( true , {} , defaults , options ) ;
    
    if ( settings.reset ) {
      jQuery.extend
      (
        true ,
        settings , {
          nss : {
            scroll : [ 'scroll' , settings.gns + ( settings.ns ? ':' + settings.ns : '' ) ].join( '.' ) ,
            displaytrigger : [ settings.gns + ( settings.ns ? '.' + settings.ns : '' ) ].join( '.' ) ,
            resize : [ 'resize' , settings.gns + ( settings.ns ? ':' + settings.ns : '' ) ].join( '.' ) ,
            data : settings.gns + ( settings.ns ? ':' + settings.ns : '' )
          } ,
          scope : this.get( 0 ) === win ? jQuery( doc ) : jQuery( this ) ,
          index : 0 ,
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
    
    
    if ( !settings.scope.length || !settings.scope.find( settings.trigger ).length || !arguments.length ) { return this ; } ;
    
    
    register( settings ) ;
    
    
    /* function */
    
    function register( settings ) {
      settings.height.window = 0 ;
      jQuery( win )
      .unbind( settings.nss.resize )
      for ( var i = 0 , element ; element = settings.scope[ i ] ; i++ ) {
        
        settings.height.element = 0 ;
        
        settings.id = plugin_data.length ;
        plugin_data.push( jQuery.extend( true , {} , settings ) ) ;
        jQuery.data( element , settings.nss.data , settings.id ) ;
        
        jQuery( element === doc ? win : element )
        .unbind( settings.nss.scroll )
        .bind( settings.nss.scroll , settings.id , function( event ) {
          var settings = plugin_data[ event.data ] ;
          jQuery( this ).trigger( settings.nss.displaytrigger , [ this ] ) ;
        } )
        .unbind( settings.nss.displaytrigger )
        .bind( settings.nss.displaytrigger , settings.id , function( event , context ) {
          var settings = plugin_data[ event.data ] , id , scrollcontext , displaytriggercontext ;
          
          scrollcontext = context ;
          displaytriggercontext = this ;
          if ( !settings.delay ) {
            drive( event , displaytriggercontext , scrollcontext || win ) ;
          } else {
            id = setTimeout( function() {
              while ( id = settings.queue.shift() ) { clearTimeout( id ) ; } ;
              plugin_data[ settings.id ] = settings ;
              drive( event , displaytriggercontext , scrollcontext || win ) ;
            } , settings.interval ) ;
            
            settings.queue.push( id ) ;
            plugin_data[ settings.id ] = settings ;
          } ;
        } ) ;
      } ;
      
      jQuery( win )
      .unbind( settings.nss.resize )
      .bind( settings.nss.resize , settings.id , function( event ) {
        var settings = plugin_data[ event.data ] ;
        settings.scope.trigger( settings.nss.displaytrigger , [ this ] ) ;
      } ).filter( function() {
        return settings.expand && doc !== settings.scope.get( 0 ) ;
      } )
      .unbind( settings.nss.scroll )
      .bind( settings.nss.scroll , settings.id , function( event ) {
        var settings = plugin_data[ event.data ] ;
        settings.scope.trigger( settings.nss.displaytrigger , [ this ] ) ;
      } ) ;
    }
    
    function drive( event , displaytriggercontext , scrollcontext ) {
      var
        win = window ,
        doc = document ,
        area = displaytriggercontext === win ? doc : displaytriggercontext ,
        fire = false ,
        targets ,
        target ,
        settings = plugin_data[ event.data ] ;
      
      if ( !settings ) { return ; } ;
      
      targets = jQuery( settings.trigger , area ) ;
      target = targets.eq( settings.index ) ;
      
      switch ( true ) {
        case !targets.length :
          break ;
          
        case settings.index < 0 :
          settings.index = 0 ;
          settings.end = true ;
          plugin_data[ settings.id ] = settings ;
          return settings.terminate ? null : arguments.callee.apply( displaytriggercontext , arguments ) ;
          
        case settings.index >= targets.length :
          settings.index = targets.length - 1 ;
          settings.end = true ;
          plugin_data[ settings.id ] = settings ;
          return settings.terminate ? null : arguments.callee.apply( displaytriggercontext , arguments ) ;
          
        case settings.beforehand > settings.index && !jQuery.data( target.get( 0 ) , settings.nss.data + '-fired' )  :
          fire = true ;
          break ;
          
        case settings.once && jQuery.data( target.get( 0 ) , settings.nss.data + '-fired' ) :
          break ;
          
        default :
          var
            cs = jQuery( scrollcontext ).scrollTop() ,
            ch = settings.height[ scrollcontext === win ? 'window' : 'element' ] ,
            direction = cs === ch ? settings.direction
                                  : cs < ch ? -1
                                            : 1 ,
            distance = direction === -1 ? ch - cs : cs - ch ;
          
          TURN : {
            if ( settings.direction === direction ) { break TURN ; } ;
            
            settings.turn = true ;
            settings.end = false ;
            settings.direction = direction ;
            //settings.index += settings.direction === -1 ? - settings.step : settings.step ;
            target = targets.eq( settings.index ) ;
          } ;
          settings.distance = distance === 0 ? settings.distance : distance ;
          settings.height[ scrollcontext === win ? 'window' : 'element' ] = cs ;
          
          if ( settings.end ) { break ; } ;
          
          var
            st = jQuery( win ).scrollTop() ,
            ot = target.offset().top ,
            wh = jQuery( win ).height() ,
            th = target.height() ,
            ahead = -1 < settings.ahead && settings.ahead < 1 ? th * settings.ahead : settings.ahead ,
            topin = st >= ot - wh - ahead ,
            //topout = st < ot - wh - ahead ,
            bottomin = st <= ot + th + ahead ;
            //bottomout = st > ot + th + ahead ;
          
          FIRE : {
            fire = settings.turn &&
                   !settings.once &&
                   ( direction === -1 ? st + settings.distance <= ot + th + ahead
                                      : st - settings.distance >= ot - wh - ahead ) ? false
                                                                                    : ( settings.skip ? topin && bottomin
                                                                                                      : direction === -1 ? bottomin
                                                                                                                         : topin ) ;
          } ;
　　　　　
          END : {
            if ( fire || ( settings.direction === -1 ? bottomin : topin ) ) {
              break END ;
            } ;
            
            settings.turn = false ;
            //settings.index -= !settings.turn ? 0 : settings.direction === -1 ? - settings.step : settings.step ;
            plugin_data[ settings.id ] = settings ;
            return ; 
          } ;
          break ;
      } ;
      
      
      if ( fire ) {
        settings.once ? jQuery.data( target.get( 0 ) , settings.nss.data + '-fired' , true ) : null ;
        settings.callback.apply( target.get( 0 ) , [ event , settings.parameter , settings.index , settings.direction ] ) ;
      } ;
      
      if ( settings.terminate && ( ( fire && ( ( settings.index === 0 && settings.step < 0 ) || ( settings.index === targets.length - 1 && settings.step > 0 ) ) ) || !targets.length ) ) {
        var remainder = 0 ;
        
        scrollcontext === win ? null : jQuery( scrollcontext ).unbind( settings.nss.scroll ) ;
        jQuery( displaytriggercontext ).unbind( settings.nss.displaytrigger ).unbind( settings.nss.scroll ) ;
        jQuery.removeData( area , settings.nss.data ) ;
        
        for ( var i = 0 , element ; element = settings.scope[ i ] ; i++ ) {
          remainder += jQuery.data( element , settings.nss.data ) ? 1 : 0 ;
        } ;
        remainder ? null : jQuery( win ).unbind( settings.nss.scroll ).unbind( settings.nss.resize ) ;
        
        plugin_data[ settings.id ] = undefined ;
        return ;
      } ;
      
      settings.index += settings.direction === -1 ? - settings.step : settings.step ;
      plugin_data[ settings.id ] = settings ;
      
      
      return settings.end ? null : arguments.callee.apply( displaytriggercontext , arguments ) ;
    }
    
    
    /* return */
    
    return this ;
  }
} )() ;
