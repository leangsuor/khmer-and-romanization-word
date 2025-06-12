// src/components/AddWordRomanizationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './AddWordRomanizationForm.css';

const AddWordRomanizationForm = () => {
    const [wordKhmerInput, setWordKhmerInput] = useState('');
    const [wordInput, setWordInput] = useState('');
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState('');

    const fetchRandom = async () => {
        try {
            const response = await axios.get('/api/words/random');
            setWordKhmerInput(response.data.word);
        } catch (err) {
            console.error('Error fetching random word:', err);
            setWordKhmerInput('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmed = wordInput.trim();
        if (!trimmed) {
            setStatus('error');
            setMessage('Please enter a non-empty Romanization word.');
            return;
        }

        setStatus('submitting');
        setMessage(null);

        try {
            const response = await axios.post('/api/word-romanization', {
                word: wordKhmerInput.trim(),
                romanization: trimmed
            });
            setStatus('success');
            setMessage(`Added: ${response.data.word}, ${response.data.romanization}`);
            setWordKhmerInput('');
            setWordInput('');
        } catch (err) {
            console.error('Error adding word:', err);
            setStatus('error');
            setMessage('Failed to add word. It might already exist or there was a server error.');
        }
    };

    return (
        <div className="awrf-container">
            <h2 className="awrf-heading">
                Translate Romanization Word{' '}
                <span className="awrf-fetch" onClick={fetchRandom}>
                    fetch random word
                </span>
            </h2>
            <form onSubmit={handleSubmit} className="awrf-form">
                <input
                    className="awrf-input"
                    type="text"
                    placeholder="Type Khmer word here"
                    value={wordKhmerInput}
                    onChange={(e) => setWordKhmerInput(e.target.value)}
                    disabled={status === 'submitting'}
                />
                <input
                    className="awrf-input"
                    type="text"
                    placeholder="Type Romanization here"
                    value={wordInput}
                    onChange={(e) => setWordInput(e.target.value)}
                    disabled={status === 'submitting'}
                />
                <button
                    className="awrf-button"
                    type="submit"
                    disabled={status === 'submitting'}
                >
                    {status === 'submitting' ? 'Submitting…' : 'Add Word'}
                </button>
            </form>

            {status === 'error' && <p className="awrf-message error">{message}</p>}
            {status === 'success' && <p className="awrf-message success">{message}</p>}
        </div>
    );
};

export default AddWordRomanizationForm;