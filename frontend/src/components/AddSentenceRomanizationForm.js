// src/components/AddSentenceRomanizationForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddSentenceRomanizationForm = () => {
  const [sentenceKhmerInput, setSentenceKhmerInput] = useState('');
  const [sentenceInput, setSentenceInput] = useState('');
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  // Function to fetch a random sentence
  const fetchRandom = async () => {
    try {
      const response = await axios.get('/sentences/random');
      setSentenceKhmerInput(response.data.sentence);
    } catch (err) {
      console.error('Error fetching random sentence:', err);
      setSentenceKhmerInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = sentenceInput.trim();
    if (!trimmed) {
      setStatus('error');
      setMessage('Please enter a non-empty Romanization sentence.');
      return;
    }

    setStatus('submitting');
    setMessage(null);

    try {
      const response = await axios.post('/sentence-romanization', {
        sentence: sentenceKhmerInput.trim(),
        romanization: trimmed
      });
      setStatus('success');
      setMessage(`Added: ${response.data.sentence}, ${response.data.romanization}`);
      setSentenceKhmerInput('');
      setSentenceInput('');
    } catch (err) {
      console.error('Error adding sentence:', err);
      setStatus('error');
      setMessage('Failed to add sentence. It might already exist or there was a server error.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Translate Romanization Sentence <span onClick={fetchRandom} style={{fontSize:'14px', fontWeight:'400', color:'blue', textDecoration:'underline'}}> fetch random sentence </span></h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
            type="text"
            placeholder="Type Khmer word here"
            rows={3}
            value={sentenceKhmerInput}
            onChange={(e) => setSentenceKhmerInput(e.target.value)}
            style={styles.textarea}
            disabled={status === 'submitting'}
        />
        <textarea
          rows={4}
          placeholder="Type Romanization here"
          value={sentenceInput}
          onChange={(e) => setSentenceInput(e.target.value)}
          style={styles.textarea}
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
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  textarea: {
    padding: '0.5rem',
    fontSize: '1rem',
    width: '700px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    resize: 'vertical'
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

export default AddSentenceRomanizationForm;
