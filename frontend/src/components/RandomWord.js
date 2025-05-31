// src/components/RandomWord.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RandomWord = () => {
  const [wordObj, setWordObj] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch a random word
  const fetchRandom = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/words/random');
      // response.data will be { id: <number>, word: <string> }
      setWordObj(response.data);
    } catch (err) {
      console.error('Error fetching random word:', err);
      setError('Failed to load a random word.');
      setWordObj(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch once on mount
  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Random Khmer Word</h2>

      {loading && <p style={styles.infoText}>Loading…</p>}
      {error && <p style={{ ...styles.infoText, color: 'red' }}>{error}</p>}

      {!loading && !error && wordObj && (
        <div style={styles.wordBox}>
          <span style={styles.khmerWord}>{wordObj.word}</span>
          <span style={styles.idText}>(ID: {wordObj.id})</span>
        </div>
      )}

      <button
        style={styles.button}
        onClick={fetchRandom}
        disabled={loading}
      >
        {loading ? 'Fetching…' : 'Get Another Word'}
      </button>
    </div>
  );
};

// Inline styles (feel free to extract to CSS if you like)
const styles = {
  container: {
    padding: '1rem',
    textAlign: 'center'
  },
  heading: {
    marginBottom: '1rem'
  },
  wordBox: {
    display: 'inline-block',
    padding: '1rem 2rem',
    border: '2px solid #333',
    borderRadius: '8px',
    marginBottom: '1rem'
  },
  khmerWord: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    display: 'block'
  },
  idText: {
    fontSize: '0.9rem',
    color: '#555'
  },
  button: {
    padding: '0.6rem 1.2rem',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  infoText: {
    fontSize: '1rem',
    marginBottom: '1rem'
  }
};

export default RandomWord;
