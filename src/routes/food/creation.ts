import FoodService from '@services/food.service';
import { Food } from '@schemas/food.schema';
import { validateFood } from '@guards/food.guard';

import { Request, Response } from 'express';

export const addFoodRoute = async (req: Request, res: Response) => {
  const body = req.body;

  console.log(body);

  if (body.name === undefined) {
    return res.status(400).json({success: false, message: 'Name required.'})
  }

  const brandId = body.brand.replace(/\s+/g, '-').toLowerCase();
  const nameId = body.name.replace(/\s+/g, '-').replace(/[.]/g, '').toLowerCase();

  body['foodId'] = `${brandId}_${nameId}`;

  if (!validateFood(req.body)) {
    return res.status(400).json({success: false, message: 'Invalid object given, could not convert body to Food Object.'});
  }

  const newFood = new Food(body);

  const savedFood = await FoodService.saveModel(newFood);

  if (!savedFood) {
    return res.status(503).json({success: false, message: 'Could not save food object to database'});
  }

  return res.status(201).json({success: true, message: 'Successfully added food to database.'});
}
