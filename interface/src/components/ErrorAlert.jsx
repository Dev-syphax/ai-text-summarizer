export default function ErrorAlert({ message }) {
  return (
    <div className="mt-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-700">
      <strong>Error:</strong> {message}
    </div>
  );
}