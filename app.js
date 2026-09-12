/* DUM-E landing page — progressive enhancement only.
 *
 * Everything here is additive. With JavaScript disabled the page is fully
 * readable and operable: the FAQ is <details>/<summary>, the nav is anchors,
 * the video shows its poster frame, and no content is hidden behind a reveal.
 *
 * Nothing in this file starts motion when the visitor asks for reduced motion
 * (spec §6.2, §7). No analytics, no trackers, no network calls.
 */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── Footer year ─────────────────────────────────────────────────── */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ── Nav: stuck state + current-section marker ───────────────────── */
  var nav = document.getElementById('nav');
  if (nav && 'IntersectionObserver' in window) {
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px';
    document.body.prepend(sentinel);
    new IntersectionObserver(function (entries) {
      nav.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  var navLinks = [].slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));
  if (navLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    var targets = [];
    navLinks.forEach(function (a) {
      var el = document.querySelector(a.getAttribute('href'));
      if (el) { byId[el.id] = a; targets.push(el); }
    });
    var visible = new Set();
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) visible.add(e.target.id); else visible.delete(e.target.id);
      });
      navLinks.forEach(function (a) { a.classList.remove('is-active'); a.removeAttribute('aria-current'); });
      for (var i = 0; i < targets.length; i++) {
        if (visible.has(targets[i].id)) {
          var link = byId[targets[i].id];
          link.classList.add('is-active');
          link.setAttribute('aria-current', 'true');
          break;
        }
      }
    }, { rootMargin: '-56px 0px -55% 0px' });
    targets.forEach(function (t) { spy.observe(t); });
  }

  /* ── FAQ: mirror the native open state onto ARIA ──────────────────
   * <details> already exposes expanded state and works without JS; this
   * adds the explicit aria-expanded / aria-controls pair the spec asks
   * for, and closes siblings so only one answer is open at a time.
   */
  var items = [].slice.call(document.querySelectorAll('.faq .qa'));
  items.forEach(function (d) {
    var summary = d.querySelector('summary');
    var answer = d.querySelector('.qa__a');
    if (!summary || !answer) return;
    summary.setAttribute('aria-expanded', d.open ? 'true' : 'false');
    summary.setAttribute('aria-controls', answer.id);
    d.addEventListener('toggle', function () {
      summary.setAttribute('aria-expanded', d.open ? 'true' : 'false');
      if (!d.open) return;
      items.forEach(function (other) {
        if (other !== d && other.open) other.open = false;
      });
    });
  });

  /* ── Floor loop: opt-in playback with a pixel-styled control ───────
   * The video never autoplays. Under reduced motion the control is not
   * added at all and the poster frame stands in — which is the same
   * still the page would show on a slow connection.
   */
  var vid = document.querySelector('.shot__vid');
  var figure = document.getElementById('floor-loop');
  if (vid && figure && !reduce.matches) {
    var bezel = figure.querySelector('.shot__bezel');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn--sm btn--ghost vidbtn';
    btn.textContent = 'Play the floor';
    btn.setAttribute('aria-pressed', 'false');
    bezel.appendChild(btn);

    var setLabel = function () {
      var playing = !vid.paused && !vid.ended;
      btn.textContent = playing ? 'Pause the floor' : 'Play the floor';
      btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    };
    btn.addEventListener('click', function () {
      if (vid.paused) {
        vid.preload = 'auto';
        var p = vid.play();
        if (p && p.catch) p.catch(function () { /* leave the poster up */ });
      } else {
        vid.pause();
      }
    });
    vid.addEventListener('play', setLabel);
    vid.addEventListener('pause', setLabel);

    /* Stop playback once it scrolls away — no offscreen work. */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting && !vid.paused) vid.pause();
      }, { threshold: 0 }).observe(vid);
    }

    /* If the visitor turns reduced motion on mid-visit, honour it at once. */
    var onReduce = function () {
      if (!reduce.matches) return;
      vid.pause();
      btn.remove();
    };
    if (reduce.addEventListener) reduce.addEventListener('change', onReduce);
    else if (reduce.addListener) reduce.addListener(onReduce);
  }
}());
