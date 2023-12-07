import logo from './logo.svg';
import './App.css';
import './styles/globals.css';

import { useState } from "react";
import axios from "axios";
import chatHandler from "./services/chat";


function App() {
  const [apiKey, setApiKey] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const fetchAnswer = async () => {
    if (!apiKey.trim()) {
      alert("API key is required");
      return;
    }
    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    try {
      const response = await chatHandler({
        apiKey: apiKey,  // Pass apiKey and question as an object
        question: question,
      });
      

      setAnswer(response);
      setQuestion("");
    } catch (error) {
      console.error("Error fetching answer:", error);
      setAnswer("Failed to fetch answer. Check the console for more details.");
    }
  };

  return (
    <div id="app">
      <header>
        <h1>OpenAI Question Answering App</h1>
      </header>
      <main>
        <div className="input-group">
          <label htmlFor="api-key">Enter OpenAI API Key:</label>
          <input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="OpenAI API Key"
          />
        </div>
        <div className="input-group">
          <label htmlFor="question">Enter Your Question:</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here"
          ></textarea>
          <button onClick={fetchAnswer}>Get Answer</button>
        </div>
        {answer && (
          <div className="answer-section">
            <h2>Answer:</h2>
            <p>{answer}</p>
          </div>
        )}
      </main>
      {/* Add your CSS styles here */}
    </div>
  );
}


export default App;
