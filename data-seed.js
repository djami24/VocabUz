// ============================================================
//  VocaabUZ — Namuna ma'lumotlarni Firestorga yuklash
//  Bu skriptni faqat bir marta brauzer konsolida ishga tushiring:
//  1. Firebase loyihangizni sozlang (firebase-config.js)
//  2. Saytni oching va konsolga: seedData() kiriting
// ============================================================

window.seedData = async function(){
  console.log('Seed boshlandi...');

  // ── Topics ──────────────────────────────────────────────
  const topics = [
    {
      id: 'talim', order: 1, name: "Ta'lim",
      subTopics: [
        { id: 'talim_umumiy',   name: "Ta'lim (umumiy)" },
        { id: 'sinf_iboralar',  name: "Sinfdagi iboralar" },
        { id: 'imtihon',        name: "Imtihonga tayyorlanish va baholash" },
        { id: 'orta_oliy',      name: "O'rta va Oliy ta'lim" },
        { id: 'onlayn_talim',   name: "Onlayn ta'lim" },
        { id: 'organish',       name: "O'rganish uslublari" },
      ]
    },
    {
      id: 'sogliq', order: 2, name: "Sog'liq va jismoniy holat",
      subTopics: [
        { id: 'sogliq_umumiy', name: "Sog'liq (umumiy)" },
        { id: 'kasalliklar',   name: "Kasalliklar va alomatlar" },
        { id: 'sport',         name: "Sport va mashq" },
      ]
    },
    {
      id: 'oziq', order: 3, name: "Oziq-ovqat va Ovqatlanish",
      subTopics: [
        { id: 'ovqat_umumiy', name: "Oziq-ovqat (umumiy)" },
        { id: 'restoran',     name: "Restoran va cafe" },
      ]
    },
    {
      id: 'munosabat', order: 4, name: "Munosabatlar va oila",
      subTopics: [
        { id: 'oila',         name: "Oila a'zolari" },
        { id: 'do_stlik',     name: "Do'stlik va munosabatlar" },
      ]
    },
    {
      id: 'hissiyot', order: 5, name: "Hissiyotlar va xulq-atvor",
      subTopics: [
        { id: 'hissiyot_umumiy', name: "Hissiyotlar" },
        { id: 'xulq',            name: "Xulq-atvor" },
      ]
    },
    {
      id: 'ish', order: 6, name: "Ish va kasb",
      subTopics: [
        { id: 'kasblar',   name: "Kasblar" },
        { id: 'ish_joy',   name: "Ish joyi" },
        { id: 'intervyu',  name: "Intervyu" },
      ]
    },
  ];

  for(const t of topics){
    const { id, ...data } = t;
    await db.collection('topics').doc(id).set(data);
    console.log('Topic:', t.name);
  }

  // ── Words ────────────────────────────────────────────────
  const words = [
    // Ta'lim — umumiy
    { word: 'curriculum',    translation: "o'quv dasturi, ta'lim dasturi",    type: 'noun',      level: 'B2', topicId: 'talim',    subTopic: 'talim_umumiy', order:1,  example: 'A modern curriculum should prepare students for both employment and everyday life.' },
    { word: 'syllabus',      translation: 'kurs rejasi, sillabus',             type: 'noun',      level: 'B2', topicId: 'talim',    subTopic: 'talim_umumiy', order:2,  example: 'The lecturer shared the syllabus before the first class.' },
    { word: 'assessment',    translation: 'baholash, tekshirish',              type: 'noun',      level: 'B2', topicId: 'talim',    subTopic: 'talim_umumiy', order:3,  example: 'Regular assessment helps teachers identify learning gaps early.' },
    { word: 'scholarship',   translation: 'stipendiya, grant',                 type: 'noun',      level: 'B1', topicId: 'talim',    subTopic: 'talim_umumiy', order:4,  example: 'She received a full scholarship to study abroad.' },
    { word: 'graduate',      translation: 'bitirmoq, bitiruvchi',              type: 'verb/noun', level: 'A2', topicId: 'talim',    subTopic: 'talim_umumiy', order:5,  example: 'He graduated from university with honors.' },
    { word: 'tuition',       translation: "o'qitish to'lovi, dars",           type: 'noun',      level: 'B2', topicId: 'talim',    subTopic: 'talim_umumiy', order:6,  example: 'Tuition fees have increased significantly over the past decade.' },
    { word: 'extracurricular', translation: 'darsdan tashqari',               type: 'adj',       level: 'C1', topicId: 'talim',    subTopic: 'talim_umumiy', order:7,  example: 'Extracurricular activities help develop social skills.' },
    { word: 'dissertation',  translation: 'dissertatsiya, ilmiy ish',          type: 'noun',      level: 'C1', topicId: 'talim',    subTopic: 'talim_umumiy', order:8,  example: 'She spent two years writing her doctoral dissertation.' },
    { word: 'plagiarism',    translation: 'plagiat, boshqa ishni o\'g\'irlash', type: 'noun',     level: 'B2', topicId: 'talim',    subTopic: 'talim_umumiy', order:9,  example: 'Plagiarism is a serious academic offence.' },
    { word: 'lecture',       translation: "ma'ruza, dars",                    type: 'noun',      level: 'A2', topicId: 'talim',    subTopic: 'talim_umumiy', order:10, example: 'The professor delivered an interesting lecture on quantum physics.' },

    // Ta'lim — sinf iboralar
    { word: 'elaborate',     translation: "batafsil tushuntirmoq, kengaytirmoq", type: 'verb',   level: 'B2', topicId: 'talim',    subTopic: 'sinf_iboralar', order:1, example: 'Could you elaborate on your point?' },
    { word: 'clarify',       translation: 'aniqlashtirmoq, tushuntirmoq',     type: 'verb',      level: 'B1', topicId: 'talim',    subTopic: 'sinf_iboralar', order:2, example: 'Please clarify what you mean by that.' },
    { word: 'summarise',     translation: 'xulosa qilmoq, qisqartirmoq',      type: 'verb',      level: 'B1', topicId: 'talim',    subTopic: 'sinf_iboralar', order:3, example: 'Can you summarise the main points of the chapter?' },

    // Sog'liq
    { word: 'symptom',       translation: 'belgi, alomat',                    type: 'noun',      level: 'B1', topicId: 'sogliq',   subTopic: 'kasalliklar',   order:1, example: 'The most common symptom of flu is a high temperature.' },
    { word: 'diagnose',      translation: 'tashxis qo\'ymoq',                 type: 'verb',      level: 'B2', topicId: 'sogliq',   subTopic: 'kasalliklar',   order:2, example: 'The doctor diagnosed him with diabetes.' },
    { word: 'prescription',  translation: 'retsept, buyurma',                 type: 'noun',      level: 'B1', topicId: 'sogliq',   subTopic: 'kasalliklar',   order:3, example: 'You will need a prescription to get this medication.' },
    { word: 'immunity',      translation: 'immunitet, chidamlilik',            type: 'noun',      level: 'B2', topicId: 'sogliq',   subTopic: 'sogliq_umumiy', order:1, example: 'Regular exercise boosts your immunity.' },
    { word: 'chronic',       translation: 'surunkali, uzoq davom etuvchi',     type: 'adj',       level: 'B2', topicId: 'sogliq',   subTopic: 'kasalliklar',   order:4, example: 'She has been dealing with chronic back pain for years.' },
    { word: 'rehabilitation', translation: 'reabilitatsiya, tiklanish',        type: 'noun',      level: 'C1', topicId: 'sogliq',   subTopic: 'sogliq_umumiy', order:2, example: 'After the surgery, he needed months of rehabilitation.' },

    // Sport
    { word: 'endurance',     translation: 'chidamlilik, bardoshlilik',         type: 'noun',      level: 'B2', topicId: 'sogliq',   subTopic: 'sport',         order:1, example: 'Marathon running requires great endurance.' },
    { word: 'flexibility',   translation: 'moslashuvchanlik, egiluvchanlik',   type: 'noun',      level: 'B1', topicId: 'sogliq',   subTopic: 'sport',         order:2, example: 'Yoga improves flexibility and reduces stress.' },

    // Ish va kasb
    { word: 'entrepreneur',  translation: 'tadbirkor, biznesmen',              type: 'noun',      level: 'B2', topicId: 'ish',      subTopic: 'kasblar',       order:1, example: 'She became a successful entrepreneur at the age of 25.' },
    { word: 'negotiate',     translation: 'muzokaralar olib bormoq',           type: 'verb',      level: 'B2', topicId: 'ish',      subTopic: 'ish_joy',       order:1, example: 'He managed to negotiate a higher salary.' },
    { word: 'colleague',     translation: 'hamkasb, ishkosh',                  type: 'noun',      level: 'A2', topicId: 'ish',      subTopic: 'ish_joy',       order:2, example: 'My colleagues are very supportive.' },
    { word: 'deadline',      translation: 'muddati, yakuniy sana',             type: 'noun',      level: 'A2', topicId: 'ish',      subTopic: 'ish_joy',       order:3, example: 'We need to meet the deadline by Friday.' },
    { word: 'redundancy',    translation: 'ishdan bo\'shatish (qisqartirish)', type: 'noun',      level: 'C1', topicId: 'ish',      subTopic: 'ish_joy',       order:4, example: 'Many workers faced redundancy during the recession.' },

    // Hissiyotlar
    { word: 'anxious',       translation: 'xavotirli, tashvishli',             type: 'adj',       level: 'B1', topicId: 'hissiyot', subTopic: 'hissiyot_umumiy', order:1, example: 'She felt anxious before the interview.' },
    { word: 'overwhelmed',   translation: 'haddan tashqari bosim ostida',      type: 'adj',       level: 'B2', topicId: 'hissiyot', subTopic: 'hissiyot_umumiy', order:2, example: 'He felt overwhelmed by the amount of work.' },
    { word: 'empathy',       translation: 'empatiya, boshqani his etish',      type: 'noun',      level: 'B2', topicId: 'hissiyot', subTopic: 'hissiyot_umumiy', order:3, example: 'Good leaders show empathy towards their team.' },
    { word: 'resilient',     translation: 'bardoshli, tez tiklanadigan',       type: 'adj',       level: 'C1', topicId: 'hissiyot', subTopic: 'xulq',           order:1, example: 'Children are surprisingly resilient in difficult situations.' },

    // Munosabatlar
    { word: 'compromise',    translation: 'murosa, kelishuv',                  type: 'noun/verb', level: 'B1', topicId: 'munosabat', subTopic: 'do_stlik',     order:1, example: 'A good relationship requires compromise from both sides.' },
    { word: 'reconcile',     translation: 'yarashmog, murosaga kelmoq',        type: 'verb',      level: 'C1', topicId: 'munosabat', subTopic: 'do_stlik',     order:2, example: 'They reconciled after years of disagreement.' },
    { word: 'sibling',       translation: 'aka-uka yoki opa-singil',           type: 'noun',      level: 'A2', topicId: 'munosabat', subTopic: 'oila',         order:1, example: 'Do you have any siblings?' },
  ];

  let count = 0;
  for(const w of words){
    await db.collection('words').add(w);
    count++;
    if(count % 5 === 0) console.log(count + ' ta so\'z yuklandi...');
  }

  // ── TOP 15K so'zlar (namuna — birinchi 30 ta) ───────────
  const top15k = [
    { word: 'the',    type: 'article',        order: 1,  topicId: 'top15k', subTopic: 'top15k' },
    { word: 'be',     type: 'verb',           order: 2,  topicId: 'top15k', subTopic: 'top15k', translation: "bo'lmoq" },
    { word: 'and',    type: 'conjunction',    order: 3,  topicId: 'top15k', subTopic: 'top15k', translation: 'va' },
    { word: 'a',      type: 'article',        order: 4,  topicId: 'top15k', subTopic: 'top15k' },
    { word: 'of',     type: 'preposition',    order: 5,  topicId: 'top15k', subTopic: 'top15k', translation: 'ning, dan' },
    { word: 'in',     type: 'preposition',    order: 7,  topicId: 'top15k', subTopic: 'top15k', translation: 'ichida, da' },
    { word: 'I',      type: 'pronoun',        order: 8,  topicId: 'top15k', subTopic: 'top15k', translation: 'men' },
    { word: 'you',    type: 'pronoun',        order: 9,  topicId: 'top15k', subTopic: 'top15k', translation: 'siz, sen' },
    { word: 'it',     type: 'pronoun',        order: 10, topicId: 'top15k', subTopic: 'top15k', translation: 'u (narsa)' },
    { word: 'have',   type: 'auxiliary verb', order: 11, topicId: 'top15k', subTopic: 'top15k', translation: 'ega bo\'lmoq' },
    { word: 'to',     type: 'preposition',    order: 12, topicId: 'top15k', subTopic: 'top15k', translation: 'ga, uchun' },
    { word: 'for',    type: 'preposition',    order: 14, topicId: 'top15k', subTopic: 'top15k', translation: 'uchun' },
    { word: 'on',     type: 'preposition',    order: 15, topicId: 'top15k', subTopic: 'top15k', translation: 'ustida, da' },
    { word: 'do',     type: 'verb',           order: 16, topicId: 'top15k', subTopic: 'top15k', translation: 'qilmoq' },
    { word: 'say',    type: 'verb',           order: 17, topicId: 'top15k', subTopic: 'top15k', translation: 'demoq' },
    { word: 'this',   type: 'pronoun',        order: 18, topicId: 'top15k', subTopic: 'top15k', translation: 'bu' },
    { word: 'that',   type: 'pronoun',        order: 19, topicId: 'top15k', subTopic: 'top15k', translation: 'u, o\'sha' },
    { word: 'get',    type: 'verb',           order: 20, topicId: 'top15k', subTopic: 'top15k', translation: 'olmoq, bo\'lmoq' },
    { word: 'with',   type: 'preposition',    order: 21, topicId: 'top15k', subTopic: 'top15k', translation: 'bilan' },
    { word: 'go',     type: 'verb',           order: 22, topicId: 'top15k', subTopic: 'top15k', translation: 'bormoq' },
    { word: 'know',   type: 'verb',           order: 23, topicId: 'top15k', subTopic: 'top15k', translation: 'bilmoq' },
    { word: 'think',  type: 'verb',           order: 24, topicId: 'top15k', subTopic: 'top15k', translation: "o'ylamoq" },
    { word: 'come',   type: 'verb',           order: 25, topicId: 'top15k', subTopic: 'top15k', translation: 'kelmoq' },
    { word: 'see',    type: 'verb',           order: 26, topicId: 'top15k', subTopic: 'top15k', translation: "ko'rmoq" },
    { word: 'want',   type: 'verb',           order: 27, topicId: 'top15k', subTopic: 'top15k', translation: 'xohlamoq' },
    { word: 'people', type: 'noun',           order: 28, topicId: 'top15k', subTopic: 'top15k', translation: 'odamlar, xalq' },
    { word: 'give',   type: 'verb',           order: 29, topicId: 'top15k', subTopic: 'top15k', translation: 'bermoq' },
    { word: 'use',    type: 'verb',           order: 30, topicId: 'top15k', subTopic: 'top15k', translation: 'ishlatmoq' },
    { word: 'find',   type: 'verb',           order: 31, topicId: 'top15k', subTopic: 'top15k', translation: 'topmoq' },
    { word: 'tell',   type: 'verb',           order: 32, topicId: 'top15k', subTopic: 'top15k', translation: "aytmoq, so'zlamoq" },
  ];

  for(const w of top15k){
    await db.collection('words').add(w);
    count++;
  }

  console.log('✅ Barcha ma\'lumotlar yuklandi! Jami: ' + count + ' ta so\'z');
};

console.log('data-seed.js yuklandi. Konsolda seedData() funksiyasini chaqiring.');
