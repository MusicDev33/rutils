import * as Validate from './env.validate';
import dotenv from 'dotenv';
dotenv.config();
require('dotenv-defaults/config');

test('NODE_NAME == whoami', () => {
  expect(Validate.validateVitalEnv('NODE_NAME')).toBe('whoami');
});
