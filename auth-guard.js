// ============================================================
//  VocaabUZ — Auth Guard
//  Bu fayl Firebase yuklangandan KEYIN ishlaydi.
//  Agar foydalanuvchi login qilmagan bo'lsa — login.htmlga yuboradi.
// ============================================================
firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    location.href = 'login.html';
  }
});
