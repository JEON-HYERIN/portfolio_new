// lenis
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0);

// a태그 기본동작 방지
$(function () {
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });
})
