import React, { useState } from 'react';
import axios from 'axios';
import './AddSentenceRomanizationForm.css';

const AddSentenceRomanizationForm = () => {
  const [sentenceKhmerInput, setSentenceKhmerInput] = useState('');
  const [sentenceInput, setSentenceInput] = useState('');
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  const fetchRandom = async () => {
    try {
      const response = await axios.get('/api/sentences/random');
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
      const response = await axios.post('/api/sentence-romanization', {
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
    <div className="asrf-container">
      <h2 className="asrf-heading">
        Translate Romanization Sentence{' '}
        <span className="asrf-fetch" onClick={fetchRandom}>fetch random sentence</span>
      </h2>
      <form onSubmit={handleSubmit} className="asrf-form">
        <textarea
          className="asrf-textarea"
          rows={3}
          placeholder="Type Khmer sentence here"
          value={sentenceKhmerInput}
          onChange={(e) => setSentenceKhmerInput(e.target.value)}
          disabled={status === 'submitting'}
        />
        <textarea
          className="asrf-textarea"
          rows={4}
          placeholder="Type Romanization here"
          value={sentenceInput}
          onChange={(e) => setSentenceInput(e.target.value)}
          disabled={status === 'submitting'}
        />
        <button type="submit" className="asrf-button" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Submitting…' : 'Add Sentence'}
        </button>
      </form>

      {status === 'error' && <p className="asrf-message error">{message}</p>}
      {status === 'success' && <p className="asrf-message success">{message}</p>}
    </div>
  );
};

export default AddSentenceRomanizationForm;