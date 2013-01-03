/*
 * 
 * scrolltrigger
 * 
 * ---
 * @Copyright(c) 2012, FAT
 * @license MIT  http://opensource.org/licenses/mit-license.php  http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 * @version -
 * @updated 2013/01/04
 * @author FAT  http://fat.main.jp/  http://sa-kusaku.sakura.ne.jp/
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
		defaults=
		{
			gns : 'scrolltrigger' ,
			ns : 'default' ,
			trigger : undefined ,
			callback : undefined ,
			parameters : [] ,
			ahead : 0 ,
			scope : this.get(0) == window ? jQuery( document ) : this ,
			reset : true
		} ,
		setting = jQuery.extend( {} , defaults , options ) ;
		
		
		if( !setting.scope.length ){ return this ; }
		
		setting.scope.each( function( index , element )
		{
			var count = parseInt( setting.count ) ;
			jQuery.extend( setting , { count : setting.reset || isNaN( count ) ? 0 : count } ) ;
			jQuery.data( element , [ setting.gns , setting.ns , 'setting' ].join( '.' ) , setting ) ;
		} ) ;
		
		jQuery( this )
		.bind( [ 'scroll' , setting.gns , setting.ns ].join( '.' ) , setting , function( event )
		{
			var
			fire ,
			driver = this ,
			area = this == window ? document : this ,
			setting = jQuery.data( area , [ event.data.gns , event.data.ns , 'setting' ].join( '.' ) ) ,
			targets = jQuery( setting.trigger , area ) ,
			target = targets.eq( setting.count ) ;
			
			if( !target.length )
			{
				jQuery( this ).unbind( [ 'scroll' , setting.gns , setting.ns ].join( '.' ) ) ;
				return this ;
			}
			
			if( this == window )
			{
				fire = jQuery( window ).scrollTop() > ( target.offset().top - jQuery( window ).height() - setting.ahead ) ;
				}else{
				fire = ( jQuery( window ).scrollTop() + jQuery ( this ).scrollTop() )
					> ( target.offset().top + target.position().top - jQuery( window ).height() - jQuery( this ).height() - setting.ahead ) ;
			}
			
			if( !fire ){ return this ; }
			
			setting.callback.apply( target , setting.parameters ) ;
			
			jQuery.extend
			(
				setting ,
				{
					count : setting.count + 1 ,
					reset : false
				}
			) ;
			jQuery.data( area , [ setting.gns , setting.ns , 'setting' ].join( '.' ) , setting ) ;
			
			return arguments.callee.apply( this , arguments ) ;
			
		});
		
		
		/* function */
		
		
		/* return */
		
		return this ;
	}
} )( jQuery )