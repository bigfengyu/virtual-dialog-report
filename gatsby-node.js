const fs = require("fs")

let rawdata = fs.readFileSync("./src/data/data.json")
let rowsData = JSON.parse(rawdata)

exports.createPages = async ({ actions: { createPage } }) => {
  createPage({
    path: `/`,
    component: require.resolve("./src/templates/index.js"),
    context: { rowsData },
  })
}