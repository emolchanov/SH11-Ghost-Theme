// NOTE: Scroll performance is poor in Safari
// - this appears to be due to the events firing much more slowly in Safari.
//   Dropping the scroll event and using only a raf loop results in smoother
//   scrolling but continuous processing even when not scrolling
import $ from 'jquery';
import './jquery.fitvids';

window.initPage = selector => $(document).ready(() => $(selector).fitVids());
