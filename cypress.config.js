const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 1280,
  video: true,
  retries: {
    runMode: 3,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    screenshotsFolder: 'cypress/screenshots',
  },
});
