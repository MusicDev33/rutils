import { IFood } from '@models/food.model';

export const validateFood = (model: IFood) => {
	if (model.totalServings === undefined) return false;
	if (model.calories === undefined) return false;
	if (model.totalFat === undefined) return false;
	if (model.satFat === undefined) return false;
	if (model.transFat === undefined) return false;
	if (model.totalCarbs === undefined) return false;
	if (model.fiber === undefined) return false;
	if (model.totalSugars === undefined) return false;
	if (model.protein === undefined) return false;
	if (model.cholesterol === undefined) return false;
	if (model.sodium === undefined) return false;
	if (model.vitaminD === undefined) return false;
	if (model.calcium === undefined) return false;
	if (model.iron === undefined) return false;
	if (model.potassium === undefined) return false;
	if (model.nonStrict === undefined) return false;
	return true;
}