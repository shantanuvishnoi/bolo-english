export interface Sentence {
  hindi: string;
  english: string;
}

export interface LessonMeta {
  id: string;
  levelId: number;
  title: string;
  subtitle: string;
  total: number;
  seedCompleted: number; // pre-filled progress for Phase 1 demo
}

export const LESSONS: LessonMeta[] = [
  // ── Level 1 ─────────────────────────────────────────────────────────────
  { id: 'l1', levelId: 1, title: 'Apna introduction do', subtitle: 'Reading', total: 10, seedCompleted: 5 },
  { id: 'l2', levelId: 1, title: 'Family ke baare mein batao', subtitle: 'Reading', total: 10, seedCompleted: 0 },
  { id: 'l3', levelId: 1, title: 'Apna kaam batao', subtitle: 'Speaking', total: 10, seedCompleted: 0 },

  // ── Level 2 ─────────────────────────────────────────────────────────────
  { id: 'l4', levelId: 2, title: 'Roz ki zindagi batao', subtitle: 'Reading', total: 10, seedCompleted: 0 },
  { id: 'l5', levelId: 2, title: 'Khana aur peena', subtitle: 'Reading', total: 10, seedCompleted: 0 },
  { id: 'l6', levelId: 2, title: 'Safar ka plan', subtitle: 'Speaking', total: 10, seedCompleted: 0 },

  // ── Level 3 ─────────────────────────────────────────────────────────────
  { id: 'l7', levelId: 3, title: 'Shopping karna seekho', subtitle: 'Reading', total: 10, seedCompleted: 0 },
  { id: 'l8', levelId: 3, title: 'Dost aur milna', subtitle: 'Speaking', total: 10, seedCompleted: 0 },
  { id: 'l9', levelId: 3, title: 'Health aur fitness', subtitle: 'Reading', total: 10, seedCompleted: 0 },
];

export const LESSON_SENTENCES: Record<string, Sentence[]> = {
  // ── Level 1 ─────────────────────────────────────────────────────────────
  l1: [
    { hindi: 'Mera naam Rahul hai.', english: 'My name is Rahul.' },
    { hindi: 'Main India se hoon.', english: 'I am from India.' },
    { hindi: 'Mujhe English seekhna hai.', english: 'I want to learn English.' },
    { hindi: 'Aap kaise hain?', english: 'How are you?' },
    { hindi: 'Main theek hoon, shukriya.', english: 'I am fine, thank you.' },
    { hindi: 'Meri umar 25 saal hai.', english: 'I am 25 years old.' },
    { hindi: 'Main Delhi mein rehta hoon.', english: 'I live in Delhi.' },
    { hindi: 'Mujhe movies dekhna pasand hai.', english: 'I like watching movies.' },
    { hindi: 'Main ek student hoon.', english: 'I am a student.' },
    { hindi: 'Aapka naam kya hai?', english: 'What is your name?' },
  ],
  l2: [
    { hindi: 'Mere paas ek bhai hai.', english: 'I have one brother.' },
    { hindi: 'Meri maa ghar par hain.', english: 'My mother is at home.' },
    { hindi: 'Hamara parivaar chota hai.', english: 'Our family is small.' },
    { hindi: 'Mere papa doctor hain.', english: 'My father is a doctor.' },
    { hindi: 'Meri ek behen hai.', english: 'I have one sister.' },
    { hindi: 'Hum saath rehte hain.', english: 'We live together.' },
    { hindi: 'Meri maa bahut achha khana banati hain.', english: 'My mother cooks very well.' },
    { hindi: 'Mere bhai ka naam Arjun hai.', english: 'My brother\'s name is Arjun.' },
    { hindi: 'Hamare ghar mein teen log hain.', english: 'There are three people in our home.' },
    { hindi: 'Main apne parivaar se bahut pyaar karta hoon.', english: 'I love my family very much.' },
  ],
  l3: [
    { hindi: 'Main ek engineer hoon.', english: 'I am an engineer.' },
    { hindi: 'Main office mein kaam karta hoon.', english: 'I work in an office.' },
    { hindi: 'Mera kaam mujhe pasand hai.', english: 'I like my work.' },
    { hindi: 'Main subah nau baje office jaata hoon.', english: 'I go to the office at nine in the morning.' },
    { hindi: 'Mere office mein bahut log hain.', english: 'There are many people in my office.' },
    { hindi: 'Main computer par kaam karta hoon.', english: 'I work on a computer.' },
    { hindi: 'Meri salary acchi hai.', english: 'My salary is good.' },
    { hindi: 'Main ghar se kaam karta hoon.', english: 'I work from home.' },
    { hindi: 'Mujhe apni job bahut pasand hai.', english: 'I like my job very much.' },
    { hindi: 'Main ek software company mein kaam karta hoon.', english: 'I work in a software company.' },
  ],

  // ── Level 2 ─────────────────────────────────────────────────────────────
  l4: [
    { hindi: 'Main subah saat baje uthta hoon.', english: 'I wake up at seven in the morning.' },
    { hindi: 'Main pehle chai peeta hoon.', english: 'I drink tea first.' },
    { hindi: 'Main rozana exercise karta hoon.', english: 'I exercise every day.' },
    { hindi: 'Mujhe subah ki sair achhi lagti hai.', english: 'I enjoy morning walks.' },
    { hindi: 'Main dopahar mein khana khata hoon.', english: 'I eat lunch in the afternoon.' },
    { hindi: 'Shaam ko main TV dekhta hoon.', english: 'In the evening, I watch TV.' },
    { hindi: 'Main raat ko das baje sota hoon.', english: 'I sleep at ten at night.' },
    { hindi: 'Main roz naha kar taiyaar hota hoon.', english: 'I get ready after bathing every day.' },
    { hindi: 'Main apna ghar saaf rakhta hoon.', english: 'I keep my house clean.' },
    { hindi: 'Weekends par main apne dosto se milta hoon.', english: 'On weekends, I meet my friends.' },
  ],
  l5: [
    { hindi: 'Mujhe biryani bahut pasand hai.', english: 'I like biryani very much.' },
    { hindi: 'Main roz subah nashta karta hoon.', english: 'I have breakfast every morning.' },
    { hindi: 'Mujhe chai peena achha lagta hai.', english: 'I like drinking tea.' },
    { hindi: 'Kya aap mujhe pani de sakte hain?', english: 'Can you give me some water?' },
    { hindi: 'Yeh khana bahut tasty hai.', english: 'This food is very tasty.' },
    { hindi: 'Main vegetarian hoon.', english: 'I am vegetarian.' },
    { hindi: 'Mujhe meetha bahut pasand hai.', english: 'I like sweets very much.' },
    { hindi: 'Kya aap baahar khana khate hain?', english: 'Do you eat outside?' },
    { hindi: 'Main ghar par khana banata hoon.', english: 'I cook food at home.' },
    { hindi: 'Aaj raat hum restaurant jaayenge.', english: 'Tonight we will go to a restaurant.' },
  ],
  l6: [
    { hindi: 'Main Mumbai jaana chahta hoon.', english: 'I want to go to Mumbai.' },
    { hindi: 'Train se safar bahut achha hai.', english: 'Travelling by train is very nice.' },
    { hindi: 'Mujhe pahaad bahut pasand hain.', english: 'I like mountains very much.' },
    { hindi: 'Kya aap mujhe raasta bata sakte hain?', english: 'Can you tell me the way?' },
    { hindi: 'Hum kal Goa jaayenge.', english: 'We will go to Goa tomorrow.' },
    { hindi: 'Mera passport ready hai.', english: 'My passport is ready.' },
    { hindi: 'Main pehle Rajasthan gaya tha.', english: 'I had gone to Rajasthan before.' },
    { hindi: 'Yeh jagah bahut sundar hai.', english: 'This place is very beautiful.' },
    { hindi: 'Main taxi se airport jaaonga.', english: 'I will go to the airport by taxi.' },
    { hindi: 'Safar mein main music sunta hoon.', english: 'During travel, I listen to music.' },
  ],

  // ── Level 3 ─────────────────────────────────────────────────────────────
  l7: [
    { hindi: 'Mujhe yeh shirt pasand hai.', english: 'I like this shirt.' },
    { hindi: 'Yeh kitne ka hai?', english: 'How much does this cost?' },
    { hindi: 'Kya isme discount milega?', english: 'Will I get a discount on this?' },
    { hindi: 'Main ek naya phone khareedna chahta hoon.', english: 'I want to buy a new phone.' },
    { hindi: 'Yeh bahut mahenga hai.', english: 'This is very expensive.' },
    { hindi: 'Kya aap chhota size denge?', english: 'Can you give a smaller size?' },
    { hindi: 'Main online shopping karna pasand karta hoon.', english: 'I like to shop online.' },
    { hindi: 'Yeh quality achhi nahi hai.', english: 'This quality is not good.' },
    { hindi: 'Mujhe receipt chahiye.', english: 'I need the receipt.' },
    { hindi: 'Main kal wapas aaonga.', english: 'I will come back tomorrow.' },
  ],
  l8: [
    { hindi: 'Mera ek achha dost hai.', english: 'I have a good friend.' },
    { hindi: 'Hum saath school mein pade the.', english: 'We studied together in school.' },
    { hindi: 'Aaj hum cafe mein mile.', english: 'Today we met at a cafe.' },
    { hindi: 'Main apne doston ke saath time spend karna pasand karta hoon.', english: 'I like spending time with my friends.' },
    { hindi: 'Mere dost bahut funny hain.', english: 'My friends are very funny.' },
    { hindi: 'Hum milke movie dekhne gaye.', english: 'We went to watch a movie together.' },
    { hindi: 'Mera dost mujhe hamesha help karta hai.', english: 'My friend always helps me.' },
    { hindi: 'Hum WhatsApp par baat karte hain.', english: 'We talk on WhatsApp.' },
    { hindi: 'Is weekend hum saath khaana khaayenge.', english: 'This weekend we will eat together.' },
    { hindi: 'Dosti mein trust bahut zaroori hai.', english: 'Trust is very important in friendship.' },
  ],
  l9: [
    { hindi: 'Main roz gym jaata hoon.', english: 'I go to the gym every day.' },
    { hindi: 'Mujhe running bahut pasand hai.', english: 'I like running very much.' },
    { hindi: 'Paani peena sehat ke liye achha hai.', english: 'Drinking water is good for health.' },
    { hindi: 'Main raat ko der se nahi sota.', english: 'I do not sleep late at night.' },
    { hindi: 'Mujhe doctor ne fruits khaane ko bola.', english: 'The doctor told me to eat fruits.' },
    { hindi: 'Main stress kam karne ke liye yoga karta hoon.', english: 'I do yoga to reduce stress.' },
    { hindi: 'Bahut zyada fast food khana sahi nahi hai.', english: 'Eating too much fast food is not right.' },
    { hindi: 'Main apni fitness ka dhyan rakhta hoon.', english: 'I take care of my fitness.' },
    { hindi: 'Neend poori honi chahiye.', english: 'One must get enough sleep.' },
    { hindi: 'Healthy rehne ke liye exercise zaroori hai.', english: 'Exercise is necessary to stay healthy.' },
  ],
};

export function getLessonById(id: string): LessonMeta | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function getLessonsByLevel(levelId: number): LessonMeta[] {
  return LESSONS.filter((l) => l.levelId === levelId);
}
