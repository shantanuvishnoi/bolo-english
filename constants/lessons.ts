export interface Sentence {
  hindi: string;
  english: string;
}

export interface LessonMeta {
  id: string;
  title: string;
  subtitle: string;
  total: number;
  levelId: number;
}

export const LESSONS: LessonMeta[] = [
  { id: 'l1', title: 'Apna introduction do', subtitle: 'Reading', total: 18, levelId: 1 },
  { id: 'l2', title: 'Family ke baare mein batao', subtitle: 'Reading', total: 18, levelId: 1 },
  { id: 'l3', title: 'Apna kaam batao', subtitle: 'Speaking', total: 19, levelId: 1 },
];

export const LESSON_SENTENCES: Record<string, Sentence[]> = {
  l1: [
    { hindi: 'Mera naam John hai.', english: 'My name is John.' },
    { hindi: 'Main India se hoon.', english: 'I am from India.' },
    { hindi: 'Mujhe English seekhna hai.', english: 'I want to learn English.' },
    { hindi: 'Aap kaise hain?', english: 'How are you?' },
    { hindi: 'Main theek hoon.', english: 'I am fine.' },
  ],
  l2: [
    { hindi: 'Mere paas ek bhai hai.', english: 'I have one brother.' },
    { hindi: 'Meri maa ghar par hain.', english: 'My mother is at home.' },
    { hindi: 'Hamara parivaar chota hai.', english: 'Our family is small.' },
  ],
  l3: [
    { hindi: 'Main ek teacher hoon.', english: 'I am a teacher.' },
    { hindi: 'Main office mein kaam karta hoon.', english: 'I work in an office.' },
  ],
};

export function getLessonById(id: string): LessonMeta | undefined {
  return LESSONS.find((l) => l.id === id);
}
