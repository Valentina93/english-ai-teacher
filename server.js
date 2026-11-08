require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;
// Usamos el modelo estable y activo de Gemini
const MODEL_NAME = 'gemini-3.8-flash';

const ai = new GoogleGenAI();

const SYSTEM_INSTRUCTION = "You are a professional, encouraging, and helpful English teacher. Help the user practice English, gently correct grammar mistakes if needed, and keep the conversation engaging.";

// Ruta principal del chat con Gemini
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ success: false, error: "Message is required" });
        }

        console.log(`[AI] Procesando mensaje con ${MODEL_NAME}...`);
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: `${SYSTEM_INSTRUCTION}\n\nUser: ${message}`,
        });

        res.json({ success: true, reply: response.text });

    } catch (error) {
        console.error("DETALLE DEL ERROR DE LA IA:", error);
        res.status(500).json({ success: false, error: error.message || "Failed to generate response." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor de profesor de inglés activo en http://localhost:3000`);
});