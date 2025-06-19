const API_URL = "http://localhost:4000/api/question";

export const sendQuestion = async (question: string) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  return res.json();
};
