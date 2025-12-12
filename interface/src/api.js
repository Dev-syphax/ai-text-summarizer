export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function buildPayload(input) {
  if (input instanceof File) {
    const form = new FormData();
    form.append("file", input);
    return { body: form, isForm: true };
  }

  return {
    body: JSON.stringify({ text: input }),
    isForm: false,
  };
}

export async function summarize(input) {
  const payload = buildPayload(input);

  const res = await fetch(`${API_URL}/summarize`, {
    method: "POST",
    headers: payload.isForm ? undefined : { "Content-Type": "application/json" },
    body: payload.body,
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function extractKeywords(input) {
  const payload = buildPayload(input);

  const res = await fetch(`${API_URL}/keywords`, {
    method: "POST",
    headers: payload.isForm ? undefined : { "Content-Type": "application/json" },
    body: payload.body,
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/* OPTION B — keep PDF→text extraction endpoint */
export async function uploadFile(file) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
