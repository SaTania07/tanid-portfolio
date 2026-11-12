(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Nav: mobile menu + border on scroll
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.burger');
  var links = document.querySelector('.links');
  if (burger && links) {
    burger.addEventListener('click', function(){
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ links.classList.remove('open'); }); });
  }
  if (nav) {
    var onScroll = function(){ nav.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  }

  // Reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function(el){ el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:.12});
    els.forEach(function(el){ io.observe(el); });
  }

  // Videos: muted inline autoplay only while visible, never with reduced motion
  var vids = document.querySelectorAll('video[data-autoplay]');
  if (!reduce && 'IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        var v = e.target;
        if (e.isIntersecting) { if (!v.dataset.userPaused) { v.muted = true; var p = v.play(); if (p && p.catch) p.catch(function(){}); } }
        else if (!v.paused) { v.pause(); }
      });
    }, {threshold:.5});
    vids.forEach(function(v){
      v.addEventListener('pause', function(){ if (v.dataset.visible === '1') v.dataset.userPaused = '1'; });
      v.addEventListener('play', function(){ delete v.dataset.userPaused; });
      vio.observe(v);
    });
    var vis = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ e.target.dataset.visible = e.isIntersecting ? '1' : '0'; });
    }, {threshold:.5});
    vids.forEach(function(v){ vis.observe(v); });
  }

  // Lightbox
  var lb = document.querySelector('.lb');
  if (lb) {
    var img = lb.querySelector('img');
    var closeBtn = lb.querySelector('.lb-close');
    var last = null;
    var close = function(){ lb.classList.remove('open'); img.removeAttribute('src'); if (last) last.focus(); };
    document.querySelectorAll('[data-full]').forEach(function(b){
      b.addEventListener('click', function(){
        last = b; img.className = b.getAttribute('data-lb') || ''; img.src = b.getAttribute('data-full'); img.alt = b.getAttribute('data-alt') || '';
        lb.classList.add('open'); closeBtn.focus();
      });
    });
    closeBtn.addEventListener('click', close);
    lb.addEventListener('click', function(e){ if (e.target === lb) close(); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && lb.classList.contains('open')) close(); });
  }

  document.querySelectorAll('.year').forEach(function(y){ y.textContent = new Date().getFullYear(); });
})();
