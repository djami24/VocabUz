const firebaseConfig = {
  apiKey:            "AIzaSyCkMHAAIBEom-mxeo_hmFwguaTxJDLy7rE",
  authDomain:        "vocabuz-f61c1.firebaseapp.com",
  projectId:         "vocabuz-f61c1",
  storageBucket:     "vocabuz-f61c1.firebasestorage.app",
  messagingSenderId: "535277710706",
  appId:             "1:535277710706:web:92e4afea24612ee4c601eb"
};

firebase.initializeApp(firebaseConfig);
const db   = firebase.firestore();
const auth = firebase.auth();
