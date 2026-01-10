import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to InternAI</h1>
        <p className="text-gray-600 mb-6">Your AI-powered internship platform</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Count: {count}
        </button>
      </div>
    </div>
  );
}
