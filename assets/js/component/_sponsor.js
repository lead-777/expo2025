export function sponsor() {
  $(window).on('load scroll',function (){
    const target = $('main').offset().top;
    const scroll = $(window).scrollTop();
    if (scroll > target){
      $('.js-sponsor').addClass('is-active');
    }else{
      $('.js-sponsor').removeClass('is-active');
    }
	});
}