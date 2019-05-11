const fs = require("fs")

let rawdata = fs.readFileSync("./src/data/data.json")
let rowsData = JSON.parse(rawdata)

exports.createPages = async ({ actions: { createPage } }) => {
  const total = rowsData.length
  const pageSize = 20

  for (let page = 1, i; (i = (page - 1) * pageSize) < total; page += 1) {
    if (page === 1) {
      createPage({
        path: `/`,
        component: require.resolve("./src/templates/index.js"),
        context: {
          rowsData: rowsData.slice(i, i + pageSize),
          page,
          pageSize,
          total,
        },
      })
    }
    createPage({
      path: `/page/${page}`,
      component: require.resolve("./src/templates/index.js"),
      context: {
        rowsData: rowsData.slice(i, i + pageSize),
        page,
        pageSize,
        total,
      },
    })
  }
}
