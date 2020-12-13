export const validateVitalEnv = (varName: string): string => {
  const envVariable = process.env[varName];

  if (envVariable === undefined) {
    throw Error(`Vital environment variable '${varName}' undefined!`);
  }

  return envVariable;
}
