const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Token que usarás en Meta Developer
const VERIFY_TOKEN = 'nkd_token123';

// Verificación del Webhook (Meta)
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ Verificado Webhook Meta');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Recepción de mensajes (desde Meta)
app.post('/webhook', (req, res) => {
  console.log('📩 Mensaje recibido:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Webhook escuchando en puerto ${PORT}`);
});