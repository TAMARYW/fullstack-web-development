import { useState } from 'react';
import Header from './Header';
import Notice from './Notice';


export default function MiniPoll() {
    const [options, setOptions] = useState([
        { id: 1, name: 'אייזנקוט', votes: 0 },
        { id: 2, name: 'נתניהו', votes: 0 },
        { id: 3, name: 'בנט', votes: 0 },
    ]);

    const [showResults, setShowResults] = useState(false);
    const [newOptionName, setNewOptionName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleVote = (id) => {
        setOptions((prev) =>
            prev.map((opt) =>
                opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt
            )
        );
    };

    const handleResetVotes = () => {
        setOptions((prev) => prev.map((opt) => ({ ...opt, votes: 0 })));
    };

    const handleAddOption = (e) => {
        e.preventDefault();
        if (!newOptionName.trim()) {
            setErrorMessage('אנא הכנס שם מועמד');
            return;
        }

        const newOption = {
            id: Date.now(),
            name: newOptionName.trim(),
            votes: 0,
        };

        setOptions((prev) => [...prev, newOption]);
        setNewOptionName('');
        setErrorMessage('');
    };


    const getLeader = () => {
        if (options.length === 0) return null;

        const maxVotes = Math.max(...options.map((o) => o.votes));

        if (maxVotes === 0) {
            return { hasVotes: false, text: 'טרם נרשמו הצבעות' };
        }

        const topOptions = options.filter((o) => o.votes === maxVotes);

        if (topOptions.length > 1) {
            const tieNames = topOptions.map((o) => o.name).join(', ');
            return {
                hasVotes: true,
                text: `תיקו בין ${tieNames} (עם ${maxVotes} קולות כל אחד)`
            };
        }

        return {
            hasVotes: true,
            text: `${topOptions[0].name} (עם ${maxVotes} קולות)`
        };
    };

    
    const leader = getLeader();

    return (
        <div className="poll-container">
            <Header showResults={showResults} setShowResults={setShowResults} />

            <main className="poll-content">
                <Notice message={errorMessage} />
                {showResults && leader && (
                    <div className="leader-box">
                        {leader.hasVotes ? (
                            <>
                                <span>🏆 המוביל כרגע: </span>
                                <strong>{leader.text}</strong>
                            </>
                        ) : (
                            <span>📊 {leader.text}</span>
                        )}
                    </div>
                )}

                {options.length === 0 ? (
                    <p className="empty-msg">אין מועמדים בסקר כרגע.</p>
                ) : (
                    <ul className="options-list">
                        {options.map((opt) => (
                            <li key={opt.id} className="option-item">
                                <span className="option-name">{opt.name}</span>

                                {showResults && (
                                    <span className="votes-count">{opt.votes} קולות</span>
                                )}

                                <button
                                    className="btn-vote"
                                    onClick={() => handleVote(opt.id)}
                                >
                                    הצבע 🗳️
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <form onSubmit={handleAddOption} className="add-option-form">
                    <input
                        type="text"
                        placeholder="שם מועמד חדש..."
                        value={newOptionName}
                        onChange={(e) => {
                            setNewOptionName(e.target.value);
                            if (errorMessage) setErrorMessage('');
                        }}
                    />
                    <button type="submit" className="btn-add">
                        הוסף מועמד
                    </button>
                </form>

                {options.length > 0 && (
                    <button className="btn-reset" onClick={handleResetVotes}>
                        איפוס הצבעות 🔄
                    </button>
                )}
            </main>
        </div>
    );
}