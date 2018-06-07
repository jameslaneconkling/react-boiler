const fs = require('fs');

const name = process.argv[2];
const nameCamelCase = name.replace(/^[A-Z]/, l => l.toLowerCase());
const componentName = name.replace(/Container$/, '');


if (!name) {
  console.error('Missing container name as first and only command argument');
  process.exit(1);
} else if (
  !(name[0].charCodeAt() >= 65 && name[0].charCodeAt() <= 90) ||
  !/Container$/.test(name)
) {
  console.error('Container name must be PascalCase, start with a letter, and end in "Container"');
  process.exit(1);
}


const containerTemplate = `\
import {
  compose,
} from 'recompose';
import ${componentName} from '../../components/${componentName}';

export interface I${name} {}

export type I${componentName} = I${name};

export default compose<I${componentName}, I${name}>()(${componentName});
`;


const indexTemplate = `\
export { default } from './${nameCamelCase}';
`;


fs.mkdir(`${__dirname}/src/containers/${name}`, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  fs.writeFileSync(
    `${__dirname}/src/containers/${name}/${nameCamelCase}.ts`,
    containerTemplate
  );

  fs.writeFileSync(
    `${__dirname}/src/containers/${name}/index.ts`,
    indexTemplate
  );
});
