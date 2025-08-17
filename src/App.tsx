import type React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Garage from './pages/Garage/Garage';
import Winner from './pages/Winner/Winner';
import Navigation from './components/Navigation/Navigation';
import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Navigation />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Navigate to="/garage" replace />} />
          <Route path="/garage" element={<Garage />} />
          <Route path="/winner" element={<Winner />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
