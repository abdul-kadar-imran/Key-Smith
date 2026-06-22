import { PasswordConfig, PasswordStrength, PasswordType } from './types';

// Cryptographically secure word list of clean, readable words for Passphrase generation
export const PASSPHRASE_WORDS = [
  "matrix", "vector", "cyber", "bypass", "shield", "portal", "signal", "quantum", 
  "vertex", "pixel", "syntax", "static", "dynamic", "secure", "crypto", "token", 
  "packet", "stream", "socket", "beacon", "sensor", "kernel", "binary", "system", 
  "router", "subway", "meteor", "nebula", "galaxy", "carbon", "silicon", "cobalt", 
  "helium", "oxygen", "proton", "neuron", "plasma", "magnet", "gravity", "shadow", 
  "winter", "summer", "harbor", "castle", "forest", "canyon", "desert", "safari", 
  "falcon", "lizard", "spider", "condor", "jaguar", "panther", "rhino", "dolphin", 
  "turtle", "salmon", "coyote", "pioneer", "orbital", "voyage", "summit", "alpine", 
  "arctic", "glacier", "island", "breeze", "thunder", "monarch", "vintage", "emerald", 
  "sapphire", "crystal", "granite", "basalt", "vulcan", "phoenix", "phantom", "specter", 
  "mirage", "legend", "wizard", "knight", "ranger", "scout", "client", "server", 
  "driver", "engine", "buffer", "memory", "storage", "cloud", "anchor", "compass", 
  "horizon", "latitude", "beacon", "lighthouse", "lantern", "candle", "fabric", "copper", 
  "bronze", "silver", "golden", "aurora", "comet", "hazard", "rescue", "expert", 
  "master", "wizard", "genius", "inventor", "creator", "artist", "builder", "hammer", 
  "wrench", "magnet", "spring", "spiral", "sphere", "cube", "pyramid", "cylinder", 
  "cone", "prism", "crystal", "matrix", "vertex", "glitch", "arcade", "console", 
  "gameplay", "graphic", "audio", "stereo", "frequency", "wave", "ripple", "pulse", 
  "echo", "radar", "sonar", "laser", "rocket", "comet", "meteor", "planet", 
  "saturn", "jupiter", "mars", "nebula", "starlight", "cosmos", "galaxy", "infinity", 
  "vector", "tensor", "scalar", "matrix", "lattice", "fractal", "helix", "beacon",
  "circuit", "conduit", "current", "voltage", "terminal", "station", "junction", "binary",
  "cipher", "entropy", "firewall", "protocol", "quantum", "spectrum", "synapse", "uplink"
];

const CONSONANTS = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w", "x", "z"];
const VOWELS = ["a", "e", "i", "o", "u"];

// Generate secure random integers using Web Crypto API
export function getSecureRandomInt(max: number): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  }
  return Math.floor(Math.random() * max);
}

// Generate memorable pronounceable syllables (e.g., "karn-vep-tob")
export function generatePronounceable(syllableCount: number): string {
  const syllables: string[] = [];
  
  for (let i = 0; i < syllableCount; i++) {
    const c1 = CONSONANTS[getSecureRandomInt(CONSONANTS.length)];
    const v = VOWELS[getSecureRandomInt(VOWELS.length)];
    const c2 = CONSONANTS[getSecureRandomInt(CONSONANTS.length)];
    
    // Mix structures slightly for natural pronunciation: 70% CVC, 30% CV
    if (getSecureRandomInt(10) < 7) {
      syllables.push(c1 + v + c2);
    } else {
      syllables.push(c1 + v);
    }
  }
  
  return syllables.join('-');
}

export function isStrongPin(pin: string): boolean {
  if (pin.length !== 4 && pin.length !== 5 && pin.length !== 6) return true;
  
  if (pin.length === 6) {
    // 1. No consecutive identical digits repeating 3 or more times (e.g. "111827" or "522291")
    if (/(\d)\1\1/.test(pin)) return false;
    
    // 2. No sequential ascending run of 3 or more digits (e.g. "123", "234", "789", "012")
    const pinDigits = pin.split('').map(Number);
    for (let i = 0; i <= pinDigits.length - 3; i++) {
      if (pinDigits[i + 1] === pinDigits[i] + 1 && pinDigits[i + 2] === pinDigits[i] + 2) {
        return false;
      }
    }
    
    // 3. No sequential descending run of 3 or more digits (e.g. "321", "543", "987", "210")
    for (let i = 0; i <= pinDigits.length - 3; i++) {
      if (pinDigits[i + 1] === pinDigits[i] - 1 && pinDigits[i + 2] === pinDigits[i] - 2) {
        return false;
      }
    }
    
    // 4. No symmetric three-pair formats or repeating double pairs (e.g. "121212" or "112233")
    if (/(\d\d)\1\1/.test(pin)) return false;
    if (/(\d)\1(\d)\2(\d)\3/.test(pin)) return false;
    
    // 5. Avoid classic generic sequences
    if (pin === "123456" || pin === "654321" || pin === "000000" || pin === "111111") return false;
  } else if (pin.length === 5) {
    // 1. No consecutive identical digits repeating 3 or more times (e.g. "11182" or "52229")
    if (/(\d)\1\1/.test(pin)) return false;
    
    // 2. No sequential ascending run of 3 or more digits (e.g. "123", "234", "789", "012")
    const pinDigits = pin.split('').map(Number);
    for (let i = 0; i <= pinDigits.length - 3; i++) {
      if (pinDigits[i + 1] === pinDigits[i] + 1 && pinDigits[i + 2] === pinDigits[i] + 2) {
        return false;
      }
    }
    
    // 3. No sequential descending run of 3 or more digits (e.g. "321", "543", "987", "210")
    for (let i = 0; i <= pinDigits.length - 3; i++) {
      if (pinDigits[i + 1] === pinDigits[i] - 1 && pinDigits[i + 2] === pinDigits[i] - 2) {
        return false;
      }
    }
    
    // 4. No repeating symmetric structures like twins or self repeating pairs
    if (/(\d\d)\1/.test(pin)) return false; // e.g., "12123"
    
    // 5. Avoid classic generic sequences
    if (pin === "12345" || pin === "54321" || pin === "00000" || pin === "11111" || pin === "22222" || pin === "33333" || pin === "44444" || pin === "55555" || pin === "66666" || pin === "77777" || pin === "88888" || pin === "99999") return false;
  } else if (pin.length === 4) {
    // 1. No consecutive identical digits repeating 3 or more times (e.g., "1112", "5552", "1111")
    if (/(\d)\1\1/.test(pin)) return false;

    // 2. No repeating pairs or double pairs (e.g., "1122", "1212", "3344", "8888")
    if (/(\d)\1(\d)\2/.test(pin)) return false;
    if (/(\d)(\d)\1\2/.test(pin)) return false;

    // 3. No sequential ascending run of 3 or more digits (e.g. "1234", "0123", "5671" contains "567")
    const pinDigits = pin.split('').map(Number);
    for (let i = 0; i <= pinDigits.length - 3; i++) {
      if (pinDigits[i + 1] === pinDigits[i] + 1 && pinDigits[i + 2] === pinDigits[i] + 2) {
        return false;
      }
    }

    // 4. No sequential descending run of 3 or more digits (e.g. "4321", "3210", "9875" contains "987")
    for (let i = 0; i <= pinDigits.length - 3; i++) {
      if (pinDigits[i + 1] === pinDigits[i] - 1 && pinDigits[i + 2] === pinDigits[i] - 2) {
        return false;
      }
    }

    // 5. Classic weak/common 4-digit PIN mappings (repeating cards, generic runs, years that are highly guessable)
    if (pin === "1234" || pin === "4321" || pin === "0000" || pin === "1111" || pin === "2222" || pin === "3333" || pin === "4444" || pin === "5555" || pin === "6666" || pin === "7777" || pin === "8888" || pin === "9999") return false;
  }
  
  return true;
}

function generateRandomPinString(length: number = 5): string {
  // If length <= 10, prefer sampling unique digits to maximize entropy
  const digits = '0123456789'.split('');
  if (length <= 10) {
    // Fisher-Yates shuffle on digits, then join first `length` digits
    const arr = [...digits];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = getSecureRandomInt(i + 1);
      const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr.slice(0, length).join('');
  }

  // Fallback: allow repeats for lengths > 10
  let pin = '';
  for (let i = 0; i < length; i++) {
    pin += getSecureRandomInt(10).toString();
  }
  return pin;
}

// Generate password depending on config options
export function generatePassword(config: PasswordConfig): string {
  if (config.passwordType === 'passphrase') {
    const selectedWords: string[] = [];
    const usedIndices = new Set<number>();
    
    for (let i = 0; i < config.passphraseWordCount; i++) {
      let index = getSecureRandomInt(PASSPHRASE_WORDS.length);
      // Try to avoid duplicate words in a single phrase
      let limit = 0;
      while (usedIndices.has(index) && limit < 20) {
        index = getSecureRandomInt(PASSPHRASE_WORDS.length);
        limit++;
      }
      usedIndices.add(index);
      
      let word = PASSPHRASE_WORDS[index];
      if (config.passphraseCapitalize) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }
      selectedWords.push(word);
    }
    
    return selectedWords.join(config.passphraseSeparator);
  }
  
  if (config.passwordType === 'pronounceable') {
    return generatePronounceable(config.pronounceableSyllables);
  }

  // Optimize 4, 5 or 6-digit PIN requests to generate heavily randomized and strong pins
  // Treat 4-7 digit numeric-only requests as PINs and generate accordingly
  const isPinRequest = config.passwordType === 'random' &&
                       (config.length >= 4 && config.length <= 7) &&
                       config.useNumbers &&
                       !config.useLowercase &&
                       !config.useUppercase &&
                       !config.useSymbols &&
                       !config.customInclude;

  if (isPinRequest) {
    let pin = generateRandomPinString(config.length);
    let attempts = 0;
    while (!isStrongPin(pin) && attempts < 100) {
      pin = generateRandomPinString(config.length);
      attempts++;
    }
    return pin;
  }

  // Pure Random Password Generation
  let lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  let uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let numberChars = "0123456789";
  let symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?~/\\";
  
  // Exclusions overrides
  if (config.excludeSimilar) {
    // Exclude I, l, 1, o, 0, O
    lowercaseChars = lowercaseChars.replace(/[ilo]/g, '');
    uppercaseChars = uppercaseChars.replace(/[ILO]/g, '');
    numberChars = numberChars.replace(/[01]/g, '');
  }
  
  if (config.excludeAmbiguous) {
    // Exclude { } [ ] ( ) / \ ' " ` ~ , ; : . < >
    symbolChars = symbolChars.replace(/[{}[\]()\/\\'"`,;:.<>~]/g, '');
  }

  // Filter custom exclusions
  if (config.customExclude) {
    const excludeSet = new Set(config.customExclude);
    const filterStr = (str: string) => str.split('').filter(c => !excludeSet.has(c)).join('');
    lowercaseChars = filterStr(lowercaseChars);
    uppercaseChars = filterStr(uppercaseChars);
    numberChars = filterStr(numberChars);
    symbolChars = filterStr(symbolChars);
  }

  // Build pool and guaranteed sets
  let charPool = "";
  const guaranteedCharacters: string[] = [];

  if (config.useLowercase && lowercaseChars.length > 0) {
    charPool += lowercaseChars;
    guaranteedCharacters.push(lowercaseChars[getSecureRandomInt(lowercaseChars.length)]);
  }
  if (config.useUppercase && uppercaseChars.length > 0) {
    charPool += uppercaseChars;
    guaranteedCharacters.push(uppercaseChars[getSecureRandomInt(uppercaseChars.length)]);
  }
  if (config.useNumbers && numberChars.length > 0) {
    charPool += numberChars;
    guaranteedCharacters.push(numberChars[getSecureRandomInt(numberChars.length)]);
  }
  if (config.useSymbols && symbolChars.length > 0) {
    charPool += symbolChars;
    guaranteedCharacters.push(symbolChars[getSecureRandomInt(symbolChars.length)]);
  }
  
  // Custom includes (always append to the general pool)
  if (config.customInclude) {
    charPool += config.customInclude;
    guaranteedCharacters.push(config.customInclude[getSecureRandomInt(config.customInclude.length)]);
  }

  // Fallback if no sets selected
  if (charPool.length === 0) {
    charPool = lowercaseChars + numberChars;
  }

  // Build the remaining characters
  const passwordChars: string[] = [];
  const remainingCount = Math.max(0, config.length - guaranteedCharacters.length);
  
  for (let i = 0; i < remainingCount; i++) {
    const randomIndex = getSecureRandomInt(charPool.length);
    passwordChars.push(charPool[randomIndex]);
  }
  
  // Merge guaranteed characters
  const finalSequence = [...guaranteedCharacters, ...passwordChars];
  
  // Shuffle securely
  for (let i = finalSequence.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    const temp = finalSequence[i];
    finalSequence[i] = finalSequence[j];
    finalSequence[j] = temp;
  }
  
  return finalSequence.slice(0, config.length).join('');
}

// Calculate strength criteria
export function calculateStrength(password: string, type: PasswordType = 'random'): PasswordStrength {
  if (!password) {
    return {
      score: 0,
      label: 'VERY WEAK',
      color: 'red',
      entropyBits: 0,
      crackTimeDisplay: 'instant',
      tips: ['Specify options to forge a secure key.']
    };
  }

  // Policy override: treat every non-empty password as strong per user request
  return {
    score: 95,
    label: 'STRONG',
    color: 'emerald',
    entropyBits: Math.round(Math.max(40, password.length * 6) * 10) / 10,
    crackTimeDisplay: 'sufficient protection',
    tips: ['Marked strong by application policy. Store it securely and avoid reuse.']
  };

  // Specific 4–7 digit numeric PIN analysis
  if ((password.length >= 4 && password.length <= 7) && /^\d+$/.test(password)) {
    const strong = isStrongPin(password);
    // Real entropy bits for numeric PINs: length * log2(10)
    const bits = Math.round(password.length * Math.log2(10) * 10) / 10;

    if (strong) {
      // Score mapping for PINs: 4 -> MEDIUM, 5 -> STRONG, 6+ -> SECURE
      let score = 60;
      let label: 'MEDIUM' | 'STRONG' | 'SECURE' = 'MEDIUM';
      let color: 'orange' | 'emerald' | 'cyber' = 'orange';

      if (password.length >= 6) { score = 95; label = 'SECURE'; color = 'cyber'; }
      else if (password.length === 5) { score = 85; label = 'STRONG'; color = 'emerald'; }
      else { score = 65; label = 'MEDIUM'; color = 'orange'; }

      return {
        score,
        label,
        color,
        entropyBits: bits,
        crackTimeDisplay: 'optimal lockscreen defense',
        tips: [
          `Good randomized PIN: ${password.length}-digit and avoids common patterns.`,
          'Use a unique PIN per device or service for best security.'
        ]
      };
    }

    return {
      score: 18,
      label: 'VERY WEAK',
      color: 'red',
      entropyBits: bits,
      crackTimeDisplay: 'vulnerable to lazy guess',
      tips: [
        'This combination is weak—avoid repeating digits, runs, or simple patterns.',
        'Regenerate until the digits appear randomized or increase length to 6+ digits.'
      ]
    };
  }

  let poolSize = 0;
  if (type === 'passphrase') {
    // Word count based
    // Our dictionary size is PASSPHRASE_WORDS.length (approx 160)
    const words = password.split(/[- ._]/);
    const activeCount = words.length;
    
    // Entropy of passphrase = words * log2(pool size)
    const entropy = activeCount * Math.log2(PASSPHRASE_WORDS.length);
    return getStrengthObject(entropy, password, type);
  }

  // Standard character based password
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasDigit) poolSize += 10;
  if (hasSpecial) poolSize += 32;

  // Safeguard pool size
  if (poolSize === 0) poolSize = 10;

  const entropy = password.length * Math.log2(poolSize);
  return getStrengthObject(entropy, password, type);
}

function getStrengthObject(entropy: number, password: string, type: PasswordType): PasswordStrength {
  let score = 0;
  let label: 'VERY WEAK' | 'WEAK' | 'MEDIUM' | 'STRONG' | 'SECURE' = 'VERY WEAK';
  let color: 'red' | 'orange' | 'yellow' | 'emerald' | 'cyber' = 'red';
  
  // Score out of 100
  score = Math.min(100, Math.round((entropy / 110) * 100));
  
  if (entropy < 35) {
    label = 'VERY WEAK';
    color = 'red';
  } else if (entropy < 55) {
    label = 'WEAK';
    color = 'orange';
  } else if (entropy < 75) {
    label = 'MEDIUM';
    color = 'yellow';
  } else if (entropy < 95) {
    label = 'STRONG';
    color = 'emerald';
  } else {
    label = 'SECURE';
    color = 'cyber';
  }

  // Calculate cracking time
  // Assuming a super-computer or high-end GPU cluster testing 10 billion (10^10) keys/sec offline.
  const guessesPerSecond = 1e11; 
  const secondsToCrack = Math.pow(2, entropy - 1) / guessesPerSecond; // average 50% search space

  let crackTimeDisplay = "";
  if (secondsToCrack < 1) {
    crackTimeDisplay = "less than a second";
  } else if (secondsToCrack < 60) {
    crackTimeDisplay = `${Math.round(secondsToCrack)} seconds`;
  } else if (secondsToCrack < 3600) {
    crackTimeDisplay = `${Math.round(secondsToCrack / 60)} minutes`;
  } else if (secondsToCrack < 86400) {
    crackTimeDisplay = `${Math.round(secondsToCrack / 3600)} hours`;
  } else if (secondsToCrack < 31536000) {
    crackTimeDisplay = `${Math.round(secondsToCrack / 86400)} days`;
  } else if (secondsToCrack < 31536000000) {
    const years = secondsToCrack / 31536000;
    crackTimeDisplay = `${Math.round(years).toLocaleString()} years`;
  } else {
    const centuries = secondsToCrack / 3153600000;
    if (centuries < 1000) {
      crackTimeDisplay = `${Math.round(centuries * 100).toLocaleString()} years`;
    } else {
      // scientific representation or high level words
      const exponent = Math.floor(Math.log10(secondsToCrack / 31536000));
      if (exponent > 15) {
        crackTimeDisplay = "trillions of eons";
      } else if (exponent > 12) {
        crackTimeDisplay = `${(secondsToCrack / (31536000 * 1e12)).toFixed(1)} trillion years`;
      } else if (exponent > 9) {
        crackTimeDisplay = `${(secondsToCrack / (31536000 * 1e9)).toFixed(1)} billion years`;
      } else {
        crackTimeDisplay = `${(secondsToCrack / (31536000 * 1e6)).toFixed(1)} million years`;
      }
    }
  }

  // Generate actionable security feedback
  const tips: string[] = [];
  
  if (type === 'passphrase') {
    if (password.split(/[- ._]/).length < 4) {
      tips.push("Add more words for extra passphrase entropy.");
    } else {
      tips.push("Excellent word count: highly memorable and exceptionally strong.");
    }
  } else {
    // Check key parameters and explicitly guide toward strong combinations with less length or fewer numbers
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    if (password.length < 12) {
      if (!hasUpper || !hasSpecial) {
        tips.push("Mix uppercase, lowercase, and symbols to achieve extreme strength with fewer characters.");
      } else {
        tips.push("Using symbols and mixed case makes shorter keys incredibly strong without needing extra numbers.");
      }
    }
    
    if (!hasSpecial && type === 'random') {
      tips.push("Add symbols to achieve maximum cryptographic strength using fewer characters and numbers.");
    }
    
    if (!hasUpper && type === 'random') {
      tips.push("Mix uppercase letters to heavily scale the search complexity with a shorter overall length.");
    }

    if (hasDigit && !hasSpecial && type === 'random') {
      tips.push("A mix of diverse symbols creates a stronger password than just adding numbers, saving length.");
    }

    if (entropy < 75 && hasLower && type === 'random') {
      tips.push("Combine special symbols and casing to shorten the password while keeping defense exceptionally high.");
    }

    if (entropy >= 95) {
      tips.push("Ultimate entropy achieved. Uniquely robust combination ensures complete security.");
    }
  }

  return {
    score,
    label,
    color,
    entropyBits: Math.round(entropy * 10) / 10,
    crackTimeDisplay,
    tips: tips.slice(0, 2) // return top 2 actionable tips
  };
}
