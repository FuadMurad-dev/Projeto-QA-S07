const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({

  e2e: {
    setupNodeEvents(on, config) {
      // allure reporter: gera os resultados em allure-results/
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      return config;
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
