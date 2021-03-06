
/* 
 *************************************
 * <!-- Dropdown Menu -->
 *************************************
 */	
import {
    templateUrl,
    homeUrl,
    ajaxUrl,
    browser,
    UixModuleInstance,
    UixGUID,
    UixMath,
    UixCssProperty
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const DROPDOWN_MENU = ( ( module, $, window, document ) => {
	if ( window.DROPDOWN_MENU === null ) return false;
	
	
	
    module.DROPDOWN_MENU               = module.DROPDOWN_MENU || {};
    module.DROPDOWN_MENU.version       = '0.0.5';
    module.DROPDOWN_MENU.documentReady = function( $ ) {

		//Create a trigger of Dropdown Menu on Click
		//Use $( document ) to support other click events for ajax
		$( document ).off( 'click.DROPDOWN_MENU' ).on( 'click.DROPDOWN_MENU', '.uix-dropdown-menu > summary', function( e ) {
		
			// stop propagation of this event, it will never reach body in bubbling phase.
			e.stopPropagation();
			
			var $this = $( this ).parent( '.uix-dropdown-menu' );

			$this.toggleClass( 'is-opened' );

		});	

        
		$( document ).off( 'click.DROPDOWN_MENU_LINK' ).on( 'click.DROPDOWN_MENU_LINK', '.uix-dropdown-menu li a', function( e ) {
			
			// stop propagation of this event, it will never reach body in bubbling phase.
			e.stopPropagation();
			
			var $this = $( this ).closest( '.uix-dropdown-menu' );

			if ( $this.hasClass( 'is-opened' ) ) {
				$this.removeAttr( 'open' ).removeClass( 'is-opened' );
			}
			
			if ( typeof $( this ).data( 'value' ) != typeof undefined && $( this ).data( 'value' ) != '' ) {
				$this.find( 'input[type="hidden"]' ).val( $( this ).data( 'value' ) );
			}
			if ( typeof $( this ).data( 'display-text' ) != typeof undefined && $( this ).data( 'display-text' ) != '' ) {
				$this.find( '> summary > span' ).html( $( this ).data( 'display-text' ) );
			}
			
			
			

		});		


		//Close the target
        //Do not add off() to this
		$( document.body ).on( 'click', function( e ) {
			
			//Apply click method to outer div but not inner div
			if ( ! $( e.target.offsetParent ).hasClass( 'uix-dropdown-menu' ) ) {
				$( '.uix-dropdown-menu' ).removeAttr( 'open' ).removeClass( 'is-opened' );	
			}
					
			
		});		

		
    };

    module.components.documentReady.push( module.DROPDOWN_MENU.documentReady );
	

	return class DROPDOWN_MENU {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

