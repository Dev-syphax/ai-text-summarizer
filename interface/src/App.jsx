import { useState } from "react";
import Header from "./components/Header";
import TextInput from "./components/TextInput";
import ActionButtons from "./components/ActionButtons";
import SummaryBox from "./components/SummaryBox";
import KeywordsBox from "./components/KeywordsBox";
import ErrorAlert from "./components/ErrorAlert";
import FileUploader from "./components/FileUploader";
import { summarizeText, extractKeywords, uploadFile } from "./api";

export default function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState({ summary: false, keywords: false });
  const [error, setError] = useState("");

  const runSummarize = async (inputText = text) => {
    if (!inputText.trim()) return;
    setError("");
    setLoading((s) => ({ ...s, summary: true }));
    try {
      const res = await summarizeText(inputText);
      setSummary(res.summary || "");
    } catch (err) {
      setError(err.message || "Failed to summarize");
    } finally {
      setLoading((s) => ({ ...s, summary: false }));
    }
  };

  const runKeywords = async (inputText = text) => {
    if (!inputText.trim()) return;
    setError("");
    setLoading((s) => ({ ...s, keywords: true }));
    try {
      const res = await extractKeywords(inputText);
      setKeywords(res.keywords || []);
    } catch (err) {
      setError(err.message || "Failed to extract keywords");
    } finally {
      setLoading((s) => ({ ...s, keywords: false }));
    }
  };

  const runBoth = async () => {
    await Promise.all([runSummarize(), runKeywords()]);
  };

  const handleFile = async (file) => {
    // Try to upload file to backend for text extraction (recommended for PDFs)
    setError("");
    try {
      const res = await uploadFile(file);
      if (res.text) setText(res.text);
    } catch (err) {
      setError(err.message || "File upload/extraction failed");
    }
  };

  const clearAll = () => {
    setText("");
    setSummary("");
    setKeywords([]);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <Header />

        {error && <ErrorAlert message={error} />}

        <div className="bg-white rounded-xl shadow p-6 mt-6">
          <FileUploader onFile={handleFile} />

          <TextInput value={text} onChange={setText} />

          <ActionButtons
            onSummarize={() => runSummarize()}
            onKeywords={() => runKeywords()}
            onBoth={runBoth}
            onClear={clearAll}
            loadingSummary={loading.summary}
            loadingKeywords={loading.keywords}
            disabled={!text.trim()}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <SummaryBox summary={summary} />
            <KeywordsBox keywords={keywords} />
          </div>
        </div>
      </div>
    </div>
  );
}