// src/components/AddWordForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddWordForm = () => {
  const [wordInput, setWordInput] = useState('');
  const [status, setStatus] = useState(null); // 'idle' | 'submitting' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = wordInput.trim();
    if (!trimmed) {
      setStatus('error');
      setMessage('Please enter a non-empty Khmer word.');
      return;
    }

    setStatus('submitting');
    setMessage(null);

    try {
      const response = await axios.post('/api/words', { word: trimmed });
      // response.data is { id, word }
      setStatus('success');
      setMessage(`Added: (ID ${response.data.id}) ${response.data.word}`);
      setWordInput(''); // clear input
    } catch (err) {
      console.error('Error adding word:', err);
      setStatus('error');
      setMessage('Failed to add word. It might already exist or there was a server error.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add a New Khmer Word</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Type Khmer word here"
          value={wordInput}
          onChange={(e) => setWordInput(e.target.value)}
          style={styles.input}
          disabled={status === 'submitting'}
        />
        <button
          type="submit"
          style={styles.button}
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Submitting…' : 'Add Word'}
        </button>
      </form>

      {status === 'error' && (
        <p style={{ ...styles.message, color: 'red' }}>{message}</p>
      )}
      {status === 'success' && (
        <p style={{ ...styles.message, color: 'green' }}>{message}</p>
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
  form: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem'
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    width: '250px',
    marginRight: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  button: {
    padding: '0.6rem 1.2rem',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  message: {
    fontSize: '1rem'
  }
};

export default AddWordForm;
