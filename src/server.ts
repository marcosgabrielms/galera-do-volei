import express from 'express';
import partidaRoutes from '../src/routers/partida.routes'
import jogadorRoutes from '../src/routers/jogador.routes'

const app = express();
app.use(express.json());

app.use('/api', partidaRoutes); // Adicionado prefixo /api
app.use('/api', jogadorRoutes); 

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`🏐 Servidor "Galera do Vôlei" rodando na porta ${PORT}!`);
});  
