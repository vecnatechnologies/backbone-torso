# backbone-torso
A holistic approach to Backbone applications

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
node_modules/.bin/gulp
```

### Run tests:
```
npm test
```
or
```
node_modules/.bin/gulp test
```
#### To run the tests with the window console output on the command line:
```
node_modules/.bin/gulp test -v
node_modules/.bin/gulp test:watch -v
```
#### To run a specific test:
```
node_modules/.bin/gulp test --test-folder [import or functional] --test [test spec file name w/o extension]
node_modules/.bin/gulp test:watch --test-folder [import or functional] --test [test spec file name w/o extension]
```
example to run test/spec/functional/formModelSave.js:
```
node_modules/.bin/gulp test --test formModelSave
```
example from another folder (test/spec/import/commonJsImportTest.js)
```
node_modules/.bin/gulp test --test-folder import --test commonJsImportTest
```

### Watch changes and run tests:
```
npm run test:watch
```
or
```
node_modules/.bin/gulp test:watch
```

### Watch changes and run tests and docs:
```
npm run watch
```
or
```
node_modules/.bin/gulp watch
```

### Generate Docs:
```
npm run doc
```
or
```
node_modules/.bin/gulp doc
```

### Clean dist:
```
npm run clean
```
or
```
node_modules/.bin/gulp clean
```

## Credits
Originally developed by [Vecna Technologies, Inc.](http://www.vecna.com/) and open sourced as part of its community service program. See the LICENSE file for more details.
Vecna Technologies encourages employees to give 10% of their paid working time to community service projects.
To learn more about Vecna Technologies, its products and community service programs, please visit http://www.vecna.com.
