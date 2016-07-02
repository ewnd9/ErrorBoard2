import createReporter from 'ohcrash';

const reporter =
  createReporter('media-center', {
    uncaughtExceptions: false,
    exit: false,
    unhandledRejections: false,
    windowOnError: false,
    endpoint: 'http://localhost:3000/api/v1'
  });

reporter.report(new Error('1'));
