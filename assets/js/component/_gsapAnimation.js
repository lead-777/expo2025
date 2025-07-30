export function gsapAnimation() {
  gsap.registerPlugin(ScrollTrigger);
  const isMobile = window.innerWidth < 1025;

  document.querySelectorAll('.js-rotate').forEach((el) => {
    const rotationAmount = gsap.utils.random(10, 180);
    gsap.to(el, {
      rotation: rotationAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2
      }
    });
  });
  document.querySelectorAll('.js-move-x').forEach((el) => {
    const moveX = gsap.utils.random(-100, 100);
    gsap.to(el, {
      x: moveX,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2
      }
    });
  });

  if (!isMobile) {
    gsap.to(".js-zoom-target", {
      scale: 1.13,
      scrollTrigger: {
        trigger: ".js-zoom-section",
        start: "center center",
        end: "+=100%",
        scrub: 2,
        pin: true,
      }
    });
  }
}