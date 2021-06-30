$(document).ready(function() {
	$(document).on('click','.fear, .offer',function (){
		event.preventDefault();
		$(this).toggleClass('rotated')
	});

	if ($('.offers__slider').length){
		var swiperOffer = new Swiper('.offers__slider', {
			speed: 800,
			spaceBetween: 0,
			slidesPerView: "auto",
			mousewheel: {
				releaseOnEdges: true,
			},
			on:{
				reachBeginning: function () {
					if (!detectmob()) {
						setTimeout(function () {
							fullpage_toggle(true,'up');
						},100)
					}
				},
				reachEnd: function () {
					if (!detectmob()) {
						setTimeout(function () {
							fullpage_toggle(true,'down');
						},100);
					}
				},
				fromEdge: function () {
					fullpage_toggle(false,'up');
				},
				resize: function () {
					$('.swiper-wrapper').height('');
				}
			},
			breakpoints: {
				1025: {
					allowTouchMove: false,
					loop: false,
					freeMode: true
				},
			}
		});
	}
	fearModePC = true;
	detectFun();
})

$(window).on('resize', function () {
	if (detectmob() && fearModePC){
		$.fn.fullpage.destroy('all');
		detectFun();
	}
	if (!detectmob() && !fearModePC){
		detectFun();
	}
});


function fullpage_toggle(toggle, direction) {
	$.fn.fullpage.setAllowScrolling(toggle, direction);
	$.fn.fullpage.setKeyboardScrolling(toggle, direction);
}

function detectmob() {
	if (navigator.userAgent.match(/Android/i) ||
			navigator.userAgent.match(/webOS/i) ||
			navigator.userAgent.match(/iPhone/i) ||
			navigator.userAgent.match(/iPad/i) ||
			navigator.userAgent.match(/iPod/i) ||
			navigator.userAgent.match(/BlackBerry/i) ||
			navigator.userAgent.match(/Windows Phone/i) ||
			$( window ).width() < 1024
	) {
		return true;
	} else {
		return false;
	}
}


function detectFun(){
	if (detectmob()) {

	} else {
		$('#fullpage').fullpage({
			licenseKey: '930B3D8E-64114A48-BE58EB40-E2698A87',
			scrollingSpeed: 600,
			navigation: false,
			verticalCentered: false,
			onLeave: function (origin, destination, direction) {
				let footer = $('.footer');
				if(destination.index == 0){
					footer.addClass('footer--home');
					$('.home-content__img').removeClass('active');
				} else {
					footer.removeClass('footer--home');
					$('.home-content__img').addClass('active');
				}
			}
		});
	}

	if ($('.fears__slider').length){


		if (typeof swiperFear !== "undefined"){
			swiperFear.destroy(true, true);
		}

		if ($(window).width() < 1025){
			$('.fears__item').addClass('swiper-slide').appendTo('.fears__list');
			$('.fears__slide').remove();
			fearModePC = false;
		} else {
			if (!fearModePC) {

				$('.fears__list').append('<div class="fears__slide swiper-slide" data-slide="1"></div><div class="fears__slide swiper-slide" data-slide="2"></div><div class="fears__slide swiper-slide" data-slide="3"></div>');
				$('.fears__item').removeClass('swiper-slide').each(function (index){
					if (index === 0 || index === 1 ){
						$(this).appendTo('.fears__slide[data-slide="1"]');
					} else if (index === 2 || index === 3){
						$(this).appendTo('.fears__slide[data-slide="2"]');
					} else {
						$(this).appendTo('.fears__slide[data-slide="3"]');
					}
				});
			}
			fearModePC = true;
		}

		swiperFear = new Swiper('.fears__slider', {
			speed: 800,
			spaceBetween: 0,
			slidesPerView: "auto",
			navigation: {
				nextEl: ".fears__arrow--right",
				prevEl: ".fears__arrow--left",
			},
			loop: false,
			breakpoints: {
				1025: {
					freeMode: false,
					allowTouchMove: false,
					slidesPerView: 1,
					loopAdditionalSlides: 3,
					spaceBetween: 20,
					loop: true,
				}
			}
		});
	}
}