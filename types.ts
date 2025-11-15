export type Language = 'en' | 'ar';

export interface Reciter {
  id: number;
  name: string;
  letter: string;
}

export interface Moshaf {
  id: number;
  name: string;
  server: string;
  surah_total: number;
  surah_list: string;
}

export interface ReciterDetail {
  id: number;
  name: string;
  rewaya: string;
  count: string;
  moshaf: Moshaf[];
}

export interface SurahName {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
}

export interface Track {
  id: number;
  name: string;
  reciterName: string;
  audioUrl: string;
  transliteration: string;
}