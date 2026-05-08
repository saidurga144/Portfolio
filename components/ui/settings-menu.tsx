"use client";

import { useState, useEffect, useRef } from "react";
import { Settings, Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false); // Start muted by default
  const [audioError, setAudioError] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
    
    // Initialize audio element with background music
    try {
      audioRef.current = new Audio('/background-music.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 1.0; // 100% volume
      
      // Add event listeners for debugging
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log('Audio loaded successfully');
      });
      
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio loading error:', e);
        setAudioError(true);
      });
      
      // Preload the audio
      audioRef.current.load();
    } catch (error) {
      console.error('Error initializing audio:', error);
      setAudioError(true);
    }
  }, []);

  useEffect(() => {
    // Control audio playback based on soundEnabled state
    if (audioRef.current && !audioError) {
      if (soundEnabled) {
        // Reset to beginning if paused
        if (audioRef.current.paused) {
          audioRef.current.currentTime = 0;
        }
        
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Audio playing successfully');
            })
            .catch(err => {
              console.error('Audio play failed:', err);
              // Browser might block autoplay, user needs to interact first
              setAudioError(true);
            });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [soundEnabled, audioError]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  if (!mounted) {
    return (
      <button className="w-11 h-11 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
        <Settings className="w-5 h-5 dark:text-white text-slate-900" />
      </button>
    );
  }

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    
    // Try to play immediately on user interaction
    if (newState && audioRef.current) {
      audioRef.current.play().catch(err => {
        console.error('Play on toggle failed:', err);
      });
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <AnimatePresence>
        {isOpen ? (
          // Expanded horizontal menu
          <motion.div
            initial={{ width: 44 }}
            animate={{ width: "auto" }}
            exit={{ width: 44 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center gap-3 px-3 py-2 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-sm border border-white/20"
            style={{
              background: "rgba(10, 10, 10, 0.8)",
            }}
          >
            {/* Settings Icon */}
            <motion.button
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              className="w-7 h-7 flex items-center justify-center flex-shrink-0"
              onClick={() => setIsOpen(false)}
              aria-label="Close settings"
            >
              <Settings className="w-5 h-5 dark:text-white text-slate-900" />
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              onClick={toggleTheme}
              className="w-7 h-7 flex items-center justify-center flex-shrink-0"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Moon className="w-5 h-5 text-orange-400" strokeWidth={2} />
              ) : (
                <Sun className="w-5 h-5 text-orange-500" strokeWidth={2} />
              )}
            </motion.button>

            {/* Sound Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              onClick={toggleSound}
              className="w-7 h-7 flex items-center justify-center flex-shrink-0 relative"
              aria-label="Toggle sound"
              title={audioError ? "Audio file not found or failed to load" : soundEnabled ? "Mute" : "Unmute"}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 dark:text-white text-slate-900" strokeWidth={2} />
              ) : (
                <VolumeX className="w-5 h-5 dark:text-white text-slate-900" strokeWidth={2} />
              )}
              {audioError && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </motion.button>
          </motion.div>
        ) : (
          // Collapsed settings button
          <motion.button
            initial={{ width: 44 }}
            animate={{ width: 44 }}
            onClick={() => setIsOpen(true)}
            className="w-11 h-11 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 dark:hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-105"
            aria-label="Open settings"
          >
            <Settings className="w-5 h-5 dark:text-white text-slate-900" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
