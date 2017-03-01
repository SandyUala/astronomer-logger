const logger = require('../lib');

describe('Logger', () => {
  it('should log to stdout', () => {
    logger.info('hello world');
  });
});
