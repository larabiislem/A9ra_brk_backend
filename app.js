require('dotenv').config(); 
const express = require('express'); 
const pool = require('./config/db'); 
const errorHandler = require("./controller/errorHandler");

const playlistRouter = require('./routes/playlist_routes'); 
const userRouter = require('./routes/user_routes'); 
const courRouter = require('./routes/cours_routes'); 
const playlistCourRouter = require('./routes/playlistCour_routes'); 
const keywordRouter = require('./routes/keyword_routes');    
const playlistKeywordRouter = require('./routes/playlistkeyword_routes'); 
const abonementRouter = require('./routes/abonnement_router');







const app = express();
app.use(express.json());
app.use('/api', playlistCourRouter);
app.use('/api', playlistRouter);
app.use('/api', userRouter); 
app.use('/api', courRouter);
app.use('/api', playlistKeywordRouter);
app.use('/api', keywordRouter);
app.use('/api', abonementRouter);
  



app.use(errorHandler);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});

