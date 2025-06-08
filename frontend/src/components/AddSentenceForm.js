// src/components/AddSentenceForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddSentenceForm = () => {
  const [sentenceInput, setSentenceInput] = useState('');
  const [status, setStatus] = useState(null); // 'idle' | 'submitting' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = sentenceInput.trim();
    if (!trimmed) {
      setStatus('error');
      setMessage('Please enter a non-empty Khmer sentence.');
      return;
    }

    setStatus('submitting');
    setMessage(null);

    try {
      const response = await axios.post('/api/sentences', { sentence: trimmed });
      // response.data is { id, sentence }
      setStatus('success');
      setMessage(`Added: (ID ${response.data.id}) ${response.data.sentence}`);
      setSentenceInput(''); // clear input
    } catch (err) {
      console.error('Error adding sentence:', err);
      setStatus('error');
      setMessage('Failed to add sentence. It might already exist or there was a server error.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add a New Khmer Sentence</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Type Khmer sentence here"
          value={sentenceInput}
          onChange={(e) => setSentenceInput(e.target.value)}
          style={styles.input}
          disabled={status === 'submitting'}
        />
        <button
          type="submit"
          style={styles.button}
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Submitting…' : 'Add Sentence'}
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

export default AddSentenceForm;
