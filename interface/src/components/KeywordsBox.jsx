export default function KeywordsBox({ keywords }) {
  const handleCopy = () => navigator.clipboard.writeText((keywords || []).join(', '));
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Keywords</h2>
        <button onClick={handleCopy} className="text-sm text-blue-600 hover:underline">Copy</button>
      </div>
      <div className="mt-2 flex gap-2 flex-wrap">
        {keywords && keywords.length > 0 ? (
          keywords.map((k, i) => (
            <span key={i} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{k}</span>
          ))
        ) : (
          <div className="text-gray-400">No keywords yet.</div>
        )}
      </div>
    </div>
  );
}