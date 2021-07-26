import CodeBlockWriter from 'code-block-writer';
import { PropertySignature } from 'ts-morph';
import { getMongooseString } from '@gentools/type.map';
import fs from 'fs';

export const generateSchema = (file: string, name: string, properties: PropertySignature[]) => {
  const writer = new CodeBlockWriter({
    newLine: "\r\n",
    indentNumberOfSpaces: 2,
    useTabs: true,
    useSingleQuote: true
  });

  const importStatement = `import { I${name} } from '@models/${file.split('.ts')[0]}';`;
  const importMongoose = `import mongoose, { Schema, Model } from 'mongoose';`;
  writer.write(importMongoose);
  writer.writeLine(importStatement);
  writer.newLine();
  let strict = true;
  writer.write(`const ${name}Schema: Schema = new Schema(`).inlineBlock(() => {
    if (properties.length) {
      properties.forEach((property, index) => {
        if (property.getName() === 'nonStrict') {
          strict = false;
          return;
        }

        const propertyType = property.getType().getText().split(' | ')[0].split('.');
        const finalType = propertyType[propertyType.length - 1];
        writer.write(`${property.getName()}: `);
        const line = getMongooseString(finalType, `required: ${!property.hasQuestionToken()}`);
        writer.write(line);
        if (index < properties.length - 1) {
          writer.write(',');
        }
        writer.newLine();
      });
    }
  });

  writer.write(',').inlineBlock(() => {
    writer.write('minimize: false');

    if (!strict) {
      writer.write(', ');
      writer.newLine();
      writer.write('strict: false');
    }
  });

  writer.write(');');

  writer.newLine();
  writer.newLine();
  writer.writeLine(`export const ${name}: Model<I${name}> = mongoose.model<I${name}>('${name}', ${name}Schema);`);

  const fileName = `src/schemas/${file.split('.')[0].toLowerCase()}.schema.ts`;

  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
  }

  fs.writeFile(fileName, writer.toString(), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${file.split('.')[0].toLowerCase()}.schema.ts written!`);
    }
  });
};
