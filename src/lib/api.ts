const BASE_URL = import.meta.env.VITE_API_URL;

export async function generateReadme({
  projectName,
  description,
  tags,
}: {
  projectName: string;
  description: string;
  tags: string[];
}) {
  const res = await fetch(`${BASE_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectName,
      description,
      tags,
    }),
  });

  if (!res.ok) {
    throw new Error("Request failed");
  }

  const data = await res.json();

  return data.result;
}