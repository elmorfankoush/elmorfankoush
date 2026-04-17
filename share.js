/* ══════════════════════════════════════════
   علم ولا فنكوش؟ — share.js
   ══════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── URL بيتحدث لما تتغير الحلقة عشان الشير يبعت الرابط الصح ── */
  var _origLoad = null;
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof loadEpisode === 'function') {
      _origLoad = loadEpisode;
      window.loadEpisode = function (ep) {
        _origLoad(ep);
        window.history.pushState({ ep: ep }, '', '?ep=' + ep);
      };
    }
    /* لو فيه ?ep= في الـ URL عند التحميل → حمّل الحلقة دي */
    var ep = parseInt(new URLSearchParams(window.location.search).get('ep'), 10);
    if (ep >= 1 && ep <= 13) {
      setTimeout(function () {
        if (typeof loadEpisode === 'function') loadEpisode(ep);
      }, 100);
    }
  });

  window.addEventListener('popstate', function (e) {
    var ep = e.state && e.state.ep;
    if (ep && typeof loadEpisode === 'function') loadEpisode(ep);
  });

  /* ── show/hide زرار الشير ── */
  window.showShareBtn = function () {
    var t = document.getElementById('shareTrigger');
    if (t) t.classList.add('share-on');
  };

  window.hideShareBtn = function () {
    var t = document.getElementById('shareTrigger');
    if (t) t.classList.remove('share-on');
    closeMenu();
  };

  /* ── toggle القائمة ── */
  window.toggleShareMenu = function (e) {
    if (e) e.stopPropagation();
    var m = document.getElementById('shareMenu');
    if (!m) return;
    m.classList.contains('open') ? closeMenu() : openMenu();
  };

  function openMenu() {
    var t = document.getElementById('shareTrigger');
    var m = document.getElementById('shareMenu');
    if (!t || !m) return;

    var r  = t.getBoundingClientRect();
    var mw = 168;
    var mh = 130;

    var left = r.left + r.width / 2 - mw / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - mw - 8));

    var top = r.top > mh + 16 ? r.top - mh - 8 : r.bottom + 8;

    m.style.left  = left + 'px';
    m.style.top   = top  + 'px';
    m.style.width = mw   + 'px';
    m.classList.add('open');
  }

  function closeMenu() {
    var m = document.getElementById('shareMenu');
    if (m) m.classList.remove('open');
  }

  /* إغلاق عند النقر بره أو scroll/resize */
  document.addEventListener('click', function (e) {
    var t = document.getElementById('shareTrigger');
    var m = document.getElementById('shareMenu');
    if (!m) return;
    if (t && t.contains(e.target)) return;
    if (m && m.contains(e.target)) return;
    closeMenu();
  });
  window.addEventListener('scroll', closeMenu, { passive: true });
  window.addEventListener('resize', closeMenu, { passive: true });

  /* ── رسالة المشاركة — بتشيل اسم المسار لو اتاختار ── */
  function buildMsg() {
    if (window._userChoice === 'elm')      return 'اخترت مسار العلم... وانت هتختار إيه؟';
    if (window._userChoice === 'fankoush') return 'اخترت مسار الفنكوش... وانت هتختار إيه؟';
    return 'علم ولا فنكوش؟ — جرّب وصوّت!';
  }

  /* ── doShare — URL فيه رقم الحلقة دايمًا ── */
  window.doShare = function (type) {
    var epNum = window._currentEpNum || 1;
    /* رابط نظيف بيودّي للحلقة مباشرة */
    var url = 'https://elmorfankoush.github.io/elmorfankoush/?ep=' + epNum;
    var msg = buildMsg();

    if (type === 'whatsapp') {
      window.open('https://wa.me/?text=' + encodeURIComponent(msg + '\n' + url), '_blank');
      closeMenu();

    } else if (type === 'facebook') {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blank');
      closeMenu();

    } else if (type === 'copy') {
      var btn      = document.getElementById('shareCopyBtn');
      var origHTML = btn ? btn.innerHTML : '';
      function done() {
        if (btn) {
          btn.innerHTML = '<span>✅</span> تم النسخ!';
          setTimeout(function () { btn.innerHTML = origHTML; }, 2000);
        }
        closeMenu();
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(function () {
          fallbackCopy(url); done();
        });
      } else {
        fallbackCopy(url); done();
      }
    }
  };

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand('copy'); } catch (_) {}
    document.body.removeChild(ta);
  }

})();
