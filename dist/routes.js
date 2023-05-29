"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cars_1 = require("./controllers/cars");
const routes = (0, express_1.Router)();
// index cars
routes.get('/cars', cars_1.index);
// show car
routes.get('/cars/:id', cars_1.show);
// create car
routes.post('/cars/create', cars_1.create);
// update car - put to update all the data or patch to update part of the data
routes.put('/cars/:id', cars_1.update);
// delete car
routes.delete('/cars/:id', cars_1.destroy);
exports.default = routes;
