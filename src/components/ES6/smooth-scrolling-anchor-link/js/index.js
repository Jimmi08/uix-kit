
/* 
 *************************************
 * <!-- Smooth Scrolling When Clicking An Anchor Link -->
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

export const SMOOTH_SCROLLING_ANCHORLINK = ( ( module, $, window, document ) => {
	if ( window.SMOOTH_SCROLLING_ANCHORLINK === null ) return false;
	
	
	
    module.SMOOTH_SCROLLING_ANCHORLINK               = module.SMOOTH_SCROLLING_ANCHORLINK || {};
    module.SMOOTH_SCROLLING_ANCHORLINK.version       = '0.0.6';
    module.SMOOTH_SCROLLING_ANCHORLINK.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( 'body' ).hasClass( 'onepage' ) ) return false;
		
		
		var browserURL = window.location.href;
	
		//Prevent anchor behaviour
        //Do not add off() to this
		$( 'a' ).on( 'click', function( e ) {
			
			if ( $( this ).data( 'smooth-scrolling' ) != false ) {

				var linkURL    = $( this ).attr( 'href' ),
					locIndex, 
					locURL;

				if ( linkURL.indexOf( '#' ) >= 0 && linkURL != '#' ) {
					e.preventDefault();

					var locArr = linkURL.split( '#' );
					locIndex = locArr[1];
					locURL   = locArr[0];


					if ( browserURL.indexOf( locURL ) < 0 ) {
						window.location.href = locURL + '#!!' + locIndex;
					}


				}
	
			}

			
		} );
		
		
		//Page automatically slide to jump to the corresponding position
		if ( browserURL.indexOf( '#!!' ) >= 0 ) {
			

			var curndex = browserURL.split( '#!!' ),
				$target = $( '#' + curndex[1] );
			
			//Smooth scrolling
			if ( $target.length ) {
				TweenMax.to( window, 0.5, {
					scrollTo: {
						y: $target.offset().top,
						autoKill : false
					},
					ease: Power2.easeOut,
					onComplete : function() {


						//Fixed an error that offset().top returns wrong value
						if ( parseFloat( $target.offset().top - $( window ).scrollTop() ) < 50 ) {

							$( 'a[href*="#' + curndex[1] +'"]' ).trigger( 'click' );	

						}


					}
				});			
			}
	

		}
		
		
		
		
		
		//Hyperlink click event
        //Do not add off() to this
		$( 'a[href*="#"]' ).on( 'click', function( e ) {
		
			if ( 
				location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && 
				location.hostname == this.hostname &&
				$( this ).attr( 'href' ) != '#' &
                $( this ).attr( 'href' ).indexOf( '#?' ) < 0
				
			) {
				
				// Figure out element to scroll to
				var target = $( this.hash );
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				// Does a scroll target exist?
				if ( target.length ) {

					// Only prevent default if animation is actually gonna happen
					e.preventDefault();
					

					TweenMax.to( window, 0.5, {
						scrollTo: {
							y: target.offset().top,
							autoKill : false
						},
						ease: Power2.easeOut,
						onComplete : function() {
							
							// Callback after animation
							// Must change focus!
							var $target = $( target );
							$target.focus();
							if ( $target.is( ':focus' ) ) { // Checking if the target was focused
								return false;
							} else {
								$target.attr( 'tabindex', '-1' ); // Adding tabindex for elements not focusable
								$target.focus();
							}	
							
						}
					});	
		
					
				}
			}
		} );

		
    };

    module.components.documentReady.push( module.SMOOTH_SCROLLING_ANCHORLINK.documentReady );

	return class SMOOTH_SCROLLING_ANCHORLINK {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );



