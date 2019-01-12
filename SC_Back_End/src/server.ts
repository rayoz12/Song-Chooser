//     _____                      ________                              
//    / ___/____  ____  ____ _   / ____/ /_  ____  ____  ________  _____
//    \__ \/ __ \/ __ \/ __ `/  / /   / __ \/ __ \/ __ \/ ___/ _ \/ ___/
//   ___/ / /_/ / / / / /_/ /  / /___/ / / / /_/ / /_/ (__  )  __/ /    
//  /____/\____/_/ /_/\__, /   \____/_/ /_/\____/\____/____/\___/_/     
//                   /____/                                             


import { get } from "config";
import { sequelize } from "./db/sqlite";
import logger from "./util/logger";

import app from "./app";

import { Template } from "./models/Template";






(async () => {
    await sequelize.sync();

    app.listen(8080, () => console.log(`Example app listening on port ${8080}!`))
})();