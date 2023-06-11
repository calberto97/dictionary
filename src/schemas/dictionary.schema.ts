export interface iReturn {
  word: string;
  phonetic: string;
  phonetics: iPhonetic[];
  meanings: iMeaning[];
  license: iLicense;
  sourceUrls: string[];
}

export interface iLicense {
  name: string;
  url: string;
}

export interface iMeaning {
  partOfSpeech: string;
  definitions: iDefinition[];
  synonyms: string[];
  antonyms: any[];
}

export interface iDefinition {
  definition: string;
  synonyms: any[];
  antonyms: any[];
  example?: string;
}

export interface iPhonetic {
  text: string;
  audio?: string;
  sourceUrl?: string;
  license?: iLicense;
}
