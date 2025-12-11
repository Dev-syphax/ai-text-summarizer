export default function TextInput({ value, onChange }) {
  const maxChars = 50000;
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Input text</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={8}
        className="mt-1 w-full p-3 border rounded-md focus:ring focus:ring-blue-200 resize-vertical"
        placeholder="Enter or paste text here..."
      />
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <div>Characters: {value.length}</div>
        <div>{value.length > maxChars ? "Too long" : ""}</div>
      </div>
    </div>
  );
}