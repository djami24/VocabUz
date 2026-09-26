// ============================================================
//  VocaabUZ — Auth Guard
// ============================================================

var _visitLogged = false;
var _currentUID  = null;  // Boshqa fayllar uchun global UID

firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    location.href = 'login.html';
    return;
  }

  _currentUID = user.uid;

  // Har kirganda email, name, lastLogin ni Firestore ga yozamiz
  var updateData = { lastLogin: firebase.firestore.FieldValue.serverTimestamp() };
  if (user.email)       updateData.email = user.email;
  if (user.displayName) updateData.name  = user.displayName;
  db.collection('users').doc(user.uid).set(updateData, { merge: true }).catch(function(){});

  // Har sessiyada bir marta visits ga yozamiz
  var sessionKey = 'vz_visit_' + new Date().toDateString();
  if (!_visitLogged && !sessionStorage.getItem(sessionKey)) {
    _visitLogged = true;
    sessionStorage.setItem(sessionKey, '1');
    db.collection('visits').add({
      uid:       user.uid,
      name:      user.displayName || '',
      email:     user.email || '',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function(){});
  }
});

// localStorage kalitlari UID bilan — har profil o'z ma'lumotini saqlaydi
function lsKey(key) {
  return _currentUID ? key + '_' + _currentUID : key;
}
function lsGet(key, def) {
  try { var v = localStorage.getItem(lsKey(key)); return v !== null ? v : def; }
  catch(e) { return def; }
}
function lsSet(key, val) {
  try { localStorage.setItem(lsKey(key), val); } catch(e) {}
}
