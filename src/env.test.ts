import * as Validate from './env.validate';
import dotenv from 'dotenv';
dotenv.config();

test('TEST_ENV == testing', () => {
  expect(Validate.validateVitalEnv('TEST_ENV')).toBe('testing');
});
