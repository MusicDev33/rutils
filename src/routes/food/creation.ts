import FoodService from '@services/food.service';

import dotenv from 'dotenv';
const { exec } = require('child-process-async');

import { Request, Response } from 'express';
dotenv.config();
require('dotenv-defaults/config');

export const addFoodRoute = async (req: Request, res: Response) => {
  const body = req.body;

  
}
