# npsh

[![NPM version][npm-img]][npm-url]

Node.js package scripts helper

## Installation

```bash
npm install npsh
```

## Usage

### Semantic version check

To check semantic version of your project
create a `"svc"` script at the `package.json` file.

Here is an example with placeholders:

```json
"svc": "npsh.svc github_user_name project_name branch_name"
```

And a real example which will be checking PR/branch version against master branch:

```json
"svc": "npsh.svc andr-ii nuti master" 
```

### Commit hooks

For adding `pre-commit` and `commit-msg` hooks to your project
create a `"hooks"` script at the `package.json` file.

```json
"hooks": "npsh.hooks"
```

Then simply run following command to add commit hooks:

```bash
npm run hooks
```

By default `pre-commit` hook includes:

- `npm i --package-lock-only`
- `npm run format`
- `npm run lint`
- `npm run types`
- `npm run spell`
- `npm run svc`
- `git add .`

So make sure these scripts are present at the `package.json`.

### `bin` builder

If your project has an executable `./bin/index.js` file and you
would like to avoid to have it in the development (TypeScript for example)
project - `npsh.bin` can be used. It generates `./bin/index.js` executable file
which requires your `lib` module by default.

Create a `"build:bin"` script at the `package.json` file.

```json
"build:bin": "npsh.bin"
```

After execution this script will create a default `./bin/index.js` file
at your project directory:

```js
#!/urs/bin/env node

require('../lib');
```

If your `lib` module exports a function - it can be executed after
`require('../lib')`. Change `"build:bin"` script as following:

```json
"build:bin": "npsh.bin 'myFunc()'"
```

After execurion `./bin/index.js` will have following content:

```js
#!/urs/bin/env node

require('../lib').myFunc();
```

[npm-img]: https://img.shields.io/npm/v/npsh.svg
[npm-url]: https://www.npmjs.com/package/npsh
