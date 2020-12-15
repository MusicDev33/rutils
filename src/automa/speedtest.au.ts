import speedTest from 'speedtest-net';
import { SpeedTest } from '@schemas/speed-test.schema';
import SpeedTestService from '@services/speed-test.service';

export const runSpeedTest = async () => {
  console.log('\nStarting Speed Test\n');
  try {
    const results = await speedTest();
    console.log(results);
    const model = new SpeedTest({
      time: results.timestamp,
      jitter: results.ping.jitter,
      latency: results.ping.latency,
      downloadSpeed: results.download.bandwidth / 125000,
      uploadSpeed: results.upload.bandwidth / 125000,
      resultUrl: results.result.url
    });

    const savedTest = await SpeedTestService.saveModel(model);

    if (savedTest) {
      console.log('Saved Speed Test successfully!');
    } else {
      console.log('Could not save test');
    }
  } catch (err) {
    console.log(err.message);
  }
}
