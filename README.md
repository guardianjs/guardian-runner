# guardian-runner
Node console runner for guardianjs micro testing framework.  However you structure

## Install

```bash
$ npm install guardian-runner
```

## Usage

```bash
$ node_modules/guardian-runner start
```

By default this will run test.js and watch for file changes with a default matching the glob pattern of '*.js' (except node_modules folder) which can be overridden with the following:

```bash
$ node_modules/guardian-runner start [testfile] [globpatterns]...
```