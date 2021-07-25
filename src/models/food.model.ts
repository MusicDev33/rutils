import { Document } from 'mongoose';

export interface IFood extends Document {
  totalServings: number;
  calories: number;

  // The following values are in grams
  totalFat: number;
  satFat: number;
  transFat: number;
  totalCarbs: number;
  fiber: number;
  totalSugars: number;
  protein: number;

  // The following are in milligrams
  cholesterol: number;
  sodium: number;
  vitaminD: number;
  calcium: number;
  iron: number;
  potassium: number;

  nonStrict?: boolean;
}
