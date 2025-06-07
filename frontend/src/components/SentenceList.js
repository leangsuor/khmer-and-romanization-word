// src/components/SentenceList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SentenceList = () => {
  const [sentences, setSentences] = useState([]);       // array of { id, sentence }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to load all sentences
  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/sentences');
      // response.data is an array of { id, sentence }
      setSentences(response.data);
    } catch (err) {
      console.error('Error fetching all sentences:', err);
      setError('Failed to load sentences.');
      setSentences([]);
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
      <h2 style={styles.heading}>All Khmer Sentences</h2>

      {loading && <p style={styles.infoText}>Loading…</p>}
      {error && <p style={{ ...styles.infoText, color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <>
          {sentences.length === 0 ? (
            <p style={styles.infoText}>No sentences found.</p>
          ) : (
            <ul style={styles.list}>
              {sentences.map(w => (
                <li key={w.id} style={styles.listItem}>
                  <span style={styles.idText}>{w.id}.</span>{' '}
                  <span style={styles.khmerSentence}>{w.sentence}</span>
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
  khmerSentence: {
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

export default SentenceList;
