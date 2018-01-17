const settings = require("../settings");

var knex = require("knex")({
    client: "mysql",
    debug: true,
    connection: settings.dbConfig
});

knex.on("query-error", function (error, obj) {
    console.log(error, obj);
});

module.exports = knex;