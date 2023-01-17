import { useState } from "react";
import "./App.css";

export default function App() {
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "1c03575da1mshe5a1953660b645dp1f91d1jsn91c7d035905a",
      "X-RapidAPI-Host": "you-chat-gpt.p.rapidapi.com",
    },
    body: JSON.stringify({ question: textInput, max_response_time: 30 }),
  };

  async function onSubmit(event) {
    setLoading(true);
    event.preventDefault();
    await fetch("https://you-chat-gpt.p.rapidapi.com/", options)
      .then((response) => response.json())
      .then((response) => {
        setResult(response);
        console.log(response);
      })
      .catch((err) => console.error(err));
    setLoading(false);
  }

  return (
    <div className="App">
      <h2>ChatGPT</h2>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="search"
            placeholder="Ask me anything..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <input type="submit" value="Generate answers" />
        </form>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div
            className="search-results"
            dangerouslySetInnerHTML={{ __html: result.answer }}
          ></div>
        )}
      </main>
    </div>
  );
}
