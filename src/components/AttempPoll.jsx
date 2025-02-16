import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function AttemptPoll() {
    const query = useQuery();
    const username = query.get('username');

    const [poll, setPoll] = useState({ title: '', options: [], score: [] });
    const [selectedOption, setSelectedOption] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [showScores, setShowScores] = useState(false);

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/polls?username=${username}`);
                if (response.data.title && response.data.options.length) {
                    setPoll(response.data);
                } else {
                    setMessage('Poll does not exist.');
                }
            } catch (error) {
                console.error('Error fetching poll:', error);
                setMessage('Failed to load poll.');
            } finally {
                setLoading(false);
            }
        };
        fetchPoll();        
    }, [username]);

    const handleVote = async () => {
        if (selectedOption === null) {
            setMessage('Please select an option.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/api/select', {
                username,
                selectOption: selectedOption
            });
            if (response.data.message === 'Score updated successfully') {
                setPoll(prev => ({
                    ...prev,
                    score: response.data.updatedScore
                }));
                setMessage('Vote recorded successfully!');
                setShowScores(true);
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error('Error submitting vote:', error);
            setMessage('Failed to submit vote.');
        }
    };

    if (loading) return <div className="text-center mt-20 text-xl">Loading poll...</div>;

    if (message && !poll.title) {
        return <div className="text-center mt-20 text-xl text-red-600">{message}</div>;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-200 to-purple-300">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 text-center">
                <h2 className="text-3xl font-bold mb-6 text-indigo-700">{poll.title}</h2>
                <div className="flex flex-col items-start space-y-4 mb-6">
                    {poll.options.map((option, index) => (
                        <label key={index} className="flex items-center space-x-3 w-full bg-gray-100 rounded-lg p-3 hover:bg-gray-200 cursor-pointer">
                            <input
                                type="radio"
                                name="pollOption"
                                value={index}
                                checked={selectedOption === index}
                                onChange={() => setSelectedOption(index)}
                                className="accent-indigo-600"
                            />
                            <span className="text-lg text-gray-800">{option}</span>
                        </label>
                    ))}
                </div>
                <button
                    onClick={handleVote}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                >
                    Submit Vote
                </button>
                {showScores && (
                    <div className="mt-6 text-left">
                        <h3 className="text-lg font-semibold mb-2 text-indigo-700">Updated Scores:</h3>
                        {poll.options.map((option, index) => (
                            <div key={index} className="text-md text-gray-700">
                                {option}: {poll.score[index] || 0}
                            </div>
                        ))}
                    </div>
                )}
                {message && <p className="mt-4 text-red-600">{message}</p>}
            </div>
        </div>
    );
}
