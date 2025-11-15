import React, { useRef, useState, useEffect } from 'react';
import { Track } from '../types';
import { PlayIcon, PauseIcon, NextIcon, PrevIcon, VolumeUpIcon, VolumeDownIcon, DownloadIcon } from './Icons';
import { formatTime } from '../utils/time';

interface PlayerProps {
  track: Track | null;
  onNext: () => void;
  onPrev: () => void;
  onEnded: () => void;
}

const Player: React.FC<PlayerProps> = ({ track, onNext, onPrev, onEnded }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.src = track.audioUrl;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.error("Audio playback failed:", e);
        setIsPlaying(false);
      });
    }
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [onEnded]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = (Number(e.target.value) / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = Number(e.target.value);
      setVolume(newVolume);
      if(audioRef.current) {
          audioRef.current.volume = newVolume;
      }
  };

  if (!track) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md text-slate-800 dark:text-white p-4 z-50 border-t border-gray-200 dark:border-zinc-700">
      <audio ref={audioRef} />
      <div className="container mx-auto flex items-center justify-between">
        <div className="w-1/4 flex items-center space-x-3 overflow-hidden">
           {isPlaying && (
            <div className="flex items-end h-5 space-x-1 flex-shrink-0">
                <span className="wave-bar" style={{ animationDelay: '0.1s' }}></span>
                <span className="wave-bar" style={{ animationDelay: '0.3s' }}></span>
                <span className="wave-bar" style={{ animationDelay: '0.2s' }}></span>
                <span className="wave-bar" style={{ animationDelay: '0.5s' }}></span>
                <span className="wave-bar" style={{ animationDelay: '0.4s' }}></span>
            </div>
            )}
          <div>
            <p className="font-bold truncate">{track.name}</p>
            <p className="text-sm text-slate-500 dark:text-zinc-400 truncate">{track.reciterName}</p>
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <div className="flex items-center space-x-6">
            <button onClick={onPrev} className="text-slate-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"><PrevIcon /></button>
            <button onClick={togglePlayPause} className="bg-sky-500 rounded-full p-3 text-white hover:bg-sky-400 transition-colors">
              {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
            </button>
            <button onClick={onNext} className="text-slate-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"><NextIcon /></button>
          </div>
          <div className="w-full flex items-center space-x-2 mt-2">
            <span className="text-xs text-slate-500 dark:text-zinc-400">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress || 0}
              onChange={handleProgressChange}
              className="w-full h-1 bg-gray-300 dark:bg-zinc-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-sky-400 [&::-webkit-slider-thumb]:rounded-full"
            />
            <span className="text-xs text-slate-500 dark:text-zinc-400">{formatTime(duration)}</span>
          </div>
        </div>
        <div className="w-1/4 flex items-center justify-end space-x-3">
            <VolumeDownIcon className="text-slate-500 dark:text-zinc-400" />
            <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-gray-300 dark:bg-zinc-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-sky-400 [&::-webkit-slider-thumb]:rounded-full"
            />
            <VolumeUpIcon className="text-slate-500 dark:text-zinc-400" />
            <a
              href={track.audioUrl}
              download={`${track.reciterName} - ${String(track.id).padStart(3, '0')} - ${track.name}.mp3`}
              className="text-slate-500 dark:text-zinc-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors p-1"
              aria-label="Download track"
              title="Download track"
            >
              <DownloadIcon className="w-5 h-5" />
            </a>
        </div>
      </div>
    </div>
  );
};

export default Player;