const { defineConfig } = require("cypress");

module.exports = defineConfig({

  // reporter configs
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports/",
    overwrite: true,
    html: true,
    json: true,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
       require("cypress-mochawesome-reporter/plugin")(on);
    },
    
    // base URL for tests
    baseUrl: "http://localhost:3000/",

    //viewport configs
    viewportWidth: 1280,
    viewportHeight: 720, 

    // Timeouts 
    defaultCommandTimeout: 4000,
    pageLoadTimeout: 15000,
    requestTimeout: 10000,

    // configs screenshots and videos
    video: true, 
    screenshotOnRunFailure: true,

    // run again if fails
    retries: {
      runMode: 2
    }

  },
});
