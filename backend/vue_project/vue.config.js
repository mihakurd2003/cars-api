const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath :  "/backend/vue_project/dist",
  outputDir :  "./dist/" ,
})
