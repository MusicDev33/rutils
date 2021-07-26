import CodeBlockWriter from 'code-block-writer';
import fs from 'fs';

export const generateServiceFile = (modelName: string, fileName: string) => {
  const writer = new CodeBlockWriter({
    newLine: "\r\n",
    indentNumberOfSpaces: 2,
    useTabs: true,
    useSingleQuote: true
  });

  writer.writeLine(`import { I${modelName} } from '@models/${fileName}.model';`);
  writer.writeLine(`import { ${modelName} } from '@schemas/${fileName}.schema';`);
  writer.writeLine(`import { ModelService } from '@classes/model.service.class';`);
  writer.writeLine('');

  writer.write(`class ${modelName}Service extends ModelService<I${modelName}>`).block(() => {
    writer.writeLine(`private static instance: ${modelName}Service;`);
    writer.writeLine('');

    writer.write('private constructor()').block(() => {
      writer.write(`super(${modelName});`);
    });

    writer.writeLine('');

    writer.write(`public static getInstance(): ${modelName}Service`).block(() => {
      writer.write(`if (!${modelName}Service.instance)`).block(() => {
        writer.write(`${modelName}Service.instance = new ${modelName}Service();`)
      });
      writer.writeLine('');

      writer.write(`return ${modelName}Service.instance;`);
    });
  });

  writer.writeLine('');

  const exportName = modelName[0].toLowerCase() + modelName.substring(1) + 'Service';

  writer.writeLine(`const ${exportName} = ${modelName}Service.getInstance();`);
  writer.writeLine(`export default ${exportName};`);

  const newFileName = `src/services/${fileName}.service.ts`;

  fs.writeFile(newFileName, writer.toString(), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${newFileName} written!`);
    }
  });
}
