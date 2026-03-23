import { useEffect, useRef, useState } from 'react';
import { useLibraryStore, usePlaylistStore, useSettingsStore } from './store';
import AudioEngine from './components/AudioEngine';
import ToastContainer from './components/ToastContainer';
import MainHeader from './components/MainHeader';
import NowPlayingPane from './components/NowPlayingPane';
import LibraryPane from './components/LibraryPane';
import { markPerfEnd, markPerfStart, scheduleMemorySnapshot } from './perf';

export type Page = 'home' | 'library' | 'playlists' | 'playlist-detail' | 'settings';

export default function App() {
  const loadTracks = useLibraryStore(s => s.loadTracks);
  const isLibraryLoading = useLibraryStore(s => s.isLoading);
  const trackCount = useLibraryStore(s => s.tracks.length);
  const loadPlaylists = usePlaylistStore(s => s.loadPlaylists);
  const playlistCount = usePlaylistStore(s => s.playlists.length);
  const loadSettings = useSettingsStore(s => s.loadSettings);
  const startupSawLoadingRef = useRef(false);
  const startupLoggedRef = useRef(false);
  const [isStartupReady, setIsStartupReady] = useState(false);
  const [hasMinSplashElapsed, setHasMinSplashElapsed] = useState(false);
  const [isAppVisible, setIsAppVisible] = useState(false);
  const [isDashboardIntroActive, setIsDashboardIntroActive] = useState(false);

  useEffect(() => {
    markPerfStart('app-startup');
    void Promise.allSettled([loadSettings(), loadTracks(), loadPlaylists()]).then(() => {
      setIsStartupReady(true);
    });
  }, [loadPlaylists, loadSettings, loadTracks]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setHasMinSplashElapsed(true);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isStartupReady || !hasMinSplashElapsed) return;
    const timer = window.setTimeout(() => {
      const bootSplash = document.getElementById('boot-splash');
      if (bootSplash) {
        bootSplash.classList.add('is-hiding');
        window.setTimeout(() => {
          bootSplash.remove();
          setIsAppVisible(true);
          setIsDashboardIntroActive(true);
        }, 760);
        return;
      }
      setIsAppVisible(true);
      setIsDashboardIntroActive(true);
    }, 340);

    return () => window.clearTimeout(timer);
  }, [hasMinSplashElapsed, isStartupReady]);

  useEffect(() => {
    if (!isDashboardIntroActive) return;
    const timer = window.setTimeout(() => {
      setIsDashboardIntroActive(false);
    }, 1100);

    return () => window.clearTimeout(timer);
  }, [isDashboardIntroActive]);

  useEffect(() => {
    if (isLibraryLoading) {
      startupSawLoadingRef.current = true;
      return;
    }
    if (!startupSawLoadingRef.current || startupLoggedRef.current) return;
    startupLoggedRef.current = true;
    const meta = { tracks: trackCount, playlists: playlistCount };
    markPerfEnd('app-startup', meta);
    scheduleMemorySnapshot('app-startup-memory', meta);
  }, [isLibraryLoading, playlistCount, trackCount]);

  return (
    <div className={`app-root${isAppVisible ? ' startup-app-visible' : ' startup-app-hidden'}${isDashboardIntroActive ? ' startup-dashboard-intro' : ''}`}>
      <AudioEngine />
      <MainHeader />

      <div className="app-container has-active-track">
        <NowPlayingPane />
        <LibraryPane />
      </div>

      <ToastContainer />
    </div>
  );
}
