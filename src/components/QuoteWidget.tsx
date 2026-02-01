import React, { useState, useEffect } from 'react';

const FALLBACK_QUOTES = [
    { content: "Productivity is being able to do things that you were never able to do before.", author: "Franz Kafka" },
    { content: "Focus on being productive instead of busy.", author: "Tim Ferriss" }
];

const QuoteWidget: React.FC = () => {
    const [quote, setQuote] = useState<{ content: string; author: string }>({ content: 'Loading insight...', author: '' });

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await fetch('https://api.quotable.io/random');
                if (!response.ok) throw new Error('API Error');
                const data = await response.json();
                setQuote(data);
                localStorage.setItem('cachedQuote', JSON.stringify(data));
            } catch (error) {
                console.log("Using fallback quote", error);
                const cached = localStorage.getItem('cachedQuote');
                if (cached) {
                    setQuote(JSON.parse(cached));
                } else {
                    setQuote(FALLBACK_QUOTES[0]);
                }
            }
        };
        fetchQuote();
    }, []);

    return (
        <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--primary-color)' }}>
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                "{quote.content}"
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'right' }}>
                — {quote.author}
            </p>
        </div>
    );
};

export default QuoteWidget;
