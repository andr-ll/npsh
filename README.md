# @andr-ll/nph

[![NPM version](https://img.shields.io/npm/v/@andr-ll/nph.svg)](https://www.npmjs.com/package/@andr-ll/nph)

Node.js package helper

## Installation

```bash
npm i @andr-ll/nph
```

## Usage

### Semantic version check

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
