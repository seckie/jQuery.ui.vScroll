/**
 * $.ui.vScroll
 *
 * @Author:    Naoki Sekiguchi (http://likealunatic.jp/)
 * @License:   http://www.opensource.org/licenses/mit-license.html  MIT License
 * @Update:    2011-08-04 21:21:31
 * Depends on:
 *   jQuery (http://jquery.com/)
 *   jQuery UI (http://jqueryui.com/)
 *   jquery-mousewheel (https://github.com/brandonaaron/jquery-mousewheel)
 * Thanks to:
 *   http://www.simonbattersby.com/blog/vertical-scrollbar-using-jquery-ui-slider/ for _buildSlider method
 *   ("Vertical scrollbar using jQuery UI slider | Simon Battersby")
 */

(function($) {

$.widget("ui.vScroll", {
	options : {
		sliderWrapperClassName: "sliderWrap",
		sliderClassName: "sliderVertical"
	},
	_create: function() {
		var $scPane = this.element;
		var $scContent = $('.content', this.element);
		this._buildSlider($scPane, $scContent);
	},
	_buildSlider: function ($scPane, $scContent) {
		$scPane.css('overflow', 'hidden');
		var difference = $scContent.height() - $scPane.height();
		var $slWrap = $('<div/>', { 'class': this.options.sliderWrapperClassName }),
			$slV = $('<div/>', { 'class': this.options.sliderClassName });

		//if the scrollbar is needed, set it up...
		if (difference > 0) {
			$scPane.append($slWrap.append($slV));
			$slWrap.height($scPane.height());

			//set up the slider 
			$slV.slider({
				orientation: 'vertical',
				min: 0,
				max: 100,
				value: 100,
				slide: function(event, ui) {
					var topValue = -((100 - ui.value) * difference / 100);
					$scContent.css({ top: topValue });
				},
				change: function(event, ui) {
					var topValue = -((100 - ui.value) * difference / 100);
					$scContent.css({ top: topValue });
				}
			});

			var proportion = difference / $scContent.height();
			var handleHeight = Math.round((1 - proportion) * $scPane.height());
			handleHeight -= handleHeight % 2;

			var $slHandle = $('.ui-slider-handle', $scPane[0]);
			var slBdWidth = parseInt($slHandle.css('border-top-width'), 10);
			slBdWidth += parseInt($slHandle.css('border-bottom-width'), 10);
			if (isNaN(slBdWidth)) { slBdWidth = 0; } // for IE

			$slHandle.css({
				height: handleHeight,
				'margin-bottom': -0.5 * handleHeight
			});
			var origSlHeight = $slV.height();
			var slHeight = origSlHeight - handleHeight - slBdWidth;
			var slMargin =  (origSlHeight - slHeight + slBdWidth) * 0.5;
			$slV.css({
				height: slHeight,
				'margin-top': slMargin
			});
		}

		//code to handle clicks outside the slider handle
		$slV.click(function(e) {
			e.stopPropagation();
		});

		$slWrap.click(function(e){
			var offsetTop = $(this).offset().top;
			var clickValue = (e.pageY - offsetTop) * 100 / $(this).height();
			$slV.slider("value", 100 - clickValue);
		}); 

		//additional code for mousewheel
		$scContent.mousewheel(mousewheelFunc);
		$slWrap.mousewheel(mousewheelFunc);
		function mousewheelFunc(e, delta) {
			var speed = 5;
			var sliderVal = $slV.slider("value");
			sliderVal += (delta * speed);
			$slV.slider("value", sliderVal);
			e.preventDefault();
		}
	}
});

})(jQuery);

