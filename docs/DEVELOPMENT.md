# Development
## Build Commands:

### Install dependencies:
```
npm install
```

### Full build
```
npm run build
```
or
```
gulp
```

### Run tests:
```
npm test
```
or
```
# Functional tests
npm run test-func
# Import tests
npm run test-import
```

#### To run a specific import test:

```
gulp test-import --test-folder import --test [test spec file name w/o extension]
gulp test-import:watch --test-folder import --test [test spec file name w/o extension]
```
example from another folder (test/spec/import/commonJsImportTest.js)
```
gulp test --test-folder import --test commonJsImportTest
```

#### To run a specific function test:

**Unknown - to be determined**

### Watch changes and run import tests:
```
npm run watch-import
```
or
```
gulp watch-import
```

### Generate Docs:
```
npm run doc
```
or
```
gulp doc
```

### Clean dist:
```
npm run clean
```
or
```
gulp clean
```

*Note* if you don't have gulp installed you can use:
```
node_modules/.bin/gulp
```
instead of
```
gulp
```

### Release Commands:
Run once to install release-it:
```
npm install release-it -g
```
Then when you want to release run this (run from the upstream repo, i.e. the one directly from vecnatechnologies, not your fork).  You will need appropritate rights to push.
```
release-it
```
