/*
 * 
 * scrolltrigger
 * 
 * ---
 * @Copyright(c) 2012, falsandtru
 * @license MIT  http://opensource.org/licenses/mit-license.php  http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 * @version 1.0.8
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
			settings.ns = [ settings.gns + ( settings.ns === undefined ? '' : ':' + settings.ns ) ].join( '.' ) ;
			settings.scope = this.get( 0 ) === window ? document : this ;
			settings.count = 0 ;
			settings.reset = false ;
		}
		
		if( !jQuery( settings.scope ).length ){ return this ; }
		
		for( var i = 0 ; i < jQuery( settings.scope ).length ; i++ )
		{
			jQuery.data( jQuery( settings.scope ).eq( i ).get( 0 ) , settings.ns , jQuery.extend( {} , settings) ) ;
		}
		
		jQuery( this )
		.bind( [ 'scroll' , settings.ns ].join( '.' ) , settings , function( event )
		{
			jQuery( this ).trigger( settings.ns ) ;
		} );
		
		if( settings.expand && this.get( 0 ) !== window )
		{
			jQuery( window ).bind( [ 'scroll' , settings.ns ].join( '.' ) , settings , function( event )
			{
				event.data.scope === document ? jQuery( window ).trigger( event.data.ns ) : jQuery( event.data.scope ).trigger( event.data.ns ) ;
			} ) ;
		}
		
		jQuery( this )
		.bind( settings.ns , settings , function( event )
		{
			var
			fire ,
			area = this === window ? document : this ,
			settings = jQuery.data( area , event.data.ns ) ,
			targets = jQuery( settings.trigger , area ) ,
			target = targets.eq( settings.count ) ;
			
			if( !target.length )
			{
				if( settings.terminate )
				{
					var
					remainder = 0 ;
					
					jQuery( this ).unbind( [ 'scroll' , settings.ns ].join( '.' ) ).unbind( settings.ns ) ;
					jQuery.removeData( area , settings.ns ) ;
					
					for( var i = 0 ; i < jQuery( settings.scope ).length ; i++ )
					{
						remainder += ( undefined === jQuery.data( jQuery( settings.scope ).eq( i ).get( 0 ) , settings.ns ) ? 0 : 1 ) ;
					}
					remainder ? null : jQuery( window ).unbind( [ 'scroll' , settings.ns ].join( '.' ) ) ;
				}
				return this ;
			}
			
			fire = settings.beforehand > settings.count ? true : jQuery( window ).scrollTop() > target.offset().top - jQuery( window ).height() - parseInt( settings.ahead ) ;
			
			if( !fire ){ return this ; }
			
			settings.callback.apply( target , settings.parameter ) ;
			
			settings.count = settings.count + 1 ;
			jQuery.data( area , settings.ns , settings ) ;
			
			return arguments.callee.apply( this , arguments ) ;
			
		} );
		
		
		/* function */
		
		
		/* return */
		
		return this ;
	}
} )( jQuery )