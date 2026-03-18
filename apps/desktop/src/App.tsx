import React, { useEffect, useRef } from 'react';
import { useLibraryStore, usePlayerStore, usePlaylistStore, useSettingsStore } from './store';
import AudioEngine from './components/AudioEngine';
import ToastContainer from './components/ToastContainer';
import MainHeader from './components/MainHeader';
import NowPlayingPane from './components/NowPlayingPane';
import LibraryPane from './components/LibraryPane';
import { markPerfEnd, markPerfStart, scheduleAfterFirstPaint, scheduleMemorySnapshot } from './perf';

export type Page = 'home' | 'library' | 'playlists' | 'playlist-detail' | 'settings';

class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error('App render error:', error);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 20, color: 'white', background: '#7f1d1d', fontFamily: 'Segoe UI, sans-serif' }}>
          <h1>App Render Error</h1>
          <p>{this.state.error.message}</p>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

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
    let cancelDeferredLoads = () => {};
    markPerfStart('app-startup');
    void loadSettings().finally(() => {
      cancelDeferredLoads = scheduleAfterFirstPaint(() => {
        void Promise.allSettled([loadTracks(), loadPlaylists()]);
      });
    });
    return () => cancelDeferredLoads();
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
    <AppErrorBoundary>
      <div className="app-root">
        <div
          style={{
            position: 'fixed',
            top: 8,
            left: 8,
            zIndex: 99999,
            padding: '6px 8px',
            borderRadius: 8,
            background: 'rgba(0, 0, 0, 0.72)',
            color: '#fff',
            fontSize: 12,
            fontFamily: 'Consolas, monospace',
            pointerEvents: 'none',
            whiteSpace: 'pre-wrap',
          }}
        >
          {[
            'debug: app-mounted',
            `tracks=${trackCount}`,
            `playlists=${playlistCount}`,
            `loading=${String(isLibraryLoading)}`,
            `currentTrack=${currentTrackId ?? 'none'}`,
            `paneOpen=${String(isNowPlayingOpen)}`,
            `paneVisible=${String(isNowPlayingVisible)}`,
          ].join('\n')}
        </div>

        <AudioEngine />
        <MainHeader />

        <div className="app-container has-active-track">
          <NowPlayingPane />
          <LibraryPane />
        </div>

        <ToastContainer />
      </div>
    </AppErrorBoundary>
  );
}
