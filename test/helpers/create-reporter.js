import createReporter from 'ohcrash';

export default endpoint => {
  return createReporter('test', {
    uncaughtExceptions: false,
    exit: false,
    unhandledRejections: false,
    windowOnError: false,
    endpoint
  });
};
