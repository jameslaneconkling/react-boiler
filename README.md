## React-Redux Boilerplate

A starter kit for react and redux, with a few bells and whistles, including
* es6 transpilation
* linting
* hot reloading
* scss compilation


### Installation
```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run validate
```

### Known Issues
- eslint fails to parse generic type declarations [see here](https://github.com/eslint/typescript-eslint-parser/issues/399) 
  - switching to tslint might solve
  - or alternatively, stop using jsx
