/*
 * 
 * displaytrigger
 * 
 * ---
 * @Copyright(c) 2012, falsandtru
 * @license MIT  http://opensource.org/licenses/mit-license.php  http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 * @version 1.0.0
 * @updated 2013/04/07
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

( function( $ ) {
  
  jQuery.fn.displaytrigger = displaytrigger ;
  jQuery.displaytrigger    = displaytrigger ;
  displaytrigger = null ;
  
  function displaytrigger( options ) {
    if ( typeof this === 'function' ) { return arguments.callee.apply( jQuery( window ) , arguments ) ; } ;
    var
      win = window ,
      doc = document ,
      defaults = {
        gns : 'displaytrigger' ,
        ns : undefined ,
        trigger : undefined ,
        callback : function() {} ,
        parameter : [] ,
        ahead : 0 ,
        beforehand: 0 ,
        step : 1 ,
        once : true ,
        skip : false ,
        expand : true ,
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
          scope : this.get( 0 ) === win ? [ doc ] : this ,
          index : 0 ,
          height : {} ,
          direction : 'down' ,
          distance : 0 ,
          turn : false ,
          end : false ,
          reset : false ,
        }
      )
    } ;
    
    
    if ( !jQuery( settings.scope ).length || !jQuery( settings.trigger , settings.scope ).length || !arguments.length ) { return this ; } ;
    
    settings.height.window = 0 ;
    for ( var i = 0 , element ; element = settings.scope[ i ] ; i++ ) {
      settings.height.element = 0 ;
      jQuery.data( element , settings.nss.data , jQuery.extend( true , {} , settings) ) ;
    } ;
    
    jQuery( win )
    .unbind( settings.nss.resize )
    .bind( settings.nss.resize , settings , function( event ) {
      event.data.scope === document ? null : jQuery( window ).trigger( event.data.nss.displaytrigger , [ this ] ) ;
    } ).filter( function() {
      return settings.expand && doc !== settings.scope ;
    } )
    .unbind( settings.nss.scroll )
    .bind( settings.nss.scroll , settings , function( event ) {
      jQuery( event.data.scope ).trigger( event.data.nss.displaytrigger , [ this ] ) ;
    } ) ;
    
    jQuery( this )
    .unbind( settings.nss.scroll )
    .bind( settings.nss.scroll , settings , function( event ) {
      jQuery( this ).trigger( event.data.nss.displaytrigger , [ this ] ) ;
    } )
    .unbind( settings.nss.displaytrigger )
    .bind( settings.nss.displaytrigger , settings , function( event , context ) {
      var
        win = window ,
        doc = document ,
        area = this === win ? doc : this ,
        fire ,
        settings = jQuery.data( area , event.data.nss.data ) ;
      
      if ( !settings ) { return this ; } ;
      
      context = context || win ;
      targets = jQuery( settings.trigger , area ) ;
      target = targets.eq( settings.index ) ;
      
      switch ( true ) {
        case !targets.length :
          fire = false ;
          break ;
          
        case settings.terminate && settings.index >= targets.length :
          fire = false ;
          break ;
          
        case settings.index < 0 :
          settings.index = 0 ;
          settings.end = true ;
          jQuery.data( area , settings.nss.data , settings ) ;
          return arguments.callee.apply( this , arguments ) ;
          
        case settings.index >= targets.length :
          settings.index = targets.length - 1 ;
          settings.end = true ;
          jQuery.data( area , settings.nss.data , settings ) ;
          return arguments.callee.apply( this , arguments ) ;
          
        case settings.once && jQuery.data( target.get( 0 ) , settings.nss.data + '.fired' ) :
          fire = false ;
          break ;
          
        case settings.beforehand > settings.index && !jQuery.data( target.get( 0 ) , settings.nss.data + '.fired' )  :
          fire = true ;
          break ;
          
        case settings.once :
          var
            st = jQuery( win ).scrollTop() ,
            ot = target.offset().top ,
            wh = jQuery( win ).height() ,
            th = target.height() ,
            ahead = -1 < settings.ahead && settings.ahead < 1 ? th * settings.ahead : settings.ahead ,
            topin = st >= ot - wh - ahead ,
            bottomin = st <= ot + th + ahead ;
          
          fire = ( settings.skip ? topin && bottomin : topin ) && !jQuery.data( target.get( 0 ) , settings.nss.data + '.fired' ) ? true : false ;
          
          END : {
            if ( fire || topin ) {
              break END ;
            } ;
            
            jQuery.data( area , settings.nss.data , settings ) ;
            return this ; 
          }
          break ;
          
        default :
          var
            cs = jQuery( context ).scrollTop() ,
            ch = settings.height[ context === win ? 'window' : 'element' ] ,
            direction = cs === ch ? settings.direction : cs < ch ? 'up' : 'down' ,
            distance = direction === 'up' ? ch - cs : cs - ch ;
          
          TURN : {
            if ( settings.direction === direction ) { break TURN ; } ;
            
            settings.turn = true ;
            settings.end = false ;
            settings.direction = direction ;
            //settings.index += settings.direction === 'up' ? - settings.step : settings.step ;
            target = targets.eq( settings.index ) ;
          } ;
          settings.distance = distance === 0 ? settings.distance : distance ;
          settings.height[ context === win ? 'window' : 'element' ] = cs ;
          
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
          
          fire = settings.turn && ( direction === 'up' ? st + settings.distance <= ot + th + ahead : st - settings.distance >= ot - wh - ahead ) ?
                 false :
                 ( settings.skip ? topin && bottomin : direction === 'up' ? bottomin : topin ) ;
　　　　　
          END : {
            if ( fire || ( settings.direction === 'up' ? bottomin : topin ) ) {
              break END ;
            } ;
            
            settings.turn = false ;
            //settings.index -= !settings.turn ? 0 : settings.direction === 'up' ? - settings.step : settings.step ;
            jQuery.data( area , settings.nss.data , settings ) ;
            return this ; 
          }
          break ;
      } ;
      
      if ( settings.terminate && !target.length ) {
        var remainder = 0 ;
        
        jQuery( this ).unbind( settings.nss.displaytrigger ).unbind( settings.nss.scroll ) ;
        jQuery.removeData( area , settings.nss.data ) ;
        
        for ( var i = 0 , element ; element = settings.scope[ i ] ; i++ ) {
          remainder += jQuery.data( element , settings.nss.data ) ? 1 : 0 ;
        } ;
        remainder ? null : jQuery( win ).unbind( settings.nss.scroll ) ;
        
        settings.scope = null ;
        win = doc = area = null ;
        return this ;
      } ;
      
      if ( fire ) {
        jQuery.data( target.get( 0 ) , settings.nss.data + '.fired' , true ) ;
        settings.callback.apply( target.get( 0 ) , [ event , settings.parameter , settings.index , settings.direction ] ) ;
      }
      
      settings.index += settings.once ? settings.step : settings.direction === 'up' ? - settings.step : settings.step ;
      jQuery.data( area , settings.nss.data , settings ) ;
      
      win = doc = area = null ;
      return settings.end ? this : arguments.callee.apply( this , arguments ) ;
    } );
    
    
    /* function */
    
    
    /* return */
    
    win = doc = null ;
    return this ;
  }
} )( jQuery )
