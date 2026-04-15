require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  const prompt = `
तुम Samvidhan AI हो।
सरल हिंदी में संविधान के आधार पर जवाब दो।
सवाल: ${message}
`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);

  res.json({ reply: result.response.text() });
});

app.get("/", (req, res) => {
  res.send("Samvidhan AI Running 🚀");
});

app.listen(5000, () => console.log("Server running"));
