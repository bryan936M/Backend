import os from "os";
import cluster from "cluster";
import app from "../app.js";
import config from "../config/dev.config.js";
import Logger from "../utils/Logger/dev-logger.js";

// if (cluster.isPrimary) {
//     for (let i = 0; i < os.cpus().length; i++) {
//         cluster.fork();
//     }
//     cluster.on('exit', (worker, code, signal) => {
//         Logger.warn(`Worker pid=${worker.process.pid} died. Restarting...`);
//         cluster.fork();
//     })
// } else {
//     app.listen(config.port, () => {
//         Logger.info(`Server is running on port ${config.port}`);
//         Logger.info(`Worker pid=${process.pid} started`)
//     });
// }

app.listen(config.port, () => {
  Logger.info(`Server is running on port ${config.port}`);
});
