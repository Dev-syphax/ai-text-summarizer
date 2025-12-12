import { useRef , useState} from "react";
export default function FileUploader({ onFile }) {
  const fileRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const handleChange = (e) => {
  const f = e.target.files?.[0];
  if (!f) return;
    setFileName(f.name);
    onFile(f);
  };


  return (
    <div className="flex items-center gap-4">
      <label className="block text-sm font-medium text-gray-700">Upload PDF file</label>
      <input type="file" accept=".txt,application/pdf" ref={fileRef} onChange={handleChange} className="hidden" />
      <button type="button" onClick={() => fileRef.current?.click()} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"> Choose File </button>
      {fileName && (
        <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1">
          <span className="text-sm text-gray-600">{fileName}</span>
          <button type="button" onClick={() => { setFileName(""); fileRef.current.value = null; onFile(null); }} className="text-red-500 hover:text-red-700">✕</button>
        </div>
  
      )}
    </div>
);
}