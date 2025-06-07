// src/App.js
import React, { useState } from 'react';
import WordList from './components/WordList';
import AddWordForm from './components/AddWordForm';
import AddWordRomanizationForm from './components/AddWordRomanizationForm';
import SentenceList from './components/SentenceList';
import AddSentenceForm from './components/AddSentenceForm';

function App() {
  // view can be 'sentence-list', 'word-list', or 'add-word'
  const [view, setView] = useState('word-list');

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Khmer and Romanization Word Collection</h1>
        <nav style={styles.nav}>
          <button
            onClick={() => setView('word-list')}
            style={view === 'word-list' ? styles.activeNavButton : styles.navButton}
          >
            All Words
          </button>
          <button
            onClick={() => setView('add-word')}
            style={view === 'add-word' ? styles.activeNavButton : styles.navButton}
          >
            Add Word
          </button>
          <button
            onClick={() => setView('add-word-romanization')}
            style={view === 'add-word-romanization' ? styles.activeNavButton : styles.navButton}
          >
            Word Romanization
          </button>
          <button
            onClick={() => setView('sentence-list')}
            style={view === 'sentence-list' ? styles.activeNavButton : styles.navButton}
          >
            All Sentences
          </button>
          <button
            onClick={() => setView('add-sentence')}
            style={view === 'add-sentence' ? styles.activeNavButton : styles.navButton}
          >
            Add Sentence
          </button>
          <button
            onClick={() => setView('add-romanization-sentence')}
            style={view === 'add-romanization-sentence' ? styles.activeNavButton : styles.navButton}
          >
            Sentence Romanization
          </button>
        </nav>
      </header>

      <main style={styles.mainContent}>
        {view === 'word-list'   && <WordList />}
        {view === 'add-word'    && <AddWordForm />}
        {view === 'add-word-romanization' && <AddWordRomanizationForm />}
        {view === 'sentence-list' && <SentenceList />}
        {view === 'add-sentence'    && <AddSentenceForm />}
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
