/*
 * KAWO Tooltip
 * Author: Alex Duncan
 * Version: 1.0.6
 *
 * No dependencies and zero config options, super simple declarative tooltip library.
 */
(function ( root, factory ) {

	// AMD
	if ( typeof define === 'function' && define.amd ) define( [], factory );

	// COMMONJS
	else if ( typeof exports === 'object' ) module.exports = factory();

	// BROWSER GLOBAL
	else root.kawoTooltip = factory();

}( this, function () {
	'use strict';

	return function() {

		var showTimeout,
			hideTimeout,
			targetPosition,
			visible = false;
			/*oldContent;*/

		// CREATE HIDDEN TOOLTIP ELEMENT
		var tooltip = document.createElement( 'div' );

		// TOOLTIP BASE STYLES
		tooltip.className = 'kawo-tooltip';
		tooltip.style.position = 'fixed';
		tooltip.style.opacity = '0';
		tooltip.style.zIndex = 1000;
		tooltip.style.pointerEvents = 'none';

		// ADD SPAN TO TOOLTIP
		var span = document.createElement( 'span' );
		tooltip.appendChild( span );

		// CREATE ARROW ELEMENT
		var arrow = document.createElement( 'div' );

		// ARROW BASE STYLES
		arrow.className = 'kawo-tooltip-arrow';
		arrow.style.width = 0;
		arrow.style.height = 0;
		arrow.style.position = 'absolute';
		tooltip.style.pointerEvents = 'none';

		// APPEND ARROW TO TOOLTIP
		tooltip.appendChild( arrow );

		// ADD TOOLTIP TO DOM
		document.body.appendChild( tooltip );


		// FUNCTION : POSITION HORIZONTAL
		// -----------------------------------------------------------------------
		var positionHorizontal = function( left, right, align, arrowLeft ) {

			tooltip.style.left = left;
			tooltip.style.right = right;
			tooltip.style.textAlign = align;

			arrow.style.left = arrowLeft + 'px';
		};


		// FUNCTION : POSITION VERTICAL
		// -----------------------------------------------------------------------
		var positionVertical = function( tooltipTop, rotation, top, bottom ) {

			tooltip.style.top = tooltipTop + 'px';

			arrow.style.webkitTransform = 'rotate(' + rotation + 'deg)';
			arrow.style.msTransform = 'rotate(' + rotation + 'deg)';
			arrow.style.transform = 'rotate(' + rotation + 'deg)';
			arrow.style.top = top;
			arrow.style.bottom = bottom;
		};


		// FUNCTION : HIDE TOOLTIP
		// -----------------------------------------------------------------------
		var hideTooltip = function() {
			tooltip.style.opacity = '0';
			visible = false;
		};


		// LISTEN TO MOUSEENTER EVENT
		// -------------------------------------------------------------------------------
		document.body.addEventListener( 'mouseenter', function( e ){

			// TARGET HAS 'data-tooltip' ATTRIBUTE
			if ( e.target.hasAttribute( 'data-tooltip' ) ) {

				// TEST TARGET CSS POSITION
				targetPosition = window.getComputedStyle(e.target).getPropertyValue('position');

				// BLUR TIMEOUT SET › CLEAR IT
				if ( hideTimeout ) {
					clearTimeout( hideTimeout );
					hideTimeout = null;
				}

				// TOOLTIP NOT VISIBLE › FADEIN AFTER TIMEOUT
				if ( !visible ) showTimeout = setTimeout(function(){

					tooltip.style.opacity = '1';
					visible = true;

				}, 500 );

				// GET THE TEXT FOR THE TOOLTIP FROM THE 'data-tooltip' ATTRIBUTE
				// ----- CUSTOM
				/*if(oldContent){ // not the first time
					if(oldContent != e.target.getAttribute( 'data-tooltip' )){
						// dispatch event
						var event = new Event('tooltipTargetChanged');
						document.body.dispatchEvent(event);
					}
				}
				oldContent = e.target.getAttribute( 'data-tooltip' );*/
				// ----- CUSTOM
				span.innerHTML = e.target.getAttribute( 'data-tooltip' );
				

				// GET SIZE AND POSITION OF THE TOOLTIP ELEMENT
				var tooltipSize = tooltip.getBoundingClientRect();

				// GET SIZE AND POSITION OF THE TARGET ELEMENT
				var targetSize = e.target.getBoundingClientRect();

				// CALCULATE CENTER OF TARGET
				var center = targetSize.left + ( targetSize.width / 2 );

				// IF OFF LEFT SIDE OF SCREEN › SHIFT RIGHT ONTO SCREEN
				// -----------------------------------------------------------------------
				if ( ( tooltipSize.width / 2 ) > ( center - 20 ) )
					positionHorizontal( '20px', 'auto', 'left', ( center - 25 ) );


				// IF OFF RIGHT SIDE OF SCREEN › SHIFT LEFT ONTO SCREEN
				// -----------------------------------------------------------------------
				else if ( ( center + tooltipSize.width / 2 ) > window.innerWidth - 20 )
					positionHorizontal( 'auto', '20px', 'right', ( ( tooltipSize.width - ( targetSize.width / 2 ) ) - 5 ) );


				// ELSE › CENTERED
				// -----------------------------------------------------------------------
				else positionHorizontal( ( center - ( tooltipSize.width / 2 ) ) + 'px', 'auto', 'center', ( ( tooltipSize.width / 2 ) - 5 ) );


				// IF OFF BOTTOM OF SCREEN › POSITION ARROW ABOVE ELEMENT
				// -----------------------------------------------------------------------
				if ( ( targetSize.bottom + tooltipSize.height ) > window.innerHeight )
					positionVertical( ( targetSize.top -  tooltipSize.height - 5 ), '-135', 'auto', '-5px' );


				// ELSE › POSITION ARROW BELOW TOOLTIP
				// -----------------------------------------------------------------------
				else positionVertical( ( targetSize.bottom + 5 ), '45', '-5px', 'auto' );

			}

		}, true );


		// LISTEN TO MOUSELEAVE EVENT
		// -------------------------------------------------------------------------------
		document.body.addEventListener( 'mouseleave', function(){

			// IF A TIMEOUT IS SET CLEAR IT
			if ( showTimeout ) clearTimeout( showTimeout );

			// IF A TOOLTIP IS VISIBLE & NO TIMEOUT › SET TIMEOUT
			if ( visible && !hideTimeout ) hideTimeout = setTimeout( hideTooltip, 500 );

		}, true );

		// ON CLICK › HIDE TOOLTIP
		document.body.addEventListener( 'click', hideTooltip );

		// ON MAIN WINDOW SCROLL › HIDE TOOLTIP
		document.addEventListener( 'wheel', function(){

			if ( targetPosition != 'fixed' ) hideTooltip();

		});

	}();

}));