import { Request, Response } from 'express';
import { knex } from '../database/connection';
import { Car } from '../types';

export const index = async (_: Request, res: Response) => {
  try {
    const cars = await knex('cars');
    return res.json(cars);
  } catch {
    return res.status(500).json({ message: 'Internal servidor error.' });
  }
};

export const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const car = await knex<Car>('cars')
      .where({ id: Number(id)})
      .first();
    if (!car) {
      return res.status(404).json({ message: 'Car not found.' });
    }
    return res.json(car);
  } catch {
    return res.status(500).json({ message: 'Internal servidor error.' });
  }
};

export const create = async (req: Request, res: Response) => {
  const { brand, model, year, color, price } = req.body;
  try {
    const car = await knex<Omit<Car, 'id'>>('cars').insert({
      brand,
      model,
      year,
      color,
      price
    }).returning('*');
    return res.status(201).json(car[0])
  } catch {
    return res.status(500).json({ message: 'Internal servidor error.' });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { brand, model, year, color, price } = req.body;
  try {
    const car = await knex<Car>('cars')
      .where({ id: Number(id)})
      .first();
    if (!car) {
      return res.status(404).json({ message: 'Car not found.' });
    }
    await knex<Car>('carros')
    .where({ id: Number(id) })
    .update({ brand, model, year, color, price });
    return res.status(204).send();
  } catch {
    return res.status(500).json({ message: 'Internal servidor error.' });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const car = await knex<Car>('cars')
      .where({ id: Number(id)})
      .first();
    if (!car) {
      return res.status(404).json({ message: 'Car not found.' });
    }
    await knex<Car>('carros')
    .where({ id: Number(id) })
    .del();
    return res.status(204).send();
  } catch {
    return res.status(500).json({ message: 'Internal servidor error.' });
  }
};
