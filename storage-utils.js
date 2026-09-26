// ============================================================
//  VocabUZ — Storage Utils
//  UID asosida localStorage — har profil o'z ma'lumotini saqlaydi
// ============================================================
var _currentUID = null;

function lsKey(key) {
  return _currentUID ? key + '_' + _currentUID : key;
}
function lsGet(key, def) {
  try { var v = localStorage.getItem(lsKey(key)); return v !== null ? v : (def !== undefined ? def : null); }
  catch(e) { return def !== undefined ? def : null; }
}
function lsSet(key, val) {
  try { localStorage.setItem(lsKey(key), val); } catch(e) {}
}
