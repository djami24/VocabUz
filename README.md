# VocaabUZ — Ingliz tili lug'at sayti

## Fayl strukturasi

```
vocaabuz/
├── index.html          ← Asosiy sahifa
├── login.html          ← Kirish
├── register.html       ← Ro'yxatdan o'tish
├── topic.html          ← Topic vocabulary ro'yxati
├── vocab.html          ← Mavzu ichidagi so'zlar
├── top15k.html         ← TOP 15K so'zlar
├── search.html         ← Qidirish
├── mywords.html        ← Saqlangan so'zlar
├── profile.html        ← Profil
├── style.css           ← Barcha stillar
├── firebase-config.js  ← Firebase sozlash (TO'LDIRING)
├── data-seed.js        ← Namuna ma'lumotlar
└── README.md
```

## 1. Firebase sozlash

1. [Firebase Console](https://console.firebase.google.com) ga kiring
2. Yangi loyiha yarating
3. **Authentication** → **Sign-in method** → **Email/Password** yoqing
4. **Firestore Database** yarating (Production mode)
5. **Project Settings** → **Web app** qo'shing
6. `firebase-config.js` faylini oching va o'z ma'lumotlaringizni kiriting:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  ...
};
```

## 2. Firestore Rules

Firebase Console → Firestore → Rules ga quyidagini qo'ying:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Words va Topics — hamma o'qiy oladi
    match /words/{id} {
      allow read: if request.auth != null;
      allow write: if false; // faqat admin
    }
    match /topics/{id} {
      allow read: if request.auth != null;
      allow write: if false;
    }
    // User profili — faqat o'zi
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## 3. Namuna ma'lumotlarni yuklash

1. Saytni oching (GitHub Pages yoki local)
2. Brauzer konsolini oching (F12)
3. `data-seed.js` ni sahifaga qo'shing yoki:
```js
// Konsol ichida:
seedData()
```

## 4. GitHub Pages ga deploy

1. GitHub da yangi repository yarating
2. Barcha fayllarni yuklang
3. **Settings → Pages → Branch: main** tanlang
4. Sayt tayyor!

## Keyingi qo'shimchalar (keyingi bosqich)

- [ ] `word.html` — so'z detail sahifasi
- [ ] `lugat.html` — rasmli lug'at
- [ ] `speaking.html` — Speaking vocabulary
- [ ] `writing.html` — Writing vocabulary
- [ ] `roadmap.html` — Yo'l xaritasi
- [ ] Admin panel — so'z qo'shish/tahrirlash
