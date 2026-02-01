import { useState, useEffect } from 'react';
import QuoteWidget from './components/QuoteWidget';
import InputBar from './components/InputBar';
import TaskBoard from './components/TaskBoard';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      <div className="container">
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontWeight: 800, color: 'var(--primary-color)', fontSize: '2rem' }}>Task Flow</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your day efficiently.</p>
        </header>

        <QuoteWidget />
        <InputBar onTaskAdded={() => setRefreshKey(k => k + 1)} />
        <TaskBoard refreshKey={refreshKey} />
      </div>

      {isOffline && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'var(--danger-color)',
          color: 'white',
          textAlign: 'center',
          padding: '0.75rem',
          fontWeight: 600
        }}>
          You are currently offline. Changes will save locally.
        </div>
      )}
    </>
  );
}

export default App;
