# @andr-ll/nph

Node.js package helper

## Installation

Make sure you have added registry configuration to `~/.npmrc` file before installation.

```bash
echo '@andr-ll:registry=https://npm.pkg.github.com' >> ~/.npmrc
```

Then install the package:

```bash
npm i @andr-ll/nph
```

## Usage

### Semantic cersion check

To check semantic version add new script to the
`scripts` of your project's `package.json` file.

Here is an example with placeholders:

```json
"svc": "nph.svc github_user_name project_name branch_name"
```

And a real example which will be checking PR/branch version against master branch:

```json
"svc": "nph.svc andr-ll nuti master" 
```
