import mongoose, { Schema, Model } from 'mongoose';
import { IFoodItem } from '@models/food-item.model';

const FoodItemSchema: Schema = new Schema({
	foodId: {type: String, required: true},
	expDate: {type: String, required: true},
},{
	minimize: false, 
	strict: false
});

export const FoodItem: Model<IFoodItem> = mongoose.model<IFoodItem>('FoodItem', FoodItemSchema);
