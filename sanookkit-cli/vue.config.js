const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    pages: {
        index: { entry: "src/main.js", title: "SanookKit" },
    },
    transpileDependencies: [
      'vuetify'
    ],
    lintOnSave: false,
    runtimeCompiler: true
});
