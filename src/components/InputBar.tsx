import React, { useState } from 'react';
import { addTask } from '../db';
import { Task } from '../types';

interface InputBarProps {
    onTaskAdded: () => void;
}

const InputBar: React.FC<InputBarProps> = ({ onTaskAdded }) => {
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!desc || !date) return;

        try {
            await addTask({
                description: desc,
                deadline: date,
                createdAt: new Date(),
                isCompleted: false
            });
            setDesc('');
            setDate('');
            onTaskAdded();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <input
                className="input-field"
                style={{ flex: 2, minWidth: '200px' }}
                type="text"
                placeholder="New Task..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
            />
            <input
                className="input-field"
                style={{ flex: 1 }}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <button type="submit" className="btn-primary">Add</button>
        </form>
    );
};

export default InputBar;
