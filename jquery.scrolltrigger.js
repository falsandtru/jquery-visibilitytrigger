/*
 * 
 * scrolltrigger
 * 
 * ---
 * @Copyright(c) 2012, falsandtru
 * @license MIT  http://opensource.org/licenses/mit-license.php  http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 * @version 1.03
 * @updated 2013/01/12
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
 * 	trigger: 'img[data-origin]',
 * 	callback: function(){$(this).attr('src', $(this).attr('data-origin'))},
 * 	ahead: 300
 * }).trigger('scroll');
 * 
 */

( function( $ )
{
	
	jQuery.fn.scrolltrigger	= scrolltrigger ;
	jQuery.scrolltrigger		= scrolltrigger ;
	
	function scrolltrigger( options )
	{
		if(typeof this == 'function'){ return arguments.callee.apply( jQuery( window ) , arguments ) ; }
		var
		defaults =
		{
			gns : 'scrolltrigger' ,
			ns : 'default' ,
			trigger : undefined ,
			callback : function(){} ,
			parameter : [] ,
			ahead : 0 ,
			scope : this.get(0) == window ? jQuery( document ) : this ,
			reset : true
		} ,
		settings = jQuery.extend( {} , defaults , options ) ;
		
		
		if( !settings.scope.length ){ return this ; }
		
		settings.scope.each( function( index , element )
		{
			var count = parseInt( settings.count ) ;
			jQuery.extend( settings , { count : settings.reset || isNaN( count ) ? 0 : count } ) ;
			jQuery.data( element , [ settings.gns , settings.ns , 'settings' ].join( '.' ) , settings ) ;
		} ) ;
		
		jQuery( this )
		.bind( [ 'scroll' , settings.gns , settings.ns ].join( '.' ) , settings , function( event )
		{
			var
			fire ,
			driver = this ,
			area = this == window ? document : this ,
			settings = jQuery.data( area , [ event.data.gns , event.data.ns , 'settings' ].join( '.' ) ) ,
			targets = jQuery( settings.trigger , area ) ,
			target = targets.eq( settings.count ) ;
			
			if( !target.length )
			{
				jQuery( this ).unbind( [ 'scroll' , settings.gns , settings.ns ].join( '.' ) ) ;
				return this ;
			}
			
			if( this == window )
			{
				fire = jQuery( window ).scrollTop() > ( target.offset().top - jQuery( window ).height() - settings.ahead ) ;
				}else{
				fire = ( jQuery( window ).scrollTop() + jQuery ( this ).scrollTop() )
					> ( target.offset().top + target.position().top - jQuery( window ).height() - jQuery( this ).height() - settings.ahead ) ;
			}
			
			if( !fire ){ return this ; }
			
			settings.callback.apply( target , settings.parameter ) ;
			
			jQuery.extend
			(
				settings ,
				{
					count : settings.count + 1 ,
					reset : false
				}
			) ;
			jQuery.data( area , [ settings.gns , settings.ns , 'settings' ].join( '.' ) , settings ) ;
			
			return arguments.callee.apply( this , arguments ) ;
			
		});
		
		
		/* function */
		
		
		/* return */
		
		return this ;
	}
} )( jQuery )