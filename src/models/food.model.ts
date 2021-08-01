import { Document } from 'mongoose';

export interface IFood extends Document {
  name: string;
  brand: string;

  // Automatically set by the backend
  foodId: string;

  tags: string[];

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
