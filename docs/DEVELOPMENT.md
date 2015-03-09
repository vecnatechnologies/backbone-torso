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
gulp test
```
#### To run the tests with the window console output on the command line:
```
gulp test -v
gulp test:watch -v
```
#### To run a specific test:
```
gulp test --test-folder [import or functional] --test [test spec file name w/o extension]
gulp test:watch --test-folder [import or functional] --test [test spec file name w/o extension]
```
example to run test/spec/functional/formModelSave.js:
```
gulp test --test formModelSave
```
example from another folder (test/spec/import/commonJsImportTest.js)
```
gulp test --test-folder import --test commonJsImportTest
```

### Watch changes and run tests:
```
npm run test:watch
```
or
```
gulp test:watch
```

### Watch changes and run tests and docs:
```
npm run watch
```
or
```
gulp watch
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
