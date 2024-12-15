// logger.js
import winston from 'winston';
import config from './config'

const LOG_LEVEL= config.ENV_TYPE === 'development' ? 'debug' : 'info';

const transports = [];

// Console transport
transports.push(
  new winston.transports.Console({
    level: LOG_LEVEL,
  })
);

// File transport (if LOG_FILE is provided)
// if (LOG_FILE) {
//   transports.push(
//     new winston.transports.File({
//       filename: LOG_FILE,
//       level: LOG_LEVEL,
//     })
//   );
// }

const logger = winston.createLogger({
  level: LOG_LEVEL,
  transports,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

export default logger;