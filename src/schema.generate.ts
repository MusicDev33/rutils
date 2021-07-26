// tslint:disable-next-line
require('tsconfig-paths/register');
import { Project } from 'ts-morph';
import { generateSchema } from '@gentools/schemablock.gen';
import fs from 'fs';
import { generateModelName } from '@gentools/modelname.gen';

const project = new Project({
  tsConfigFilePath: 'tsconfig.json',
});

if (!fs.existsSync('src/schemas')) {
  fs.mkdirSync('src/schemas');
}

fs.readdir('src/models/', (err, files) => {
  console.log('Generating schemas...');

  files.forEach(async (file) => {
    const modelName = generateModelName(file);

    project.addSourceFileAtPath(`src/models/${file}`);
    const sourceFile = project.getSourceFileOrThrow(file);
    const fileInterface = sourceFile.getInterfaces()[0];

    const properties = fileInterface.getProperties();

    generateSchema(file, modelName, properties);
  });
});
