export type PasswordType = 'random' | 'passphrase' | 'pronounceable';

export interface PasswordConfig {
  length: number;
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
  excludeSimilar: boolean; // e.g. i, l, 1, L, o, 0, O
  excludeAmbiguous: boolean; // e.g. { } [ ] ( ) / \ ' " ` ~ , ; : . < >
  customInclude: string;
  customExclude: string;
  passwordType: PasswordType;
  
  // Passphrase parameters
  passphraseWordCount: number;
  passphraseSeparator: string;
  passphraseCapitalize: boolean;
  
  // Pronounceable parameters
  pronounceableSyllables: number;
}

export interface PasswordStrength {
  score: number; // 0 to 100 representing raw percentage or 0 to 4
  label: 'VERY WEAK' | 'WEAK' | 'MEDIUM' | 'STRONG' | 'SECURE';
  color: 'red' | 'orange' | 'yellow' | 'emerald' | 'cyber';
  entropyBits: number;
  crackTimeDisplay: string;
  tips: string[];
}

export interface SavedPassword {
  id: string;
  password: string;
  type: PasswordType;
  strengthLabel: string;
  timestamp: number;
  tag?: string;
}
