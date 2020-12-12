export interface SpeedTestModel {
  time: Date,
  jitter: number,
  latency: number,
  downloadSpeed: number, // in Mbps (bandwidth/125000)
  uploadSpeed: number, // in Mbps (bandwidth/125000)
  resultUrl: string
}
