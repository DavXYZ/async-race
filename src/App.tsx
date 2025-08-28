import type React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import styles from './App.module.css';
import GaragePage from './pages/Garage';
import WinnerPage from './pages/Winner';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Navigation />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Navigate to="/garage" replace />} />
          <Route path="/garage" element={<GaragePage />} />
          <Route path="/winner" element={<WinnerPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
