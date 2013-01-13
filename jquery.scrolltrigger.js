/*
 * 
 * scrolltrigger
 * 
 * ---
 * @Copyright(c) 2012, falsandtru
 * @license MIT  http://opensource.org/licenses/mit-license.php  http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 * @version 1.0.5
 * @updated 2013/01/13
 * @author falsandtru  http://fat.main.jp/  http://sa-kusaku.sakura.ne.jp/
 * ---
 * Note: 
 * 
 * ---
 * Example:
 * @jquery 1.7.2
 * 
 * $.scrolltrigger(
 * {
 * 	trigger : 'img[data-origin]' ,
 * 	callback : function(){ $( this ).attr( 'src' , $( this ).attr( 'data-origin' ) ) } ,
 * 	ahead : 300 ,
 * 	beforehand : 1
 * } ).trigger( 'scroll' ) ;
 * 
 */

( function( $ )
{
	
	jQuery.fn.scrolltrigger	= scrolltrigger ;
	jQuery.scrolltrigger		= scrolltrigger ;
	
	function scrolltrigger( options )
	{
		if(typeof this === 'function'){ return arguments.callee.apply( jQuery( window ) , arguments ) ; }
		var
		defaults =
		{
			gns : 'scrolltrigger' ,
			ns : 'default' ,
			trigger : undefined ,
			callback : function(){} ,
			parameter : [] ,
			ahead : 0 ,
			beforehand: 0 ,
			reset : true
		} ,
		settings = jQuery.extend( {} , defaults , options ) ;
		
		if( settings.reset )
		{
			settings.scope = this.get( 0 ) === window ? jQuery( document ) : jQuery( this ) ;
			settings.count = 0 ;
			settings.reset = false ;
			return arguments.callee.apply( this , [ settings ] ) ;
		}
		
		if( !settings.scope.length ){ return this ; }
		
		for( var i = 0 ; i < settings.scope.length ; i++ )
		{
			jQuery.data( settings.scope.eq( i ).get( 0 ) , [ settings.gns , settings.ns , 'settings' ].join( '.' ) , settings ) ;
		}
		
		jQuery( this )
		.bind( [ 'scroll' , settings.gns , settings.ns ].join( '.' ) , settings , function( event )
		{
			var
			fire ,
			area = this === window ? document : this ,
			settings = jQuery.data( area , [ event.data.gns , event.data.ns , 'settings' ].join( '.' ) ) ,
			targets = jQuery( settings.trigger , area ) ,
			target = targets.eq( settings.count ) ;
			
			if( !target.length )
			{
				jQuery( this ).unbind( [ 'scroll' , settings.gns , settings.ns ].join( '.' ) ) ;
				return this ;
			}
			
			fire = settings.beforehand > settings.count ? true : jQuery( window ).scrollTop() > ( target.offset().top - jQuery( window ).height() - parseInt( settings.ahead ) ) ;
			
			if( !fire ){ return this ; }
			
			settings.callback.apply( target , settings.parameter ) ;
			
			settings.count = settings.count + 1 ;
			jQuery.data( area , [ settings.gns , settings.ns , 'settings' ].join( '.' ) , settings ) ;
			
			return arguments.callee.apply( this , arguments ) ;
			
		});
		
		
		/* function */
		
		
		/* return */
		
		return this ;
	}
} )( jQuery )