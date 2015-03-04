# backbone-torso
A holistic approach to Backbone applications

## Build Commands:
*Note:* Any command (run-script in npm or any command in gulp) can also remove the dist directory before running by adding :clean to it.
```
npm run-script build:clean
```
or
```
node_modules/gulp/bin/gulp.js build:clean
```

### Install dependencies and perform a full build (including tests, docs, uglifying, etc.):
```
npm install
```
or
```
node_modules/gulp/bin/gulp.js
```

#### Aliases
```
npm run-script default
npm run-script default:clean

npm run-script build
npm run-script build:clean
```
or
```
node_modules/gulp/bin/gulp.js default
node_modules/gulp/bin/gulp.js default:clean

node_modules/gulp/bin/gulp.js build
node_modules/gulp/bin/gulp.js build:clean
```

### Watch changes and run tests:
```
npm run-script watch
```
or
```
node_modules/gulp/bin/gulp.js watch
```

### Build and then Watch changes and run tests:
```
npm run-script develop
npm run-script develop:clean
```
or
```
node_modules/gulp/bin/gulp.js develop
node_modules/gulp/bin/gulp.js develop:clean
```

### Run tests:
```
npm test
npm run-script test:clean
```
or
```
node_modules/gulp/bin/gulp.js test
node_modules/gulp/bin/gulp.js test:clean
```
#### To run the tests with the window console output on the command line:
```
node_modules/gulp/bin/gulp.js test -v
node_modules/gulp/bin/gulp.js test:clean -v
```
#### To run a specific test:
```
node_modules/gulp/bin/gulp.js test --test [test spec file name w/o extension]
node_modules/gulp/bin/gulp.js test:clean --test [test spec file name w/o extension]
```
example to run src/test/spec/commonJsImportTest.js:
```
node_modules/gulp/bin/gulp.js test --test commonJsImportTest
node_modules/gulp/bin/gulp.js test:clean --test commonJsImportTest
```

### Generate Docs:
```
npm run-script doc
npm run-script doc:clean
```
or
```
node_modules/gulp/bin/gulp.js doc
node_modules/gulp/bin/gulp.js doc:clean
```

### Clean dist:
```
npm run-script clean
```
or
```
node_modules/gulp/bin/gulp.js clean
```

### Bundle all torso files into a single bundle:
```
npm run-script bundle
npm run-script bundle:clean
```
or
```
node_modules/gulp/bin/gulp.js bundle
node_modules/gulp/bin/gulp.js bundle:clean
```

## Credits
Originally developed by [Vecna Technologies, Inc.](http://www.vecna.com/) and open sourced as part of its community service program. See the LICENSE file for more details.
Vecna Technologies encourages employees to give 10% of their paid working time to community service projects.
To learn more about Vecna Technologies, its products and community service programs, please visit http://www.vecna.com.
