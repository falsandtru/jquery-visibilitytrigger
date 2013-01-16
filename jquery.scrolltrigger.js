/*
 * 
 * scrolltrigger
 * 
 * ---
 * @Copyright(c) 2012, falsandtru
 * @license MIT  http://opensource.org/licenses/mit-license.php  http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 * @version 1.0.9
 * @updated 2013/01/16
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
		if( typeof this === 'function' ){ return arguments.callee.apply( jQuery( window ) , arguments ) ; }
		var
		defaults =
		{
			gns : 'scrolltrigger' ,
			ns : undefined ,
			trigger : undefined ,
			callback : function(){} ,
			parameter : [] ,
			ahead : 0 ,
			beforehand: 0 ,
			expand : true ,
			terminate : true ,
			reset : true
		} ,
		settings = jQuery.extend( {} , defaults , options ) ;
		
		if( settings.reset )
		{
			jQuery.extend
			(
				settings ,
				{
					nss :
					{
						scroll : [ 'scroll' , settings.gns + ( settings.ns === undefined ? '' : ':' + settings.ns ) ].join( '.' ) ,
						scrolltrigger :  settings.gns + ( settings.ns === undefined ? '' : '.' + settings.ns ) ,
						data : settings.gns + ( settings.ns === undefined ? '' : '.' + settings.ns )
					} ,
					scope : this.get( 0 ) === window ? document : this ,
					count : 0 ,
					reset : false
				}
			)
		}
		
		if( !jQuery( settings.scope ).length || !arguments.length ){ return this ; }
		
		for( var i = 0 ; i < jQuery( settings.scope ).length ; i++ )
		{
			jQuery.data( jQuery( settings.scope ).eq( i ).get( 0 ) , settings.nss.data , jQuery.extend( {} , settings) ) ;
		}
		
		if( settings.expand && this.get( 0 ) !== window )
		{
			jQuery( window )
			.unbind( settings.nss.scroll )
			.bind( settings.nss.scroll , settings , function( event )
			{
				event.data.scope === document ? null : jQuery( event.data.scope ).trigger( event.data.nss.scrolltrigger ) ;
			} ) ;
		}
		
		jQuery( this )
		.unbind( settings.nss.scroll )
		.bind( settings.nss.scroll , settings , function( event )
		{
			jQuery( this ).trigger( event.data.nss.scrolltrigger ) ;
		} )
		.unbind( settings.nss.scrolltrigger )
		.bind( settings.nss.scrolltrigger , settings , function( event )
		{
			var
			fire ,
			area = this === window ? document : this ,
			settings = jQuery.data( area , event.data.nss.data ) ;
			
			if( settings === undefined ){ return this; }
			
			targets = jQuery( settings.trigger , area ) ;
			target = targets.eq( settings.count ) ;
			
			if( !target.length )
			{
				if( settings.terminate )
				{
					var
					remainder = 0 ;
					
					jQuery( this ).unbind( settings.nss.scrolltrigger ).unbind( settings.nss.scroll ) ;
					jQuery.removeData( area , settings.nss.data ) ;
					
					for( var i = 0 ; i < jQuery( settings.scope ).length ; i++ )
					{
						remainder += ( undefined === jQuery.data( jQuery( settings.scope ).eq( i ).get( 0 ) , settings.nss.data ) ? 0 : 1 ) ;
					}
					remainder ? null : jQuery( window ).unbind( settings.nss.scroll ) ;
				}
				return this ;
			}
			
			fire = settings.beforehand > settings.count ? true : jQuery( window ).scrollTop() > target.offset().top - jQuery( window ).height() - parseInt( settings.ahead ) ;
			
			if( !fire ){ return this ; }
			
			settings.callback.apply( target , settings.parameter ) ;
			
			settings.count = settings.count + 1 ;
			jQuery.data( area , settings.nss.data , settings ) ;
			
			return arguments.callee.apply( this , arguments ) ;
			
		} );
		
		
		/* function */
		
		
		/* return */
		
		return this ;
	}
} )( jQuery )