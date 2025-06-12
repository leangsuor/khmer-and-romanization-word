// src/App.js
import React, { useState } from 'react';
import WordList from './components/WordList';
import AddWordForm from './components/AddWordForm';
import AddWordRomanizationForm from './components/AddWordRomanizationForm';
import SentenceList from './components/SentenceList';
import AddSentenceForm from './components/AddSentenceForm';
import AddSentenceRomanizationForm from './components/AddSentenceRomanizationForm';
import './App.css';

function App() {
  const [view, setView] = useState('add-romanization-sentence');

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">Khmer and Romanization Word Collection</h1>
        <nav className="nav">
          <button
            className={view === 'word-list' ? 'nav-button active' : 'nav-button'}
            onClick={() => setView('word-list')}
          >
            All Words
          </button>
          <button
            className={view === 'add-word' ? 'nav-button active' : 'nav-button'}
            onClick={() => setView('add-word')}
          >
            Add Word
          </button>
          <button
            className={view === 'add-word-romanization' ? 'nav-button active' : 'nav-button'}
            onClick={() => setView('add-word-romanization')}
          >
            Word Romanization
          </button>
          <button
            className={view === 'sentence-list' ? 'nav-button active' : 'nav-button'}
            onClick={() => setView('sentence-list')}
          >
            All Sentences
          </button>
          <button
            className={view === 'add-sentence' ? 'nav-button active' : 'nav-button'}
            onClick={() => setView('add-sentence')}
          >
            Add Sentence
          </button>
          <button
            className={view === 'add-romanization-sentence' ? 'nav-button active' : 'nav-button'}
            onClick={() => setView('add-romanization-sentence')}
          >
            Sentence Romanization
          </button>
        </nav>
      </header>

      <main className="main-content">
        {view === 'word-list' && <WordList />}
        {view === 'add-word' && <AddWordForm />}
        {view === 'add-word-romanization' && <AddWordRomanizationForm />}
        {view === 'sentence-list' && <SentenceList />}
        {view === 'add-sentence' && <AddSentenceForm />}
        {view === 'add-romanization-sentence' && <AddSentenceRomanizationForm />}
      </main>
    </div>
  );
}

export default App;