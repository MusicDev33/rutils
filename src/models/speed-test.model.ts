import { Document } from 'mongoose';

export interface SpeedTestModel extends Document {
  time: Date,
  jitter: number,
  latency: number,
  downloadSpeed: number, // in Mbps (bandwidth/125000)
  uploadSpeed: number, // in Mbps (bandwidth/125000)
  resultUrl: string
}
