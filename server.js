require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');
const express = require('express');

const app = express();
const PORT = 3000;

// Constante centralizada para evitar caídas si Google actualiza versiones
const MODEL_NAME = 'gemini-3.8-flash';


// Inicializamos el cliente oficial con tu API Key del .env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Middleware fundamental para que Express pueda leer cuerpos JSON en los POST
app.use(express.json());

// Ruta de prueba rápida (GET)
app.get('/test-ai', async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: 'Say hello in English as an AI teacher.',
    });
    
    res.json({ success: true, answer: response.text });
  } catch (error) {
    console.error("Error al conectar con la IA:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Ruta principal para el chat (POST)
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ success: false, error: 'El campo message es obligatorio' });
    }

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: message,
      config: {
    systemInstruction: "You are a professional, encouraging, and strict English teacher. Your goal is to help the user practice English. Always check their grammar and vocabulary in their messages. If they make a mistake, gently correct them, explain the rule briefly, and provide the natural way to say it. If they make no mistakes, acknowledge it and keep the conversation flowing naturally with an engaging question."
  }
    });

    res.json({ success: true, reply: response.text });
  } catch (error) {
    console.error("DETALLE DEL ERROR DE LA IA:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: error.status || 'Desconocido'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});