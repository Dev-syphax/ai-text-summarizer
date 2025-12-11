export default function SummaryBox({ summary }) {
  const handleCopy = () => navigator.clipboard.writeText(summary || "");
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Summary</h2>
        <button onClick={handleCopy} className="text-sm text-blue-600 hover:underline">Copy</button>
      </div>
      <div className="mt-2 p-3 min-h-[120px] bg-gray-50 border rounded-md whitespace-pre-wrap">{summary || <span className="text-gray-400">No summary yet.</span>}</div>
    </div>
  );
}