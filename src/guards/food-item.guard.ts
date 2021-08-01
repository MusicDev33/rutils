import { IFoodItem } from '@models/food-item.model';

export const validateFoodItem = (model: IFoodItem) => {
	if (model.foodId === undefined) return false;
	if (model.expDate === undefined) return false;
	return true;
}