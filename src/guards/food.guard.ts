import { IFood } from '@models/food.model';

export const validateFood = (model: IFood) => {
	if (model.name === undefined) return false;
	if (model.brand === undefined) return false;
	if (model.foodId === undefined) return false;
	if (model.tags === undefined) return false;
	if (model.totalServings === undefined) return false;
	if (model.calories === undefined) return false;
	if (model.totalFat === undefined) return false;
	if (model.satFat === undefined) return false;
	if (model.transFat === undefined) return false;
	if (model.totalCarbs === undefined) return false;
	if (model.fiber === undefined) return false;
	if (model.totalSugars === undefined) return false;
	if (model.protein === undefined) return false;
	return true;
}