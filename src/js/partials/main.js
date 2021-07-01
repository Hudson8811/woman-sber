$(document).ready(function() {
	$(document).on('click','.fear, .offer',function (){
		event.preventDefault();
		$(this).toggleClass('rotated')
	});

	$(document).on('click','.fears__btn',function (){
		event.preventDefault();
		fullpage_api.moveSectionDown();
	});

	fearModePC = true;
	detectFun();
})

$(window).on('resize', function () {
	resizeScreen();
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

function resizeScreen(){
	var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	if (detectmob()){
		if (isFirefox){
			$('.fears > *, .offers > *').css('transform','none');
		} else {
			$('.fears > *, .offers > *').css('zoom',1);
		}
	} else {
		let wW = $(window).width();
		let wH = $(window).height();
		let ar =wW/wH;
		console.log(wW);
		console.log(wH);
		console.log(ar);
		let maxAR = 1.9;
		if (ar > maxAR){
			let zoom = 1 - (ar - maxAR)/maxAR;
			if (isFirefox){
				$('.fears > *, .offers > *').css('transform','scale('+zoom+')');
			} else {
				$('.fears > *, .offers > *').css('zoom',zoom);
			}
		} else{
			if (isFirefox){
				$('.fears > *, .offers > *').css('transform','none');
			} else {
				$('.fears > *, .offers > *').css('zoom',1);
			}
		}
	}
	if (typeof swiperFear !== "undefined"){
		swiperFear.update();
	}
	if (typeof swiperOffer !== "undefined"){
		swiperOffer.update();
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
		if (typeof swiperOffer !== "undefined"){
			swiperOffer.destroy(true, true);
		}

		if ($(window).width() < 1025){
			$('.fears__item').addClass('swiper-slide').appendTo('.fears__list');
			$('.fears__slide').remove();
			fearModePC = false;

			if ($('.offers__slider').length){
				swiperOffer = new Swiper('.offers__slider', {
					speed: 800,
					spaceBetween: 0,
					slidesPerView: "auto",
					mousewheel: {
						releaseOnEdges: true,
					},
					pagination: {
						el: '.offers__pagination',
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
			pagination: {
				el: '.fears__pagination',
			},
			breakpoints: {
				1025: {
					freeMode: false,
					allowTouchMove: false,
					slidesPerView: 1,
					spaceBetween: 20,
					loop: true,
				}
			}
		});


	}

	resizeScreen();
}

$(window).on('load',function (){
	$('.home-content__img').removeClass('start');
	setTimeout(function (){
		$('.home-content__img').addClass('loaded');
	},1100);
});