import React from 'react';
import { Track } from '../types';
import Spinner from './Spinner';

interface SurahListProps {
  playlist: Track[];
  currentTrack: Track | null;
  onSelectSurah: (track: Track, index: number) => void;
  isLoading: boolean;
  reciterName: string | null;
  t: any;
}

const SurahList: React.FC<SurahListProps> = ({ playlist, currentTrack, onSelectSurah, isLoading, reciterName, t }) => {
  return (
    <div className="bg-gray-100/80 dark:bg-zinc-800/50 flex flex-col h-full">
      <div className="p-4 border-b border-gray-300 dark:border-zinc-700">
        <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-100">
          {reciterName ? t.surahsBy(reciterName) : t.selectReciter}
        </h2>
      </div>
      <div className="flex-grow overflow-y-auto">
        {isLoading ? (
          <Spinner />
        ) : !reciterName ? (
            <div className="flex items-center justify-center h-full">
                <p className="text-slate-500 dark:text-zinc-400">{t.selectReciterPrompt}</p>
            </div>
        ) : (
          <ul>
            {playlist.map((track, index) => (
              <li key={track.id}>
                <button
                  onClick={() => onSelectSurah(track, index)}
                  className={`w-full text-start p-4 transition-colors duration-200 ease-in-out border-s-4 flex justify-between items-center ${
                    currentTrack?.id === track.id && currentTrack.reciterName === track.reciterName
                      ? 'bg-sky-500/20 border-sky-400 text-sky-600 dark:text-white'
                      : 'border-transparent hover:bg-gray-200/50 dark:hover:bg-zinc-700/50 text-slate-700 dark:text-zinc-300'
                  }`}
                >
                  <div>
                    <p className="font-semibold">{`${track.id}. ${track.name}`}</p>
                    <p className="text-sm text-slate-500 dark:text-zinc-400">{track.transliteration}</p>
                  </div>
                  {currentTrack?.id === track.id && currentTrack.reciterName === track.reciterName && (
                    <div className="flex space-x-1">
                        <span className="w-1 h-4 bg-sky-400 animate-[bounce_1s_ease-in-out_infinite]"></span>
                        <span className="w-1 h-4 bg-sky-400 animate-[bounce_1.2s_ease-in-out_infinite]"></span>
                        <span className="w-1 h-4 bg-sky-400 animate-[bounce_1.4s_ease-in-out_infinite]"></span>
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SurahList;