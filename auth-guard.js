// ============================================================
//  VocaabUZ — Auth Guard
// ============================================================

var _visitLogged = false;

firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    location.href = 'login.html';
    return;
  }

  // storage-utils.js dagi _currentUID ni yangilaymiz
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
