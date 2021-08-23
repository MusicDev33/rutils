// This is a big boi function that should be shrinked, so...here it is
import { Request, Response } from 'express';
import { execSync } from 'child_process';

export const getOneCpuDataRoute = async (_: Request, res: Response) => {
  // this is meant to run on Linux. If I can find some way to get this output
  // on MacOS, I will add that, but for now, MacOS will use sample data from
  // a Raspberry Pi 4.
  if (process.platform === 'darwin') {
    let results = `Linux 5.4.0-1015-raspi (ubuntu) 	12/14/20 	_aarch64_	(4 CPU)

    23:21:07     CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
    23:21:07     all    0.14    0.01    0.25    0.01    0.00    0.01    0.00    0.00    0.00   99.58
    23:21:07       0    0.13    0.01    0.24    0.01    0.00    0.01    0.00    0.00    0.00   99.61
    23:21:07       1    0.15    0.01    0.26    0.01    0.00    0.00    0.00    0.00    0.00   99.57
    23:21:07       2    0.14    0.01    0.25    0.01    0.00    0.01    0.00    0.00    0.00   99.59
    23:21:07       3    0.15    0.01    0.26    0.01    0.00    0.01    0.00    0.00    0.00   99.56`
    .split('\n');

    results.shift();
    results.shift();
    results.shift();

    type Usage = {cpu: string, usage: string};

    let exportResults: Usage[] = [];

    exportResults = results.map((row: string) => {
      const rowData = row.trim().replace(/\s+/g, ' ').split(' ');

      const cpuUsage = 100 - parseFloat(rowData[rowData.length - 1]);
      const cpuName = rowData[1];
      const usage: Usage = {
        cpu: cpuName,
        usage: cpuUsage.toFixed(2)
      }

      return usage;
    });

    return res.json({results: exportResults});
  }

  try {
    const results = execSync('mpstat -P ALL 1 1').toString('utf-8').split('\n');
    console.log(results);
    results.shift();
    results.shift();
    results.shift();

    if (results.includes('PM') || results.includes('AM')) {
      results.shift();
    }

    results.pop();
    results.pop();
    results.pop();
    results.pop();
    results.pop();
    results.pop();
    results.pop();
    results.pop();

    type Usage = {cpu: string, usage: string};

    let exportResults: Usage[] = [];

    exportResults = results.map((row: string) => {
      const rowData = row.trim().replace(/\s+/g, ' ').split(' ');

      const cpuUsage = 100 - parseFloat(rowData[rowData.length - 1]);
      const cpuName = rowData[1];
      const usage: Usage = {
        cpu: cpuName,
        usage: cpuUsage.toFixed(2)
      }

      return usage;
    });

    return res.json({results: exportResults});
  } catch (e) {
    console.log(e);
    return res.send('error');
  }
}
