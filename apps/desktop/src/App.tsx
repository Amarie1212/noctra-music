import { useEffect, useRef } from 'react';
import { useLibraryStore, usePlayerStore, usePlaylistStore, useSettingsStore } from './store';
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
  const currentTrackId = usePlayerStore(s => s.currentTrackId);
  const isNowPlayingOpen = usePlayerStore(s => s.isNowPlayingOpen);
  const isNowPlayingVisible = usePlayerStore(s => s.isNowPlayingVisible);
  const startupSawLoadingRef = useRef(false);
  const startupLoggedRef = useRef(false);

  useEffect(() => {
    markPerfStart('app-startup');
    void Promise.allSettled([loadSettings(), loadTracks(), loadPlaylists()]);
  }, [loadPlaylists, loadSettings, loadTracks]);

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
    <div className="app-root">
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
