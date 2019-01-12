import { get } from "config";
import { sequelize } from "./db/sqlite";
import logger from "./util/logger";

import app from "./app";

import { Template } from "./models/Template";

// get("server");

(async () => {
    await sequelize.sync();

    app.listen(8080, () => console.log(`Example app listening on port ${8080}!`))
})();