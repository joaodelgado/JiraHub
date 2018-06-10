const fileSystem = require('fs-extra');
const path = require('path');

const pjson = require('../package.json');
const manifest = require('../src/manifest.json');

// generates the manifest file using the package.json information
manifest.name = pjson.name;
manifest.description = pjson.description;
manifest.version = pjson.version;

fileSystem.writeFileSync(
    path.join(__dirname, '../build/manifest.json'),
    JSON.stringify(manifest)
);
