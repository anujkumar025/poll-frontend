import { useState } from 'react';
import axios from 'axios';

export default function CreatePoll({ username }) {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [message, setMessage] = useState('');

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const createPoll = async () => {
    if (!title || options.some((opt) => !opt)) {
      setMessage('Please fill out the title and all options.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/createpoll', {
        username,
        title,
        options,
      });
      setMessage(response.data.message || 'Poll created successfully!');
    } catch (error) {
      console.error('Error creating poll:', error);
      setMessage('Failed to create poll.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-200 to-purple-300">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 text-center">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700">Create a Poll</h2>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Enter poll title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
        />

        {/* Options Inputs */}
        <div className="space-y-3 mb-4">
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="px-2 py-1 bg-red-200 text-white rounded-md hover:bg-red-300"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Option Button */}
        <button
          type="button"
          onClick={addOption}
          className="w-full px-4 py-2 mb-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
        >
          ➕ Add Option
        </button>

        {/* Create Poll Button */}
        <button
          type="button"
          onClick={createPoll}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
        >
          🚀 Create Poll
        </button>

        {/* Message Display */}
        {message && <p className="mt-4 text-lg font-medium text-red-600">{message}</p>}
      </div>
    </div>
  );
}
