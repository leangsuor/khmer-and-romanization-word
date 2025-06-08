// src/components/AddWordRomanizationForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddWordRomanizationForm = () => {
    const [wordKhmerInput, setWordKhmerInput] = useState('');
    const [wordInput, setWordInput] = useState('');
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState('');

    // Function to fetch a random word
    const fetchRandom = async () => {
        try {
            const response = await axios.get('/api/words/random');
            // response.data will be { id: <number>, word: <string> }
            console.log('Fetched random word:', response.data);
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
            const response = await axios.post('/api/word-romanization', { word: wordKhmerInput.trim(), romanization: trimmed });
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
        <div style={styles.container}>
            <h2 style={styles.heading}>Translate Romanization Word <span onClick={fetchRandom} style={{fontSize:'14px', fontWeight:'400', color:'blue', textDecoration:'underline'}}> fetch random word </span></h2> 
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Type Khmer word here"
                    value={wordKhmerInput}
                    onChange={(e) => setWordKhmerInput(e.target.value)}
                    style={styles.input}
                    disabled={status === 'submitting'}
                />
                <input
                    type="text"
                    placeholder="Type Khmer Latin word here"
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

export default AddWordRomanizationForm;
