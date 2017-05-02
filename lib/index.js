const bunyan = require('bunyan');
const uuid = require('uuid');
const path = require('path');
const RollingFileStream = require('streamroller').RollingFileStream;

const name = process.env.BUNYAN_APP_NAME || 'astronomer-logger';

function getDefaultStreams() {
  const streams = [];

  if (process.env.DEBUG === name) {
    streams.push({
      level: 'debug',
      stream: process.stdout,
    });
  }

  if (process.env.ASTRONOMER_LOG_PATH) {
    const logPath = path.join(process.env.ASTRONOMER_LOG_PATH, `${uuid.v4()}.log`);
    const rollingStream = new RollingFileStream(logPath, 100000000, 3);
    streams.push({
      level: 'info',
      stream: rollingStream,
    });
  }

  return streams;
}

const options = {
  name,
  streams: getDefaultStreams(),
};

const log = bunyan.createLogger(options);

module.exports = log;
