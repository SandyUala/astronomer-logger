const bunyan = require('bunyan');
const uuid = require('uuid');
const path = require('path');
const RollingFileStream = require('streamroller').RollingFileStream;

/**
 * Creates a new bunyan logger with name and configuration.
 * @param {String} name Name of the logger.
 * @param {Object} [config] Options to configure bunyan.
 * @param {String} [config.logPath] Filesystem path where 'info' logs will be written.
 */

function createLogger(name, config) {
  const streams = [];
  if (config.logPath) {
    const logPath = path.join(config.logPath, `${uuid.v4()}.log`);
    const rollingStream = new RollingFileStream(logPath, 100000000, 3);
    streams.push({
      level: 'info',
      stream: rollingStream,
    });
  }

  const options = {
    name: name || 'astronomer-logger',
    streams,
  };

  return bunyan.createLogger(options);
}

module.exports = createLogger;
