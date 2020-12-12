import speedTest from 'speedtest-net';

(async () => {
  console.log('test');
  try {
    console.log(await speedTest());
  } catch (err) {
    console.log(err.message);
  } finally {
    process.exit(0);
  }
})();
