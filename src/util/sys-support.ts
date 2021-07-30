// This will just be a function for determining system support for
// a given process.
import { platform } from 'process';

export const platformSupported = (supportedPlatforms: NodeJS.Platform[]): boolean => {
  if (!supportedPlatforms.includes(platform)) {
    return false;
  }

  return true;
}
