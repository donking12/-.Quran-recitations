import React, { useState, useMemo } from 'react';
import { Reciter } from '../types';
import { SearchIcon, StarIcon } from './Icons';

interface ReciterListProps {
  reciters: Reciter[];
  selectedReciter: Reciter | null;
  onSelectReciter: (reciter: Reciter) => void;
  isLoading: boolean;
  t: any;
  favoriteReciters: Set<number>;
  onToggleFavorite: (reciterId: number) => void;
}

const ReciterList: React.FC<ReciterListProps> = ({ reciters, selectedReciter, onSelectReciter, isLoading, t, favoriteReciters, onToggleFavorite }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const sortedAndFilteredReciters = useMemo(() => {
    return reciters
      .filter(reciter =>
        reciter.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const aIsFav = favoriteReciters.has(a.id);
        const bIsFav = favoriteReciters.has(b.id);
        if (aIsFav && !bIsFav) return -1;
        if (!aIsFav && bIsFav) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [reciters, searchTerm, favoriteReciters]);

  return (
    <div className="bg-white/50 dark:bg-zinc-900/70 backdrop-blur-md flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-zinc-700">
        <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-100 mb-3">{t.reciters}</h2>
        <div className="relative">
          <input
            type="text"
            placeholder={t.searchReciters}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-200 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md py-2 ps-10 pe-4 text-slate-800 dark:text-zinc-200 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
          <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-slate-400 dark:text-zinc-400" />
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        {isLoading ? (
           <p className="text-slate-500 dark:text-zinc-400 text-center p-4">{t.loadingReciters}</p>
        ) : (
          <ul>
            {sortedAndFilteredReciters.map((reciter) => {
              const isFavorite = favoriteReciters.has(reciter.id);
              return (
              <li key={reciter.id}>
                <button
                  onClick={() => onSelectReciter(reciter)}
                  className={`w-full text-start p-4 transition-colors duration-200 ease-in-out border-s-4 flex justify-between items-center group ${
                    selectedReciter?.id === reciter.id
                      ? 'bg-sky-500/10 border-sky-400 text-sky-600 dark:text-white'
                      : 'border-transparent hover:bg-gray-200 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300'
                  }`}
                >
                  <p className="font-semibold pe-2">{reciter.name}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(reciter.id);
                    }}
                    className={`p-2 -m-2 rounded-full transition-colors ${isFavorite ? 'text-yellow-400' : 'text-slate-400 dark:text-zinc-600 group-hover:text-yellow-400/70'}`}
                    aria-label={isFavorite ? t.removeFromFavorites : t.addToFavorites}
                  >
                      <StarIcon filled={isFavorite} className="w-5 h-5"/>
                  </button>
                </button>
              </li>
            )})}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReciterList;