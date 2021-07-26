// tslint:disable-next-line
require('tsconfig-paths/register');
import { Project } from 'ts-morph';
import fs from 'fs';
import { generateModelName } from '@gentools/modelname.gen';
import { generateGuardFile } from '@gentools/guard.gen';

if (!fs.existsSync('src/guards')) {
  fs.mkdirSync('src/guards');
}

const project = new Project({
  tsConfigFilePath: 'tsconfig.json'
});

fs.readdir('src/models/', (err, files) => {
  console.log('Generating guards...');

  files.forEach(async (file) => {
    const modelName = generateModelName(file);
    const fileName = file.split('.')[0];

    project.addSourceFileAtPath(`src/models/${file}`);
    const sourceFile = project.getSourceFileOrThrow(file);
    const fileInterface = sourceFile.getInterfaces()[0];

    const properties = fileInterface.getProperties();
    generateGuardFile(modelName, fileName, properties);
  });
});
