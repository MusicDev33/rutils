import { IFood } from '@models/food.model';
import { Food } from '@schemas/food.schema';
import { ModelService } from '@classes/model.service.class';

class FoodService extends ModelService<IFood> {
	private static instance: FoodService;
	
	private constructor() {
		super(Food);
	}
	
	public static getInstance(): FoodService {
		if (!FoodService.instance) {
			FoodService.instance = new FoodService();
		}
		
		return FoodService.instance;
	}
}

const foodService = FoodService.getInstance();
export default foodService;
