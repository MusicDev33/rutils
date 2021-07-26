import FoodService from '@services/food.service';

import { Request, Response } from 'express';

export const getFoodBySearchRoute = async (req: Request, res: Response) => {
  const searchTerm = req.params.searchTerm;

  const query = {
    '$text': {'$search': searchTerm}
  }

  const foundFood = await FoodService.findModelsByQuery(query);

  if (!foundFood) {
    return res.status(503).json({success: false, message: 'Error on search'});
  }

  return res.json({success: true, message: 'Search successful.', payload: foundFood});
}

export const testEndpointRoute = async (req: Request, res: Response) => {
  return res.json({success: true, message: 'This is just a test endpoint.'});
}
