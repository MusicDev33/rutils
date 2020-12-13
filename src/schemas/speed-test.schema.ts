import mongoose, { Schema, Model } from 'mongoose';
import { SpeedTestModel } from '@models/speed-test.model';

const SpeedTestSchema: Schema = new Schema({
	time: {type: Date, required: true},
	jitter: {type: Number, required: true},
	latency: {type: Number, required: true},
	downloadSpeed: {type: Number, required: true},
	uploadSpeed: {type: Number, required: true},
  resultUrl: {type: String, required: true}
},{
	minimize: false,
	strict: false
});

export const SpeedTest: Model<SpeedTestModel> = mongoose.model<SpeedTestModel>('SpeedTest', SpeedTestSchema);
