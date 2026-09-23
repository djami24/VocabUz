// ============================================================
//  VocaabUZ — Firebase Configuration
//  Firebase Console → Project Settings → Your apps → Web app
//  Quyidagi qiymatlarni o'zingiznikiga almashtiring
// ============================================================

const firebaseConfig = {
  apiKey:            "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain:        "loyiha-id.firebaseapp.com",
  projectId:         "loyiha-id",
  storageBucket:     "loyiha-id.appspot.com",
  messagingSenderId: "123456789012",
  appId:             "1:123456789012:web:abcdef1234567890"
};

firebase.initializeApp(firebaseConfig);
const db   = firebase.firestore();
const auth = firebase.auth();
