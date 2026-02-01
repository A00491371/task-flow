import React, { useState, useEffect } from 'react';

const FALLBACK_QUOTES = [
    { content: "Productivity is being able to do things that you were never able to do before.", author: "Franz Kafka" },
    { content: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
    { content: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { content: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { content: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" }
];

const QuoteWidget: React.FC = () => {
    const [quote, setQuote] = useState<{ content: string; author: string }>({ content: 'Loading insight...', author: '' });

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                // Using dummyjson as it is more reliable
                const response = await fetch('https://dummyjson.com/quotes/random');
                if (!response.ok) throw new Error('API Error');
                const data = await response.json();

                // Map dummyjson format (quote) to our format (content)
                const newQuote = { content: data.quote, author: data.author };
                setQuote(newQuote);
                localStorage.setItem('cachedQuote', JSON.stringify(newQuote));
            } catch (error) {
                console.log("Using fallback quote", error);
                // Always pick a random fallback on error to ensure variety
                const randomIndex = Math.floor(Math.random() * FALLBACK_QUOTES.length);
                setQuote(FALLBACK_QUOTES[randomIndex]);
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
