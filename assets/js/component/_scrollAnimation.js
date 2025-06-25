export function scrollAnimation() {
  $(window).on('load scroll',function (){
		$('.js-animation').each(function(){
			const target = $(this).offset().top;
			const scroll = $(window).scrollTop();
			const height = $(window).height();
			if (scroll > target - height){
				$(this).addClass('is-active');
			}
		});
	});
}