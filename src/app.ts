import express from 'express';
import routesPetShop from './routes/petshops.routes';
import routesPet from './routes/pets.routes';
//import routesR from './routes/remaining.routes';

const app = express();

app.use(express.json());

//Rotas
app.use(routesPetShop);
app.use(routesPet);
//app.use('/remaining', routesR);

export default app;