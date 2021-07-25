import { Document, Model } from 'mongoose';

export class ModelService<P extends Document> {

  private HelperClass: Model<P>;
  protected bannedParams: string[] = [];

  protected constructor(helperClass: Model<P>) {
    this.HelperClass = helperClass;
  }

  public async saveModel(newModel: P): Promise<P | null> {
    try {
      const savedModel = await newModel.save();
      return savedModel;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async saveChangedModel(changedModel: P, changedParam: string): Promise<string> {
    changedModel.markModified(changedParam);

    try {
      const savedModel = await changedModel.save();
      if (savedModel) {
        return 'Successfully changed parameter \'' + changedParam + '\'';
      }
      return `Couldn't change param '${changedParam}' and it's totally our fault. Try again?`;
    } catch (err) {
      console.log(err);
      return 'Error - Insert error code here';
    }
  }

  public async findOneModelByParameter(param: string, paramValue: any): Promise<P | null> {
    if (this.bannedParams.includes(param)) {
      console.log(`Parameter '${param}' is banned!`);
      return null;
    }

    try {
      const query: any = {};
      query[param] = paramValue;
      const foundModel = await this.HelperClass.findOne(query).exec();
      return foundModel;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async findModelsByParameter(param: string, paramValue: any, sort: any = {_id: 1}, limit: number = 30): Promise<P[] | null> {
    if (this.bannedParams.includes(param)) {
      console.log(`Parameter '${param}' is banned!`);
      return null;
    }

    try {
      const query: any = {};
      query[param] = paramValue;
      const foundModels = await this.HelperClass.find(query).sort(sort).limit(limit).exec();
      return foundModels;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async findOneModelByQuery(query: any, sort: any = {_id: 1}, limit: number = 30): Promise<P | null> {
    try {
      const foundModel = await this.HelperClass.findOne(query).sort(sort).limit(limit).exec();
      return foundModel;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async findModelsByQuery(query: any, sort: any = {_id: 1}, limit: number = 30): Promise<P[] | null> {
    try {
      const foundModels = await this.HelperClass.find(query).sort(sort).limit(limit).exec();
      return foundModels;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async findModelsByAggregate(aggregate: any[], sort: any = {}, limit: number = 30): Promise<any[] | null> {
    try {
      const foundModels = await this.HelperClass.aggregate(aggregate).sort(sort).limit(limit).exec();
      return foundModels;
    } catch (err) {
      return null;
    }
  }

  public async removeOneModelByParameter(param: string, paramValue: any): Promise<P | null> {
    if (this.bannedParams.includes(param)) {
      console.log(`Parameter '${param}' is banned!`);
      return null;
    }

    const query: any = {};
    query[param] = paramValue;
    try {
      const removedModel = await this.HelperClass.findOneAndDelete(query).exec();
      return removedModel;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async deleteAll(): Promise<any | null> {
    try {
      const deletedAllModels = await this.HelperClass.deleteMany({}).exec();
      return deletedAllModels;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
