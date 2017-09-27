// Code snippet inspired by https://github.com/douglasrodrigues5/ghost-blog-infinite-scroll
import $ from 'jquery';

let currentPage = 1;
let { pathname } = window.location;
const $document = $(document);
const $result = $('#infinite-load');
const buffer = 300;

let ticking = false;
let isLoading = false;

let lastScrollY = window.scrollY;
let lastWindowHeight = window.innerHeight;
let lastDocumentHeight = $document.height();

// remove hash params from pathname
pathname = pathname.replace(/#(.*)$/g, '').replace('/\//g', '/');

function onScroll() {
  lastScrollY = window.scrollY;
  requestTick();
}

function onResize() {
  lastWindowHeight = window.innerHeight;
  lastDocumentHeight = $document.height();
  requestTick();
}

function requestTick() {
  if (!ticking) {
    window.requestAnimationFrame(infiniteScroll);
  }
  ticking = true;
}

function infiniteScroll() {
  // return if already loading
  if (isLoading || !window.maxPages) {
    return;
  }

  // return if not scroll to the bottom
  if (lastScrollY + lastWindowHeight <= lastDocumentHeight - buffer) {
    ticking = false;
    return;
  }

  // return if currentPage is the last page already
  if (currentPage === window.maxPages) {
    return;
  }

  isLoading = true;

  // next page
  currentPage += 1;

  // Load more
  const nextPage = `${pathname}page/${currentPage}/`;

  $.get(nextPage, (content) => {
    $result.append($(content)
      .find('.first')
      .removeClass('first')
      .end()
      .find('.post')
      .hide()
      .fadeIn(100));
  }).fail((xhr) => {
    // 404 indicates we've run out of pages
    if (xhr.status === 404) {
      window.removeEventListener('scroll', onScroll, { passive: true });
      window.removeEventListener('resize', onResize);
    }
  }).always(() => {
    lastDocumentHeight = $document.height();
    isLoading = false;
    ticking = false;
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onResize);

infiniteScroll();
