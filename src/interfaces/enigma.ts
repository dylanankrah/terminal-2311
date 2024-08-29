export type Enigma = {
    id: number;
    question: string;
    answer: string;
    hint: string;
    key: string; // Key revealed upon solving
  };
  
  export const enigmas: Enigma[] = [
    {
      id: 1,
      question: "What has keys but can't open locks?",
      answer: "keyboard",
      hint: "Think about something you use every day to type.",
      key: "abc123"
    },
    {
      id: 2,
      question: "What runs but never walks?",
      answer: "water",
      hint: "It's related to rivers or streams.",
      key: "def456"
    },
    // Add more enigmas here
  ];
  
  export function getEnigma(id: number): Enigma | undefined {
    return enigmas.find(enigma => enigma.id === id);
  }
  