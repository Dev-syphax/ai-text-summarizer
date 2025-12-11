export default function ActionButtons({ onSummarize, onKeywords, onBoth, onClear, loadingSummary, loadingKeywords, disabled }) {
  return (
    <div className="flex gap-3 mt-4 flex-wrap">
      <button
        onClick={onSummarize}
        disabled={disabled || loadingSummary}
        className={`px-4 py-2 rounded-md text-white ${disabled ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loadingSummary ? 'Summarizing...' : 'Summarize'}
      </button>

      <button
        onClick={onKeywords}
        disabled={disabled || loadingKeywords}
        className={`px-4 py-2 rounded-md text-white ${disabled ? 'bg-green-300' : 'bg-green-600 hover:bg-green-700'}`}
      >
        {loadingKeywords ? 'Extracting...' : 'Extract Keywords'}
      </button>

      <button
        onClick={onBoth}
        disabled={disabled || loadingSummary || loadingKeywords}
        className={`px-4 py-2 rounded-md text-white ${disabled ? 'bg-purple-300' : 'bg-purple-600 hover:bg-purple-700'}`}
      >
        Run Both
      </button>

      <button
        onClick={onClear}
        className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
      >
        Clear
      </button>
    </div>
  );
}