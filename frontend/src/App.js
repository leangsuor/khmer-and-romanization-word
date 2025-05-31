// src/App.js
import React, { useState } from 'react';
import RandomWord from './components/RandomWord';
import WordList from './components/WordList';
import AddWordForm from './components/AddWordForm';

function App() {
  // view can be 'random', 'list', or 'add'
  const [view, setView] = useState('random');

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Khmer and Romanization Word Collection</h1>
        <nav style={styles.nav}>
          <button
            onClick={() => setView('random')}
            style={view === 'random' ? styles.activeNavButton : styles.navButton}
          >
            Random Word
          </button>
          <button
            onClick={() => setView('list')}
            style={view === 'list' ? styles.activeNavButton : styles.navButton}
          >
            All Words
          </button>
          <button
            onClick={() => setView('add')}
            style={view === 'add' ? styles.activeNavButton : styles.navButton}
          >
            Add Word
          </button>
        </nav>
      </header>

      <main style={styles.mainContent}>
        {view === 'random' && <RandomWord />}
        {view === 'list'   && <WordList />}
        {view === 'add'    && <AddWordForm />}
      </main>
    </div>
  );
}

const styles = {
  appContainer: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '80VW',
    margin: '0 auto',
    padding: '1rem'
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '0.5rem'
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem'
  },
  navButton: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  activeNavButton: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#333',
    color: '#fff',
    border: '1px solid #333',
    borderRadius: '4px'
  },
  mainContent: {
    minHeight: '400px'
  }
};

export default App;
