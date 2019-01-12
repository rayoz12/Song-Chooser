import { createLogger, transports, format } from "winston";

const logger = createLogger({
    level: 'debug',
    format: format.combine(format.colorize(), format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)),
    transports: [
        new transports.Console( { 
            level: process.env.NODE_ENV === "production" ? "error" : "debug",
            debugStdout: false
         }),
        new transports.File({ filename: "debug.log", level: "debug"})
    ]
});

if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}

export default logger;

