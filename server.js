const express = require('express');
const app = express();
const PORT = 3000;

//Middleware: Permite que el servidor entienda datos en formato JSON 
app.use(express.json());

//Ruta GET: para comprobar que el servidor responde
app.get('/', (req, res) =>{
    res.send('English AI Teacher API is running!');
});

//NUEVA RUTA POST: Recibe el mensaje del usuario y simula una respuesta
app.post(`/api/chat`, (req,res) =>{
    //Capturamos el mensaje que nos envía el usuario
    const userMessage = req.body.message;

    console.log('Mensaje recibido del usuario: ${userMessage}');

    //Devolvemos una respuesta de prueba (aquí en el futuro conectaremos la IA)
    res.json({
        status: 'success',
        reply: 'Hello! I received your message: "${userMessage}". Let´s practice English!'
    });
});

//Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
