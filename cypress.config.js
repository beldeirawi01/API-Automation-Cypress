const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      baseURL: "https://api.techglobal-training.com/students"
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
