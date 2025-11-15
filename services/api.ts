import { Reciter, ReciterDetail, SurahName, Language } from '../types';

const API_BASE_URL = 'https://mp3quran.net/api/v3';
const langMap = { en: 'eng', ar: 'ara' };

export const fetchReciters = async (language: Language): Promise<Reciter[]> => {
  const response = await fetch(`${API_BASE_URL}/reciters?language=${langMap[language]}`);
  if (!response.ok) {
    throw new Error('Failed to fetch reciters');
  }
  const data = await response.json();
  return data.reciters;
};

export const fetchReciterDetails = async (reciterId: number, language: Language): Promise<ReciterDetail> => {
  const response = await fetch(`${API_BASE_URL}/reciters?language=${langMap[language]}&reciter=${reciterId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch reciter details');
  }
  const data = await response.json();
  return data.reciters[0];
};

export const fetchSurahNames = async (language: Language): Promise<SurahName[]> => {
  const response = await fetch(`${API_BASE_URL}/suwar?language=${langMap[language]}`);
  if (!response.ok) {
    throw new Error('Failed to fetch surah names');
  }
  const data = await response.json();
  return data.suwar;
};