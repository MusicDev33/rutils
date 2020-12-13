import { SpeedTestModel } from '@models/speed-test.model';
import { SpeedTest } from '@schemas/speed-test.schema';
import { ModelService } from '@classes/model-service.class';

class SpeedTestService extends ModelService<SpeedTestModel> {
  private static instance: SpeedTestService;

  private constructor() {
    super(SpeedTest);
  }

  public static getInstance(): SpeedTestService {
    if (!SpeedTestService.instance) {
      SpeedTestService.instance = new SpeedTestService();
    }

    return SpeedTestService.instance;
  }
}

const speedTestService = SpeedTestService.getInstance();
export default speedTestService;
