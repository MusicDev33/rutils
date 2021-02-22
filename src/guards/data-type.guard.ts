const ALLOWED = ['downloadSpeed', 'uploadSpeed', 'jitter', 'latency'];

export const DataTypeGuard = (dataType: string): boolean => {
  if (dataType in ALLOWED) {
    return true;
  }

  return false;
}
