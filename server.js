const express = require('express');
const app = express();
const PORT = 3000;

//Ruta principal prueba
app.get('/', (req, res) =>{
    res.send('English AI Teacher API is running!');
});

//Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
