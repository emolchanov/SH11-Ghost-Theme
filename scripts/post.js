// NOTE: Scroll performance is poor in Safari
// - this appears to be due to the events firing much more slowly in Safari.
//   Dropping the scroll event and using only a raf loop results in smoother
//   scrolling but continuous processing even when not scrolling
import $ from 'jquery';
import './jquery.fitvids';

window.initPost = (selector) => {
  // Start fitVids
  $(selector).fitVids();
  // End fitVids

  const progressBar = document.querySelector('progress');
  const header = document.querySelector('.floating-header');
  const title = document.querySelector('.post-full-title');

  let lastScrollY = window.scrollY;
  let lastWindowHeight = window.innerHeight;
  let lastDocumentHeight = $(document).height();
  let ticking = false;

  function onScroll() {
    lastScrollY = window.scrollY;
    requestTick();
  }

  function onResize() {
    lastWindowHeight = window.innerHeight;
    lastDocumentHeight = $(document).height();
    requestTick();
  }

  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(update);
    }
    ticking = true;
  }

  function update() {
    const trigger = title.getBoundingClientRect().top + window.scrollY;
    const triggerOffset = title.offsetHeight + 35;
    const progressMax = lastDocumentHeight - lastWindowHeight;

    // show/hide floating header
    if (lastScrollY >= trigger + triggerOffset) {
      header.classList.add('floating-active');
    } else {
      header.classList.remove('floating-active');
    }

    progressBar.setAttribute('max', progressMax);
    progressBar.setAttribute('value', lastScrollY);

    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, false);

  return update();
};

