# guardian-runner
Node console runner for guardianjs micro testing framework.  The runner will watch for file changes and in the event of a change will run a test file.  The assumption it makes is that you have a single test file to run which will report its result to the console.

## Install

```bash
$ npm install guardian-runner
```

## Usage

```bash
$ node_modules/guardian-runner start
```

By default this will run ```test.js``` and watch for file changes with a default matching the glob pattern of ```['*.js', '**/*.js']``` (except node_modules folder) which can be overridden with the following:

```bash
$ node_modules/guardian-runner start [testfile] [globpatterns]...
```

Or require the runner in code to make your own watch/runner.

```javascript
var runner = require('guardian-runner');
runner('myguardiantests.js', ['source/**/*.js', '!source/build/*']);
```