export function gsapAnimation() {
  gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.js-rotate').forEach((el) => {
  const rotationAmount = gsap.utils.random(10, 180);
  gsap.to(el, {
    rotation: rotationAmount,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',   // 要素の上端が画面下に入ったら開始
      end: 'bottom top',     // 要素の下端が画面上に出たら終了
      scrub: 2            // スクロールと連動
    }
  });
});
}