// tslint:disable-next-line
require('tsconfig-paths/register');
import { Project } from 'ts-morph';
import fs from 'fs';

import { generateModelName } from '@gentools/modelname.gen';
import { generateServiceFile } from '@gentools/service.gen';

const project = new Project({
  tsConfigFilePath: 'tsconfig.json'
});

fs.readdir('src/schemas/', (err, files) => {
  files.forEach(async (file) => {
    const modelName = generateModelName(file);
    const fileName = file.split('.')[0];

    if (!fs.existsSync(`src/services/${fileName}.service.ts`)) {
      generateServiceFile(modelName, fileName);
    }
  });
});
