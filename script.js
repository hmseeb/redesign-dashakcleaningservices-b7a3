/* ==========================================================================
   DASHAK Cleaning Services — interactions
   Vanilla JS, no dependencies, no external APIs.
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var MOBILE_QUERY = '(max-width: 980px)';
  var isMobile = function () { return window.matchMedia(MOBILE_QUERY).matches; };

  /* ---------------- Sticky header state ---------------- */
  var header = doc.getElementById('siteHeader');
  var toTop = doc.getElementById('toTop');

  function onScroll() {
    var y = window.pageYOffset || doc.documentElement.scrollTop;
    if (header) header.classList.toggle('is-stuck', y > 8);
    if (toTop) toTop.classList.toggle('is-visible', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------- Mobile navigation ---------------- */
  var burger = doc.getElementById('burger');
  var nav = doc.getElementById('primaryNav');

  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    doc.body.classList.remove('nav-open');
  }

  function openNav() {
    if (!nav || !burger) return;
    nav.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
    doc.body.classList.add('nav-open');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) { closeNav(); } else { openNav(); }
    });

    nav.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('a') : null;
      if (link && isMobile()) closeNav();
    });

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    doc.addEventListener('click', function (e) {
      if (!isMobile() || !nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || burger.contains(e.target)) return;
      closeNav();
    });

    window.addEventListener('resize', function () {
      if (!isMobile()) closeNav();
    });
  }

  /* ---------------- Dropdown submenus ---------------- */
  var toggles = doc.querySelectorAll('.nav__toggle');
  Array.prototype.forEach.call(toggles, function (btn) {
    var panel = doc.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click', function (e) {
      if (!isMobile()) return;          // desktop uses hover/focus CSS
      e.preventDefault();
      var open = btn.getAttribute('aria-expanded') === 'true';
      // close siblings
      Array.prototype.forEach.call(toggles, function (other) {
        if (other === btn) return;
        other.setAttribute('aria-expanded', 'false');
        var op = doc.getElementById(other.getAttribute('aria-controls'));
        if (op) op.classList.remove('is-open');
      });
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      if (panel) panel.classList.toggle('is-open', !open);
    });
  });

  /* ---------------- FAQ: one open at a time ---------------- */
  var faqItems = doc.querySelectorAll('.faq__item');
  Array.prototype.forEach.call(faqItems, function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      Array.prototype.forEach.call(faqItems, function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------------- Scroll reveal ---------------- */
  var revealables = doc.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(revealables, function (el, i) {
      el.style.transitionDelay = (Math.min(i % 4, 3) * 80) + 'ms';
      io.observe(el);
    });
  } else {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
  }

  /* ---------------- Active section highlighting ---------------- */
  var navLinks = doc.querySelectorAll('.nav__list > li > a[href^="#"]');
  var sections = [];
  Array.prototype.forEach.call(navLinks, function (link) {
    var target = doc.querySelector(link.getAttribute('href'));
    if (target) sections.push({ link: link, el: target });
  });

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sections.forEach(function (s) {
          s.link.classList.toggle('is-active', s.el === entry.target);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s.el); });
  }

  /* ---------------- Quote form ---------------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var BUSINESS_EMAIL = 'support@dashakcleaningservices.com';

  function setNote(node, message, isError) {
    if (!node) return;
    node.textContent = message;
    node.classList.toggle('is-error', !!isError);
  }

  var quoteForm = doc.getElementById('quoteForm');
  var formNote = doc.getElementById('formNote');

  if (quoteForm) {
    // clear invalid styling as the user types
    Array.prototype.forEach.call(quoteForm.querySelectorAll('input, select, textarea'), function (el) {
      el.addEventListener('input', function () { el.classList.remove('is-invalid'); });
    });

    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = quoteForm.elements.name;
      var phone = quoteForm.elements.phone;
      var email = quoteForm.elements.email;
      var city = quoteForm.elements.city;
      var service = quoteForm.elements.service;
      var details = quoteForm.elements.details;

      var invalid = [];
      if (!name.value.trim()) invalid.push(name);
      if (!phone.value.trim()) invalid.push(phone);
      if (!EMAIL_RE.test(email.value.trim())) invalid.push(email);

      invalid.forEach(function (el) { el.classList.add('is-invalid'); });

      if (invalid.length) {
        setNote(formNote, 'Please add your name, phone number and a valid email address.', true);
        invalid[0].focus();
        return;
      }

      var lines = [
        'Name: ' + name.value.trim(),
        'Phone: ' + phone.value.trim(),
        'Email: ' + email.value.trim(),
        'City: ' + city.value,
        'Service: ' + service.value,
        '',
        'Details:',
        (details.value.trim() || '(none provided)')
      ];

      var subject = 'Free quote request — ' + service.value + ' in ' + city.value;
      var href = 'mailto:' + BUSINESS_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));

      setNote(formNote, 'Opening your email app to send this request to ' + BUSINESS_EMAIL + '. Prefer to talk? Call +1-682-529-6113.', false);
      window.location.href = href;
    });
  }

  /* ---------------- Newsletter ---------------- */
  var newsForm = doc.getElementById('newsForm');
  var newsNote = doc.getElementById('newsNote');

  if (newsForm) {
    newsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = newsForm.elements.email;
      var value = input.value.trim();
      if (!EMAIL_RE.test(value)) {
        setNote(newsNote, 'Please enter a valid email address.', true);
        input.focus();
        return;
      }
      var href = 'mailto:' + BUSINESS_EMAIL +
        '?subject=' + encodeURIComponent('Newsletter subscription') +
        '&body=' + encodeURIComponent('Please subscribe this address to the DASHAK newsletter: ' + value);
      setNote(newsNote, 'Opening your email app to confirm your subscription.', false);
      window.location.href = href;
    });
  }

  /* ---------------- Footer year ---------------- */
  var yearEl = doc.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
