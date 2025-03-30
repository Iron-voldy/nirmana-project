// utils/logger.js
const { createLogger, format, transports } = require('winston');
const { env, isProd, logLevel } = require('../config/env');

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// Add colors to winston
require('winston').addColors(colors);

// Define the format for logs
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  format.colorize({ all: true }),
  format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Define which transports to use based on environment
const logTransports = [
  // Always log errors to a separate file
  new transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      format.json()
    ),
  }),
  
  // Log everything to a combined file
  new transports.File({
    filename: 'logs/combined.log',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      format.json()
    ),
  }),
];

// If not in production, also log to console
if (!isProd) {
  logTransports.push(
    new transports.Console({
      format: logFormat,
    })
  );
}

// Create the logger
const logger = createLogger({
  level: logLevel,
  levels,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.json()
  ),
  transports: logTransports,
});

// Export logger
module.exports = logger;