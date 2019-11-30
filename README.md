# JiraHub
Small chrome plugin built with [Vue.js](https://vuejs.org/) to perform Jira ticket transitions directly in a pull-request.

## How to install

Drag and drop `dist/chrome.crx` into `chrome://extensions/`.

## Development

This project uses [yarn](https://yarnpkg.com/en/) to manage dependencies and [Webpack](https://webpack.github.io/) to build the extension.

To install all dependencies run:

    npm install

To build the extension run:

    npm build # or npm watch to watch for changes

Then add the `build/manifest.json` as a unpacked extension.

