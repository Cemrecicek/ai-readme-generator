export async function generateReadme({
  projectName,
  description,
  tags,
}: {
  projectName: string;
  description: string;
  tags: string[];
}) {
  const res = await fetch("http://localhost:3000/generate", {
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

  const data = await res.json();

  return data.result;
}