$(function() {

	$.extend({
		index: {}
	})
	$.extend($.index, {
		init: function() {
			$.index.wholePage();
		},
		wholePage: function() {
			var index = 0;
			var pageHeight = $(window).height();
			var bigHeight = $('.pages>li').length * pageHeight;
			
			//初始化页面高度
			$('.pages>li').css('height', pageHeight)
			$('.pages').css('height', bigHeight)

			//生成点,并设定点位置
			for(var i = 0; i < $('.pages>li').length; i++) {
				$('.dots').append('<li></li>');
			}
			var dotsHeight = $('.pages>li').length * 25;
			$('.dots').css('top', `calc(50% - ${dotsHeight / 2}px)`);
			
			dotState(index)
			
			//悬浮点页面跳转
			$('.dots>li').hover(function() {
				index = $(this).index();
				dotState(index);
				pageState();
			})

			var start = new Date();
			function move(isDown) {
				if(new Date() - start > 1000) {
					if(isDown) {
						if(index === $('.pages>li').length - 1) {
							return false;
						}
						index++;
					} else {
						if(index === 0) {
							return false;
						}
						index--;
					}
					pageState()
					dotState(index)
					start = new Date();
				}
			}
			
			function pageState() {
				$('.pages').css('transform', `translateY(-${index * $(window).height()}px)`)
			}

			function dotState(index) {
				$('.dots>li').eq(index).addClass('active').siblings().removeClass('active');
			}

			if(window.onmousewheel === null) {
				window.onmousewheel = function(e) {
					console.log(e.wheelDelta)
					var isDown = e.wheelDelta < 0 ? true : false;
					move(isDown)
				}
			} else {
				window.addEventListener('DOMMouseScroll', function(e) {
					console.log('firefox')
				})
			}

		}
	})

	$.index.init();

})