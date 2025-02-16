import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Handle navigation with username validation
  const handleNavigation = (path) => {
    if (!username.trim()) {
      alert('Please enter your username.');
      return;
    }
    navigate(`${path}?username=${encodeURIComponent(username)}`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-200 to-purple-300">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 text-center">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">Welcome to the Polling App</h1>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
        />

        {/* Navigation Buttons */}
        <button
          className="w-full px-6 py-3 mb-4 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all"
          onClick={() => handleNavigation('/attempt-poll')}
        >
          Attempt a Poll
        </button>
        <button
          className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-all"
          onClick={() => handleNavigation('/create-poll')}
        >
          Create a Poll
        </button>
      </div>
    </div>
  );
}

export default App;