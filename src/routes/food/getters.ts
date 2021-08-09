import FoodService from '@services/food.service';

import { Request, Response } from 'express';

// This is going to be a POST request, as I find strings in POST bodies to be
// much more reliable and intuitive than URL encoding.

export const getFoodBySearchRoute = async (req: Request, res: Response) => {
  const searchTerm = req.body.searchTerm;

  const query = {
    '$text': {'$search': searchTerm, '$caseSensitive': false}
  }

  const foundFood = await FoodService.findModelsByQuery(query);

  if (!foundFood) {
    return res.status(503).json({success: false, message: 'Error on search'});
  }

  return res.json({success: true, message: 'Search successful.', payload: foundFood});
}

export const testEndpointRoute = async (req: Request, res: Response) => {
  return res.json({success: true, message: 'Food routes are online.'});
}
