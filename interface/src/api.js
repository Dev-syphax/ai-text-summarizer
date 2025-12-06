export const API_URL = "http://localhost:8000";  
export async function summarizeText(text) {
  const response = await fetch(`${API_URL}/summarize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  return response.json();
}

export async function extractKeywords(text) {
  const response = await fetch(`${API_URL}/keywords`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  return response.json();
}
