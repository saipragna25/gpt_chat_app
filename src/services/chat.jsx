import axios from "axios";

export default async function handler({ apiKey, question }) {
    //console.log("req.method", req.method);
    //const { apiKey, question } = req.body;

    try {
      const prompt = `Answer concisely: ${question}`;
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        {
          prompt: prompt,
          max_tokens: 100,
          temperature: 0.1,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error("Error in OpenAI API request:", error);
      throw new Error("Error in processing the request");
    }
  } 
  

