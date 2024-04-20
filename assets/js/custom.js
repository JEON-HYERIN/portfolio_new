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


// gnb
const navEls = document.querySelectorAll('.global-nav__item');

navEls.forEach(function(navEl) {
  const anchor = navEl.dataset.anchor;
  
  navEl.addEventListener('click', () => {
    lenis.scrollTo(`#${anchor}`);
  });
});

// visual scroll btn
const scrollBtn = document.querySelector('.section-visual__scroll');

scrollBtn.addEventListener('click', () => {
  lenis.scrollTo('#work');
});

let mm = gsap.matchMedia();
mm.add("(min-width: 700px)", () => {
  gsap.from('.section-work__thumbnail *', {
    yPercent: -3.5,
    scale: 1.1,
    scrollTrigger: {
      trigger: '.section-work__list',
      start: 'top bottom',
      end: 'bottom center',
      scrub: 0,
      // markers: true
    }
  });
});
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
  const cursor = document.querySelector('.cursor');
  
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    cursor.style.cssText = `left: ${x}px; top: ${y}px;`;
  });
  
  const anchorEls = document.querySelectorAll('a');
  const CLASSNAME = 'is-hover';
  anchorEls.forEach(function(el) {
    el.addEventListener('mousemove', () => {
      cursor.classList.add(CLASSNAME);
    })
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove(CLASSNAME);
    })
  });
})

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const yearEl = document.querySelector('.footer__year');
const monthEl = document.querySelector('.footer__month');

yearEl.textContent = year;
monthEl.textContent = monthNames[month].substring(0, 3);

