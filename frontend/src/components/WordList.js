// src/components/WordList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WordList = () => {
  const [words, setWords] = useState([]);       // array of { id, word }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to load all words
  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/words');
      // response.data is an array of { id, word }
      setWords(response.data);
    } catch (err) {
      console.error('Error fetching all words:', err);
      setError('Failed to load words.');
      setWords([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch once on mount
  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Khmer Words</h2>

      {loading && <p style={styles.infoText}>Loading…</p>}
      {error && <p style={{ ...styles.infoText, color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <>
          {words.length === 0 ? (
            <p style={styles.infoText}>No words found.</p>
          ) : (
            <ul style={styles.list}>
              {words.map(w => (
                <li key={w.id} style={styles.listItem}>
                  <span style={styles.idText}>{w.id}.</span>{' '}
                  <span style={styles.khmerWord}>{w.word}</span>
                </li>
              ))}
            </ul>
          )}
          <button
            style={styles.button}
            onClick={fetchAll}
            disabled={loading}
          >
            {loading ? 'Refreshing…' : 'Refresh List'}
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '1rem',
    textAlign: 'center'
  },
  heading: {
    marginBottom: '1rem'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '1rem',
    maxHeight: '300px',
    overflowY: 'auto',
    border: '1px solid #ddd',
    borderRadius: '4px',
    textAlign: 'left'
  },
  listItem: {
    padding: '0.5rem 1rem',
    borderBottom: '1px solid #f0f0f0'
  },
  idText: {
    color: '#555',
    fontWeight: 'bold'
  },
  khmerWord: {
    fontSize: '1.1rem'
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

export default WordList;
