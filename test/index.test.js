const logger = require('../lib')('my-logger', {
  logPath: './',
});

describe('Logger', () => {
  it('should log to file', () => {
    logger.info('hello world');
  });
});
