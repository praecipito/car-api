import { Router } from "express";
import {
  create,
  index,
  show,
  update,
  destroy
} from "./controllers/cars";

const routes = Router();

// index cars
routes.get('/cars', index);
// show car
routes.get('/cars/:id', show);
// create car
routes.post('/cars/create', create);
// update car - put to update all the data or patch to update part of the data
routes.put('/cars/:id', update);
// delete car
routes.delete('/cars/:id', destroy);

export default routes;
