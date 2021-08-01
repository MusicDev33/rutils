import mongoose, { Schema, Model } from 'mongoose';
import { IFood } from '@models/food.model';

const FoodSchema: Schema = new Schema({
	name: {type: String, required: true},
	brand: {type: String, required: true},
	foodId: {type: String, required: true},
	tags: [{type: String, required: true}],
	totalServings: {type: Number, required: true},
	calories: {type: Number, required: true},
	totalFat: {type: Number, required: true},
	satFat: {type: Number, required: true},
	transFat: {type: Number, required: true},
	totalCarbs: {type: Number, required: true},
	fiber: {type: Number, required: true},
	totalSugars: {type: Number, required: true},
	protein: {type: Number, required: true},
	cholesterol: {type: Number, required: true},
	sodium: {type: Number, required: true},
	vitaminD: {type: Number, required: true},
	calcium: {type: Number, required: true},
	iron: {type: Number, required: true},
	potassium: {type: Number, required: true},
},{
	minimize: false, 
	strict: false
});

export const Food: Model<IFood> = mongoose.model<IFood>('Food', FoodSchema);
