
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReciterList from './components/ReciterList';
import SurahList from './components/SurahList';
import Player from './components/Player';
import { Reciter, SurahName, Track, ReciterDetail, Language } from './types';
import { fetchReciters, fetchReciterDetails, fetchSurahNames } from './services/api';
import { SunIcon, MoonIcon } from './components/Icons';

const translations = {
  en: {
    reciters: 'Reciters',
    searchReciters: 'Search reciters...',
    surahsBy: (name: string) => `Surahs by ${name}`,
    selectReciter: 'Select a Reciter',
    selectReciterPrompt: 'Select a reciter to see the list of surahs.',
    loadingReciters: 'Loading reciters...',
    errorTitle: 'An Error Occurred',
    errorInitialData: 'Failed to load initial data. Please try again later.',
    errorSurahs: (name: string) => `Failed to load surahs for ${name}.`,
    appName: 'Quran Reciters Center',
    appDescription: 'Listen to and download a wide collection of Quran recitations from various reciters.',
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
  },
  ar: {
    reciters: 'القراء',
    searchReciters: 'ابحث عن قارئ...',
    surahsBy: (name:string) => `سور بصوت ${name}`,
    selectReciter: 'اختر قارئ',
    selectReciterPrompt: 'اختر قارئاً لعرض قائمة السور.',
    loadingReciters: 'جاري تحميل القراء...',
    errorTitle: 'حدث خطأ',
    errorInitialData: 'فشل تحميل البيانات الأولية. يرجى المحاولة مرة أخرى لاحقًا.',
    errorSurahs: (name: string) => `فشل تحميل السور للقارئ ${name}.`,
    appName: 'مركز قراء القرآن الكريم',
    appDescription: 'استمع وحمل لمجموعة واسعة من تلاوات القرآن الكريم من مختلف القراء.',
    addToFavorites: 'إضافة إلى المفضلة',
    removeFromFavorites: 'إزالة من المفضلة',
  }
};

interface HeaderProps {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  language: Language;
  setLanguage: (language: Language) => void;
  appName: string;
  appDescription: string;
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme, language, setLanguage, appName, appDescription }) => {
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md p-4 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center shadow-md sticky top-0 z-40">
      <div>
        <h1 className="text-2xl font-bold text-sky-600 dark:text-sky-400">{appName}</h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400">{appDescription}</p>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleLanguage}
          className="font-semibold text-gray-600 dark:text-zinc-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors px-3 py-1 rounded-md text-sm"
          aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
        >
          {language === 'en' ? 'العربية' : 'English'}
        </button>
        <button
          onClick={toggleTheme}
          className="text-gray-600 dark:text-zinc-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
};


const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedTheme = window.localStorage.getItem('theme');
        if (storedTheme === 'dark' || storedTheme === 'light') {
            return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  const [language, setLanguage] = useState<Language>(() => {
    const storedLang = typeof window !== 'undefined' ? window.localStorage.getItem('language') : 'en';
    return storedLang === 'ar' ? 'ar' : 'en';
  });
  
  const [favoriteReciters, setFavoriteReciters] = useState<Set<number>>(() => {
    try {
        const item = typeof window !== 'undefined' ? window.localStorage.getItem('favoriteReciters') : null;
        return item ? new Set(JSON.parse(item)) : new Set();
    } catch (error) {
        console.error('Error reading favorite reciters from localStorage', error);
        return new Set();
    }
  });

  const t = translations[language];

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    const root = window.document.documentElement;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    try {
        window.localStorage.setItem('favoriteReciters', JSON.stringify(Array.from(favoriteReciters)));
    } catch (error) {
        console.error('Error saving favorite reciters to localStorage', error);
    }
  }, [favoriteReciters]);

  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [surahNames, setSurahNames] = useState<Map<number, SurahName>>(new Map());
  const [selectedReciter, setSelectedReciter] = useState<Reciter | null>(null);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);

  const [isLoadingReciters, setIsLoadingReciters] = useState(true);
  const [isLoadingSurahs, setIsLoadingSurahs] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setError(null);
        setIsLoadingReciters(true);
        // Reset state when language changes
        setReciters([]);
        setSurahNames(new Map());
        setSelectedReciter(null);
        setPlaylist([]);
        setCurrentTrackIndex(null);

        const [recitersData, surahNamesData] = await Promise.all([
          fetchReciters(language),
          fetchSurahNames(language),
        ]);
        
        let processedReciters = recitersData;
        if (language === 'ar') {
          processedReciters = recitersData.map(reciter => ({
            ...reciter,
            name: `القارئ الشيخ ${reciter.name.replace(/الشيخ|شيخ/g, '').trim()}`
          }));
        }

        setReciters(processedReciters);
        const surahMap = new Map<number, SurahName>();
        surahNamesData.forEach(s => surahMap.set(s.id, s));
        setSurahNames(surahMap);
      } catch (err) {
        setError(t.errorInitialData);
        console.error(err);
      } finally {
        setIsLoadingReciters(false);
      }
    };
    loadInitialData();
  }, [language, t.errorInitialData]);

  const handleSelectReciter = useCallback(async (reciter: Reciter) => {
    if (selectedReciter?.id === reciter.id) return;

    setSelectedReciter(reciter);
    setIsLoadingSurahs(true);
    setPlaylist([]);
    try {
      const details = await fetchReciterDetails(reciter.id, language);
      
      if (details.moshaf && details.moshaf.length > 0) {
        const moshaf = details.moshaf[0];
        const surahIds = moshaf.surah_list.split(',').map(Number);
        
        const newPlaylist = surahIds.map(id => {
          const surahInfo = surahNames.get(id);
          return {
            id,
            name: surahInfo?.name || `Surah ${id}`,
            reciterName: reciter.name,
            audioUrl: `${moshaf.server}/${String(id).padStart(3, '0')}.mp3`,
            transliteration: surahInfo?.transliteration || '',
          };
        });
        setPlaylist(newPlaylist);
      }
    } catch (err) {
      setError(t.errorSurahs(reciter.name));
      console.error(err);
    } finally {
      setIsLoadingSurahs(false);
    }
  }, [selectedReciter, surahNames, language, t]);

  const handleSelectSurah = (track: Track, index: number) => {
    setCurrentTrackIndex(index);
  };
  
  const handleNextTrack = useCallback(() => {
    if (playlist.length === 0 || currentTrackIndex === null) return;
    setCurrentTrackIndex((prevIndex) => (prevIndex! + 1) % playlist.length);
  }, [playlist.length, currentTrackIndex]);

  const handlePrevTrack = useCallback(() => {
    if (playlist.length === 0 || currentTrackIndex === null) return;
    setCurrentTrackIndex((prevIndex) => (prevIndex! - 1 + playlist.length) % playlist.length);
  }, [playlist.length, currentTrackIndex]);
  
  const handleToggleFavorite = useCallback((reciterId: number) => {
    setFavoriteReciters(prevFavorites => {
        const newFavorites = new Set(prevFavorites);
        if (newFavorites.has(reciterId)) {
            newFavorites.delete(reciterId);
        } else {
            newFavorites.add(reciterId);
        }
        return newFavorites;
    });
  }, []);

  const currentTrack = useMemo(() => {
    if (currentTrackIndex === null || !playlist[currentTrackIndex]) return null;
    return playlist[currentTrackIndex];
  }, [currentTrackIndex, playlist]);


  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 dark:text-red-400">
        <div className="text-center p-4">
          <h1 className="text-2xl mb-4">{t.errorTitle}</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen text-gray-800 dark:text-zinc-200 flex flex-col font-sans">
       <Header
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
        appName={t.appName}
        appDescription={t.appDescription}
      />
       <div className="flex-grow grid grid-cols-1 md:grid-cols-[350px_1fr] lg:grid-cols-[400px_1fr] overflow-hidden pb-28">
        <div className="h-full overflow-y-auto border-e border-gray-200 dark:border-zinc-800">
          <ReciterList
            reciters={reciters}
            selectedReciter={selectedReciter}
            onSelectReciter={handleSelectReciter}
            isLoading={isLoadingReciters}
            t={t}
            favoriteReciters={favoriteReciters}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
        <div className="h-full overflow-y-auto">
          <SurahList
            playlist={playlist}
            currentTrack={currentTrack}
            onSelectSurah={handleSelectSurah}
            isLoading={isLoadingSurahs}
            reciterName={selectedReciter?.name || null}
            t={t}
          />
        </div>
       </div>

      <Player
        track={currentTrack}
        onNext={handleNextTrack}
        onPrev={handlePrevTrack}
        onEnded={handleNextTrack}
      />
    </div>
  );
};

export default App;