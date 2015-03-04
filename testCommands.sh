#!/bin/bash -e

# This file validates that all commands described in the README.md run w/o failure and that a clean node_modules still builds.
# This file does NOT validate that they run correctly, just that they don't outright fail.

rm -rf dist
rm -rf node_modules

npm install
npm test
npm run-script default
npm run-script default:clean
npm run-script build
npm run-script build:clean
npm run-script test:clean
npm run-script doc
npm run-script doc:clean
npm run-script clean
npm run-script bundle
npm run-script bundle:clean

node_modules/gulp/bin/gulp.js
node_modules/gulp/bin/gulp.js default
node_modules/gulp/bin/gulp.js default:clean
node_modules/gulp/bin/gulp.js build
node_modules/gulp/bin/gulp.js build:clean
node_modules/gulp/bin/gulp.js test
node_modules/gulp/bin/gulp.js test:clean
node_modules/gulp/bin/gulp.js test -v
node_modules/gulp/bin/gulp.js test:clean -v
node_modules/gulp/bin/gulp.js test --test commonJsImportTest
node_modules/gulp/bin/gulp.js test:clean --test commonJsImportTest
node_modules/gulp/bin/gulp.js doc
node_modules/gulp/bin/gulp.js doc:clean
node_modules/gulp/bin/gulp.js clean
node_modules/gulp/bin/gulp.js bundle
node_modules/gulp/bin/gulp.js bundle:clean

# TODO: Figure out how to validate that watch type tasks work
# npm run-script watch &

# npm run-script develop &
# npm run-script develop:clean &

# node_modules/gulp/bin/gulp.js watch &

# node_modules/gulp/bin/gulp.js develop &
# node_modules/gulp/bin/gulp.js develop:clean &

