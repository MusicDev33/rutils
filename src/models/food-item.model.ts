import { Document } from 'mongoose';

export interface IFoodItem extends Document {
  foodId: string;

  // dd/mm/yyyy
  expDate: string;

  nonStrict?: boolean;
}
