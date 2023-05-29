"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.update = exports.create = exports.show = exports.index = void 0;
const connection_1 = require("../database/connection");
const index = async (_, res) => {
    try {
        const cars = await (0, connection_1.knex)('cars');
        return res.json(cars);
    }
    catch (_a) {
        return res.status(500).json({ message: 'Internal servidor error.' });
    }
};
exports.index = index;
const show = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await (0, connection_1.knex)('cars')
            .where({ id: Number(id) })
            .first();
        if (!car) {
            return res.status(404).json({ message: 'Car not found.' });
        }
        return res.json(car);
    }
    catch (_a) {
        return res.status(500).json({ message: 'Internal servidor error.' });
    }
};
exports.show = show;
const create = async (req, res) => {
    const { brand, model, year, color, price } = req.body;
    try {
        const car = await (0, connection_1.knex)('cars').insert({
            brand,
            model,
            year,
            color,
            price
        }).returning('*');
        return res.status(201).json(car[0]);
    }
    catch (_a) {
        return res.status(500).json({ message: 'Internal servidor error.' });
    }
};
exports.create = create;
const update = async (req, res) => {
    const { id } = req.params;
    const { brand, model, year, color, price } = req.body;
    try {
        const car = await (0, connection_1.knex)('cars')
            .where({ id: Number(id) })
            .first();
        if (!car) {
            return res.status(404).json({ message: 'Car not found.' });
        }
        await (0, connection_1.knex)('carros')
            .where({ id: Number(id) })
            .update({ brand, model, year, color, price });
        return res.status(204).send();
    }
    catch (_a) {
        return res.status(500).json({ message: 'Internal servidor error.' });
    }
};
exports.update = update;
const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await (0, connection_1.knex)('cars')
            .where({ id: Number(id) })
            .first();
        if (!car) {
            return res.status(404).json({ message: 'Car not found.' });
        }
        await (0, connection_1.knex)('carros')
            .where({ id: Number(id) })
            .del();
        return res.status(204).send();
    }
    catch (_a) {
        return res.status(500).json({ message: 'Internal servidor error.' });
    }
};
exports.destroy = destroy;
