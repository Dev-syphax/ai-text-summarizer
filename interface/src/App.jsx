import { useState } from "react";
import { summarizeText, extractKeywords } from "./api";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingKeywords, setLoadingKeywords] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoadingSummary(true);

    const result = await summarizeText(text);
    setSummary(result.summary);

    setLoadingSummary(false);
  };

  const handleKeywords = async () => {
    if (!text.trim()) return;
    setLoadingKeywords(true);

    const result = await extractKeywords(text);
    setKeywords(result.keywords);

    setLoadingKeywords(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">AI Summarizer & Keyword Extractor</h1>
      
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-md">
        <textarea
          className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
          rows={8}
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSummarize}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {loadingSummary ? "Summarizing..." : "Summarize"}
          </button>

          <button
            onClick={handleKeywords}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            {loadingKeywords ? "Extracting..." : "Extract Keywords"}
          </button>
        </div>

        {summary && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Summary</h2>
            <p className="mt-2 p-3 bg-gray-50 border rounded-md">{summary}</p>
          </div>
        )}

        {keywords.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Keywords</h2>
            <div className="flex gap-2 flex-wrap mt-2">
              {keywords.map((kw, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-200 rounded-full text-green-800"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
