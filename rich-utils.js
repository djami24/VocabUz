/* ═══════════════════════════════════════════════════════
   rich-utils.js — formatlangan matn (Word'dagidek) uchun
   xavfsiz tozalagich. admin.html (saqlashda) va
   writing.html (ko'rsatishda) ikkalasida ishlatiladi.
   Faqat ruxsat etilgan teglar va atributlar qoladi.
═══════════════════════════════════════════════════════ */
(function (global) {
  var ALLOWED = {
    P:1, BR:1, H1:1, H2:1, H3:1, H4:1,
    STRONG:1, B:1, EM:1, I:1, U:1, S:1, STRIKE:1, SUB:1, SUP:1, MARK:1, SPAN:1,
    UL:1, OL:1, LI:1, BLOCKQUOTE:1, HR:1, DIV:1, A:1,
    TABLE:1, THEAD:1, TBODY:1, TR:1, TD:1, TH:1
  };
  var DROP = {
    SCRIPT:1, STYLE:1, IFRAME:1, OBJECT:1, EMBED:1, LINK:1, META:1, IMG:1,
    SVG:1, FORM:1, INPUT:1, BUTTON:1, TEXTAREA:1, SELECT:1, VIDEO:1, AUDIO:1,
    CANVAS:1, NOSCRIPT:1, TEMPLATE:1, BASE:1, HEAD:1, TITLE:1
  };
  var STYLE_OK = {
    'color':1, 'background-color':1, 'font-weight':1, 'font-style':1,
    'text-decoration':1, 'text-align':1
  };

  function cleanStyle(s) {
    var out = [];
    String(s || '').split(';').forEach(function (d) {
      var i = d.indexOf(':');
      if (i < 0) return;
      var k = d.slice(0, i).trim().toLowerCase();
      var v = d.slice(i + 1).trim();
      if (!STYLE_OK[k]) return;
      if (!/^[#a-z0-9(),.\s%-]+$/i.test(v)) return;
      if (/url|expression|javascript/i.test(v)) return;
      out.push(k + ':' + v);
    });
    return out.join(';');
  }

  function copyAttrs(from, to, tag) {
    if (tag === 'A') {
      var href = (from.getAttribute('href') || '').trim();
      if (/^(https?:|mailto:)/i.test(href)) {
        to.setAttribute('href', href);
        to.setAttribute('target', '_blank');
        to.setAttribute('rel', 'noopener noreferrer');
      }
    }
    if (tag === 'TD' || tag === 'TH') {
      ['colspan', 'rowspan'].forEach(function (a) {
        var v = from.getAttribute(a);
        if (v && /^\d{1,2}$/.test(v)) to.setAttribute(a, v);
      });
    }
    var st = from.getAttribute('style');
    if (st) {
      var c = cleanStyle(st);
      if (c) to.setAttribute('style', c);
    }
  }

  function walk(from, to) {
    Array.prototype.forEach.call(from.childNodes, function (n) {
      if (n.nodeType === 3) { to.appendChild(document.createTextNode(n.nodeValue)); return; }
      if (n.nodeType !== 1) return;
      var tag = n.tagName.toUpperCase();
      if (DROP[tag]) return;
      if (ALLOWED[tag]) {
        var el = document.createElement(tag.toLowerCase());
        copyAttrs(n, el, tag);
        walk(n, el);
        to.appendChild(el);
      } else {
        walk(n, to); // noma'lum teg — faqat ichidagi matnni saqlaymiz
      }
    });
  }

  global.sanitizeRichHtml = function (html) {
    var src = new DOMParser().parseFromString('<body>' + String(html || '') + '</body>', 'text/html').body;
    var out = document.createElement('div');
    walk(src, out);
    return out.innerHTML;
  };

  global.richTextLength = function (html) {
    var d = document.createElement('div');
    d.innerHTML = html || '';
    return (d.textContent || '').replace(/\s+/g, ' ').trim().length;
  };
})(window);
