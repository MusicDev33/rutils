import CodeBlockWriter from 'code-block-writer';
import { PropertySignature } from 'ts-morph';
import fs from 'fs';

export const generateGuardFile = (modelName: string, fileName: string, properties: PropertySignature[]) => {
  const writer = new CodeBlockWriter({
    newLine: "\r\n",
    indentNumberOfSpaces: 2,
    useTabs: true,
    useSingleQuote: true
  });

  writer.writeLine(`import { I${modelName} } from '@models/${fileName}.model';`);
  writer.writeLine('');

  writer.write(`export const validate${modelName} = (model: I${modelName}) =>`).block(() => {
    properties.forEach(property => {
      writer.writeLine(`if (model.${property.getName()} === undefined) return false;`);
    });

    writer.writeLine('return true;');
  });

  const newFileName = `src/guards/${fileName}.guard.ts`;

  fs.writeFile(newFileName, writer.toString(), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${newFileName} written!`);
    }
  });
}
