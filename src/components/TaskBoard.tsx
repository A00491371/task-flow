import React, { useEffect, useState } from 'react';
import { getAllTasks, deleteTask } from '../db';
import { Task } from '../types';

interface TaskBoardProps {
    refreshKey: number;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ refreshKey }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        getAllTasks().then(data => {
            const sorted = data.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
            setTasks(sorted);
        });
    }, [refreshKey]);

    const handleDelete = async (id: number) => {
        if (confirm('Delete task?')) {
            await deleteTask(id);
            getAllTasks().then(data => setTasks(data.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())));
        }
    };

    const getDeadlineStyle = (deadline: string) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const due = new Date(deadline);
        const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 3600 * 24));

        if (diffDays < 0) return { borderLeft: '5px solid var(--danger-color)', bg: '#fef2f2' }; // Red
        if (diffDays <= 3) return { borderLeft: '5px solid var(--warning-color)', bg: '#fffbeb' }; // Orange
        if (diffDays <= 7) return { borderLeft: '5px solid #facc15', bg: '#fefce8' }; // Yellow
        return { borderLeft: '5px solid var(--success-color)', bg: 'white' }; // Green
    };

    return (
        <div style={{ display: 'grid', gap: '1rem' }}>
            {tasks.map(task => {
                const style = getDeadlineStyle(task.deadline);
                return (
                    <div key={task.id} className="card" style={{
                        borderLeft: style.borderLeft,
                        backgroundColor: style.bg,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem'
                    }}>
                        <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{task.description}</h3>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                Due: {task.deadline}
                            </span>
                        </div>
                        <button onClick={() => handleDelete(task.id!)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.2rem' }}>
                            &times;
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default TaskBoard;
