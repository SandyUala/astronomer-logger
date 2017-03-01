import bunyan from 'bunyan';
import uuid from 'uuid';
import path from 'path';
import { RollingFileStream } from 'streamroller';

const logPath = process.env.BUNYAN_LOG_PATH ? path.join(process.env.LOG_PATH, `${uuid.v4()}.log`) : './app.log';
const rollingStream = new RollingFileStream(logPath, 100000000, 3);

function getDefaultStreams() {
  const streams = [
    {
      level: 'debug',
      stream: process.stdout,
    },
  ];

  if (process.env.NODE_ENV === 'production') {
    streams.push({
      level: 'info',
      stream: rollingStream,
    });
  }

  return streams;
}

const options = {
  name: process.env.BUNYAN_APP_NAME || 'astronomer-logger',
  streams: getDefaultStreams(),
};

const log = bunyan.createLogger(options);

export default log;
