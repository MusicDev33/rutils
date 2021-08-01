import { IFoodItem } from '@models/food-item.model';
import { FoodItem } from '@schemas/food-item.schema';
import { ModelService } from '@classes/model.service.class';

class FoodItemService extends ModelService<IFoodItem> {
	private static instance: FoodItemService;
	
	private constructor() {
		super(FoodItem);
	}
	
	public static getInstance(): FoodItemService {
		if (!FoodItemService.instance) {
			FoodItemService.instance = new FoodItemService();
		}
		
		return FoodItemService.instance;
	}
}

const foodItemService = FoodItemService.getInstance();
export default foodItemService;
