// ============================================================
//  VocaabUZ — Auth Guard
//  Bu fayl Firebase yuklangandan KEYIN ishlaydi.
//  Agar foydalanuvchi login qilmagan bo'lsa — login.htmlga yuboradi.
// ============================================================

// Faqat login sahifasida visit yozamiz (takrorlanmasin)
var _visitLogged = false;

firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    location.href = 'login.html';
    return;
  }

  // Har sessiyada bir marta kirish vaqtini yozamiz
  // localStorage orqali bir sahifadan boshqasiga o'tganda qayta yozilmaydi
  var sessionKey = 'vz_visit_' + new Date().toDateString();
  if (!_visitLogged && !sessionStorage.getItem(sessionKey)) {
    _visitLogged = true;
    sessionStorage.setItem(sessionKey, '1');
    try {
      db.collection('visits').add({
        uid:       user.uid,
        name:      user.displayName || '',
        email:     user.email || '',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).catch(function(){});
    } catch(e) {}
  }
});
