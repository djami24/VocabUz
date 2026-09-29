/* VocabUZ — qo'shimcha funksiyalar: takrorlash (SRS), kunlik maqsad + streak eslatmasi, taklif havolasi, statistika */
var VZ_REF_DAYS = 3;          // do'st taklif qilinganda beriladigan Premium kunlari (firestore.rules ham 3 kun deb tekshiradi)
var VZ_REMIND_HOUR = 19;      // eslatma soati (kechqurun)
var VZ_INT = [0, 1, 2, 4, 8, 16]; // takrorlash oraliqlari (kun): 1-quti … 5-quti

try { var _m = location.search.match(/[?&]ref=(\w+)/); if (_m) localStorage.setItem('vz_ref', _m[1].toLowerCase()); } catch (e) {}
function vzGetRef() { try { return localStorage.getItem('vz_ref'); } catch (e) { return null; } }
function vzMs(t) { return t && t.toMillis ? t.toMillis() : (Number(t) || 0); }
// Premium: admin bergan isPremium YOKI taklif bonusi hali tugamagan
function vzPrem(d) { return !!d && (!!d.isPremium || vzMs(d.refBonusUntil) > Date.now()); }
function vzDay(d) { d = d || new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }

// ── 1. TAKRORLASH (Leitner tizimi) ─────────────────────────
function vzSrsDue(words, srs) {
  srs = srs || {}; var n = Date.now();
  return words.filter(function (w) { var s = srs[w.id]; return !s || s.d <= n; });
}
function vzSrsUpdate(uid, srs, id, ok) {
  var b = (srs[id] && srs[id].b) || 0, nb = ok ? Math.min(b + 1, 5) : 1;
  var d = Date.now() + (ok ? VZ_INT[nb] * 864e5 : 6e5); // bilmasa — 10 daqiqadan keyin qayta
  srs[id] = { b: nb, d: d };
  var o = {}; o[id] = { b: nb, d: d };
  db.collection('users').doc(uid).set({ srs: o }, { merge: true }).catch(function () {});
}

// ── 2. KUNLIK MAQSAD + STREAK ──────────────────────────────
// Saytda kunlik faollik "activityLog.2026-09-29" degan oddiy kalit bilan yoziladi — shuni obyektga aylantiramiz
function vzLog(d) {
  var log = {}, k; d = d || {};
  for (k in (d.activityLog || {})) log[k] = d.activityLog[k];
  for (k in d) if (k.indexOf('activityLog.') === 0) log[k.slice(12)] = (log[k.slice(12)] || 0) + d[k];
  return log;
}
function vzStreak(log) {
  log = log || {}; var d = new Date(), n = 0;
  if (!(log[vzDay(d)] > 0)) d.setDate(d.getDate() - 1);
  while (log[vzDay(d)] > 0) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
// SVG ikonkalar (emoji o'rniga)
var VZ_ICO = {
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  repeat: '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  gift: '<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
};
function vzIco(n, size, color) {
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="' + (color || 'currentColor') + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;flex-shrink:0">' + VZ_ICO[n] + '</svg>';
}
function vzRenderGoal(d) {
  var el = document.getElementById('vzGoal'); if (!el) return;
  var log = vzLog(d), t = Math.max(0, log[vzDay()] || 0), g = d.dailyGoal || 10, st = vzStreak(log);
  var pct = Math.min(100, Math.round(t / g * 100));
  var late = new Date().getHours() >= VZ_REMIND_HOUR;
  var msg = t >= g ? vzIco('check', 13, '#16A34A') + " Bugungi maqsad bajarildi! Barakalla"
    : (st > 0 && t === 0 && late) ? vzIco('flame', 13, '#F59E0B') + " " + st + " kunlik zanjiringiz uzilmasin — bugun kamida bitta so'z o'rganing!"
    : "Maqsadga " + (g - t) + " ta so'z qoldi";
  var on = localStorage.getItem('vz_remind') === '1';
  el.innerHTML = '<div style="background:#fff;border-radius:16px;padding:14px 16px;margin:0 0 14px;box-shadow:0 1px 4px rgba(33,150,243,.12)">'
    + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px"><b style="font-size:.95rem;display:inline-flex;align-items:center;gap:6px">' + vzIco('target', 18, '#2196F3') + ' Kunlik maqsad</b>'
    + '<span style="font-size:.8rem;font-weight:700;color:#F59E0B;display:inline-flex;align-items:center;gap:4px">' + vzIco('flame', 16, '#F59E0B') + st + ' kun</span></div>'
    + '<div style="height:8px;background:#E3F2FD;border-radius:99px;overflow:hidden"><div style="height:100%;width:' + pct + '%;background:#2196F3;border-radius:99px"></div></div>'
    + '<div style="font-size:.78rem;color:#5A6070;margin:7px 0 10px">' + t + '/' + g + " so'z · " + msg + '</div>'
    + '<div style="display:flex;gap:8px;flex-wrap:wrap">'
    + '<a href="flashcards.html?srs=1" style="flex:1;text-align:center;text-decoration:none;background:#2196F3;color:#fff;font-weight:700;font-size:.8rem;padding:9px;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;gap:6px">' + vzIco('repeat', 15) + ' Takrorlash</a>'
    + '<button onclick="vzSetGoal()" style="border:none;background:#E3F2FD;color:#1565C0;font-weight:700;font-size:.8rem;padding:9px 12px;border-radius:12px;cursor:pointer">Maqsad: ' + g + '</button>'
    + '<button onclick="vzToggleRemind()" style="border:none;background:' + (on ? '#DCFCE7' : '#F1F5F9') + ';color:#5A6070;font-weight:700;font-size:.8rem;padding:9px 12px;border-radius:12px;cursor:pointer;display:inline-flex;align-items:center;gap:6px">' + vzIco('bell', 15) + (on ? 'Yoqilgan' : 'Eslatma') + '</button>'
    + '</div></div>';
}
function vzSetGoal() {
  var v = parseInt(prompt("Kuniga nechta so'z o'rganmoqchisiz? (1–200)", (window.vzUser || {}).dailyGoal || 10), 10);
  if (!(v >= 1 && v <= 200)) return;
  window.vzUser.dailyGoal = v; vzRenderGoal(window.vzUser);
  db.collection('users').doc(firebase.auth().currentUser.uid).set({ dailyGoal: v }, { merge: true }).catch(function () {});
}
function vzToggleRemind() {
  if (!('Notification' in window)) { alert("Bu brauzer bildirishnomalarni qo'llamaydi. Sahifadagi eslatma matni ishlashda davom etadi."); return; }
  if (localStorage.getItem('vz_remind') === '1') { localStorage.removeItem('vz_remind'); vzRenderGoal(window.vzUser); return; }
  Notification.requestPermission().then(function (p) {
    if (p === 'granted') { localStorage.setItem('vz_remind', '1'); vzRemind(); alert('Eslatma yoqildi: saytni ochib turgan bo\'lsangiz, soat ' + VZ_REMIND_HOUR + ':00 dan keyin maqsad bajarilmagan bo\'lsa xabar beramiz.'); }
    vzRenderGoal(window.vzUser);
  });
}
var _vzRemindTimer = null;
function vzRemind() {
  if (!('Notification' in window) || localStorage.getItem('vz_remind') !== '1' || Notification.permission !== 'granted' || _vzRemindTimer) return;
  function check() {
    var u = firebase.auth().currentUser, k = 'vz_rn_' + vzDay();
    if (!u || new Date().getHours() < VZ_REMIND_HOUR || localStorage.getItem(k)) return;
    db.collection('users').doc(u.uid).get().then(function (s) {
      var x = s.data() || {}, t = vzLog(x)[vzDay()] || 0, st = vzStreak(vzLog(x));
      if (t >= (x.dailyGoal || 10)) return;
      localStorage.setItem(k, '1');
      new Notification('VocabUZ', { body: st > 0 ? "🔥 " + st + " kunlik zanjiringiz uzilmasin! Bugungi maqsadni bajaring." : "Bugungi maqsadingizni bajaring 📚" });
    }).catch(function () {});
  }
  _vzRemindTimer = setInterval(check, 300000); check();
}

// ── 3. TAKLIF HAVOLASI (do'st taklif qilsa — Premium bonus) ─
function vzClaimReferral(uid, code) {
  return db.collection('users').where('refCode', '==', code).limit(1).get().then(function (s) {
    if (s.empty || s.docs[0].id === uid) return;
    var rd = s.docs[0], T = firebase.firestore.Timestamp, now = Date.now(), add = VZ_REF_DAYS * 864e5;
    var base = Math.max(now, vzMs(rd.data().refBonusUntil));
    var b = db.batch();
    b.set(db.collection('referrals').doc(uid), { referrerUid: rd.id, code: code, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    b.update(db.collection('users').doc(uid), { referredBy: rd.id, refBonusUntil: T.fromMillis(now + add) });
    b.update(db.collection('users').doc(rd.id), { refCount: firebase.firestore.FieldValue.increment(1), refBonusUntil: T.fromMillis(Math.min(base + add, now + 59 * 864e5)) });
    return b.commit().then(function () { try { localStorage.removeItem('vz_ref'); } catch (e) {} });
  });
}
function vzRenderRef(u, d) {
  var el = document.getElementById('vzReferral'); if (!el || !d.refCode) return;
  var link = location.origin + location.pathname.replace(/[^\/]*$/, '') + 'register.html?ref=' + d.refCode;
  var until = vzMs(d.refBonusUntil), act = until > Date.now() && !d.isPremium;
  el.innerHTML = '<div style="background:#fff;border-radius:16px;padding:16px;margin:0 0 16px;box-shadow:0 1px 4px rgba(33,150,243,.12)">'
    + '<b style="font-size:.95rem;display:inline-flex;align-items:center;gap:6px">' + vzIco('gift', 18, '#2196F3') + ' Do\'stingni taklif qil</b>'
    + '<div style="font-size:.8rem;color:#5A6070;margin:6px 0 10px;line-height:1.5">Havolangiz orqali ro\'yxatdan o\'tgan har bir do\'st uchun sizga ham, unga ham <b>' + VZ_REF_DAYS + ' kun Premium</b> beriladi.</div>'
    + '<input id="vzRefLink" readonly value="' + link + '" style="width:100%;padding:10px;border:1.5px solid #BBDEFB;border-radius:10px;font-size:.78rem;margin-bottom:8px">'
    + '<button id="vzCopyBtn" onclick="vzCopyRef()" style="width:100%;border:none;background:#2196F3;color:#fff;font-weight:700;padding:11px;border-radius:12px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:7px">' + vzIco('copy', 16) + ' Havolani nusxalash</button>'
    + '<div style="font-size:.76rem;color:#9AA0AD;margin-top:9px">Taklif qilinganlar: <b>' + (d.refCount || 0) + '</b>' + (act ? ' · Bonus Premium: <b>' + new Date(until).toLocaleDateString('uz-UZ') + '</b> gacha' : '') + '</div></div>';
}
function vzCopyRef() {
  var i = document.getElementById('vzRefLink'); i.select();
  (navigator.clipboard ? navigator.clipboard.writeText(i.value) : Promise.resolve(document.execCommand('copy'))).then(function () {
    var b = document.getElementById('vzCopyBtn'); if (!b) return;
    b.innerHTML = vzIco('check', 16) + ' Nusxalandi';
    setTimeout(function () { b.innerHTML = vzIco('copy', 16) + ' Havolani nusxalash'; }, 1800);
  });
}

// ── 4. STATISTIKA (qaysi bo'lim necha marta ochilgan) ──────
function vzTrack() {
  var p = (location.pathname.split('/').pop() || 'index.html').replace('.html', '') || 'index';
  var k = 'vz_t_' + p + vzDay();
  try { if (sessionStorage.getItem(k)) return; sessionStorage.setItem(k, '1'); } catch (e) {}
  var s = {}; s[p] = firebase.firestore.FieldValue.increment(1);
  db.collection('stats').doc(vzDay()).set({ sections: s }, { merge: true }).catch(function () {});
}

// ── ISHGA TUSHIRISH ───────────────────────────────────────
var _vzUnsub = null;
firebase.auth().onAuthStateChanged(function (u) {
  if (!u || (typeof _registering !== 'undefined' && _registering)) return;
  vzTrack();
  if (_vzUnsub) _vzUnsub();
  var first = true;
  // onSnapshot: foydalanuvchi hujjati o'zgarishi bilan kartochka darhol yangilanadi
  _vzUnsub = db.collection('users').doc(u.uid).onSnapshot(function (s) {
    var d = s.exists ? s.data() : {}; window.vzUser = d;
    if (first) {
      first = false;
      if (s.exists && !d.refCode) { d.refCode = u.uid.slice(0, 8).toLowerCase(); db.collection('users').doc(u.uid).update({ refCode: d.refCode }).catch(function () {}); }
      vzRemind();
    }
    vzRenderGoal(d); vzRenderRef(u, d);
  }, function () {});
});
// Orqaga (back) tugmasi bilan qaytganda sahifa keshdan chiqadi — qayta chizamiz
window.addEventListener('pageshow', function (e) { if (e.persisted && window.vzUser) { vzRenderGoal(window.vzUser); } });
