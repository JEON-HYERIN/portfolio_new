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

// 새로고침 시 사용자 스크롤 위치 저장하지 않음
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

// loading
const loadingTl = gsap.timeline({
  // paused: true,
  defaults: {
    duration: .6,
  },
  onStart: function() {
    document.body.classList.add('is-loading');
    lenis.stop();
  },
  onComplete: function() {
    lenis.start();
  }
});
loadingTl
.to('.loading', {yPercent: -100, delay: .5, onUpdate: function() {document.body.classList.remove('is-loading');}}, 'a')
.from('.section-visual__background img', {y: '12.5rem', opacity: 0}, 'a+=.6')
.set('.loading', {display: 'none'}, 'b')
.from('.section-visual__headline > span', {yPercent: 100, opacity: 0, stagger: .12}, 'b')
.from('.header__logo a', {y: '3.75rem', opacity: 0}, 'b+=.1')
.from('.section-visual__description', {y: '3.75rem', opacity: 0}, 'b+=.2')
.from('.global-nav__link', {y: '3.75rem', opacity: 0, stagger: .1}, 'b+=.3')
.from('.section-visual__scroll span', {y: '3.75rem', opacity: 0}, 'b+=.3')

// header
window.addEventListener('scroll', function() {
  const headerEl = document.querySelector('.header');
  const visual= document.querySelector('.section-visual');
  const visualOffset = visual.getBoundingClientRect().height;
  const CLASSNAME = 'is-scrolled';

  if(window.scrollY > visualOffset) {
    headerEl.classList.add(CLASSNAME);
  } else {
    headerEl.classList.remove(CLASSNAME);
  }
})

// nav
const navLinks = document.querySelectorAll('.global-nav__link');

navLinks.forEach(function(navLink) {
  const anchor = navLink.getAttribute('href');
  
  navLink.addEventListener('click', () => {
    lenis.scrollTo(anchor);
  });
});

// visual
const scrollBtn = document.querySelector('.section-visual__scroll');

scrollBtn.addEventListener('click', () => {
  lenis.scrollTo('#work');
});

const visualTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.section-visual',
    start: 'center center',
    end: '+=1200',
    scrub: 0,
    // markers: true,
    onUpdate: function(self) {
      const value = self.progress * 25;

      visualTl.from('.section-visual__background img', {x: -value}, 'a');
    }
  }
});
visualTl.to('.section-visual__background', {opacity: 0}, 'a');

window.addEventListener('resize', changeMoveSetHeight);
changeMoveSetHeight();
function changeMoveSetHeight() {
  const changeMoveTexts = document.querySelectorAll('.text-move__word');
  const changeMoveHeight = Math.ceil(changeMoveTexts[0].getBoundingClientRect().height);
  const changeMoveEl = document.querySelector('.text-move');

  changeMoveEl.style.height = changeMoveHeight + 'px';
}

const changeMoveSwiper = new Swiper('.text-move', {
  direction: 'vertical',
  autoplay: true,
  loop: true,
  speed: 500,
  touchRatio: 0,
  disableOnInteraction: false,
  observeParents: true,
  observer: true
})

// matchMedia
let mm = gsap.matchMedia();
mm.add("(min-width: 1000px)", () => {
  gsap.from('.footer__inner', {
    yPercent: '-60',
    scrollTrigger: {
      trigger: '.section-work',
      start: 'bottom bottom',
      endTrigger: '.footer',
      end: '30% center',
      scrub: 0,
      // markers: true
    }
  })
})

// footer
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const yearEl = document.querySelector('.footer__year');
const monthEl = document.querySelector('.footer__month');

yearEl.textContent = year;
monthEl.textContent = monthNames[month].substring(0, 3);

// cursor
const cursor = document.querySelector('.cursor');
const anchorEls = document.querySelectorAll('a');
const CLASSNAME = 'is-hover';

window.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  
  cursor.style.cssText = `top: ${y}px; left: ${x}px;`;
});

anchorEls.forEach(function(el) {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add(CLASSNAME);
  })
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove(CLASSNAME);
  })
});