#!/bin/bash -e

# This file validates that all commands described in the README.md run w/o failure and that a clean node_modules still builds.
# This file does NOT validate that they run correctly, just that they don't outright fail.

GULP=node_modules/.bin/gulp

function testCommand() {
  rm -f torso-bundle*.js
  rm -rf testSandbox
  rm -rf docs/js
  npm cache clean --force
  rm -rf node_modules
  npm install
  $*
}

testCommand npm test
testCommand npm run build
testCommand npm run doc
testCommand npm run clean

testCommand $GULP
testCommand $GULP default
testCommand $GULP test-templates
testCommand $GULP test-vendor-commonJs
testCommand $GULP test-vendor-globals
testCommand $GULP test
testCommand $GULP test -v
testCommand $GULP test --test-folder import --test commonJsImportTest
testCommand $GULP doc
testCommand $GULP clean
testCommand $GULP bundle

# TODO: Figure out how to validate that watch type tasks work
# npm run watch &

# $GULP bundle:watch &
# $GULP test-templates:watch &
# $GULP test-vendor-commonJs:watch &
# $GULP test-vendor-globals:watch &
# $GULP test:watch &

# $GULP develop &

echo $(jobs)
trap 'kill $(jobs -p)' EXIT
