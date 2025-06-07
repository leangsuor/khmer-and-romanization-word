// src/components/AddWordForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddWordForm = () => {
    const [wordKhmerInput, setWordKhmerInput] = useState('');
    const [wordInput, setWordInput] = useState('');
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch a random word
    const fetchRandom = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/words/random');
            // response.data will be { id: <number>, word: <string> }
            console.log('Fetched random word:', response.data);
            setWordKhmerInput(response.data.word);
        } catch (err) {
            console.error('Error fetching random word:', err);
            setError('Failed to load a random word.');
            setWordKhmerInput('');
        } finally {
            setLoading(false);
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
            const response = await axios.post('/word-romanization', { word: wordKhmerInput.trim(), romanization: trimmed });
            setStatus('success');
            setMessage(`Added: ${response.data.word}, ${response.data.romanization}`);
            setWordInput('');
        } catch (err) {
            console.error('Error adding word:', err);
            setStatus('error');
            setMessage('Failed to add word. It might already exist or there was a server error.');
        }
    };

    useEffect(() => {
        fetchRandom();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Translate Romanization Word</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                {!loading && !error && wordKhmerInput && (
                    <input
                        type="text"
                        value={wordKhmerInput}
                        readOnly
                        style={styles.input}
                    />
                )}
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
                    onClick={fetchRandom}
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
