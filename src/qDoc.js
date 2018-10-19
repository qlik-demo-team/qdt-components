const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/12.20.0.json');
const SenseUtilities = require('enigma.js/sense-utilities');

const MAX_RETRIES = 3;

const responseInterceptors = [{
  // We only want to handle failed responses from QIX Engine:
  onRejected: function retryAbortedError(sessionReference, request, error) {
    // We only want to handle aborted QIX errors:
    if (error.code === schema.enums.LocalizedErrorCode.LOCERR_GENERIC_ABORTED) {
      // We keep track of how many consecutive times we have tried to do this call:
      request.tries = (request.tries || 0) + 1;
      // We do not want to get stuck in an infinite loop here if something has gone
      // awry, so we only retry until we have reached MAX_RETRIES:
      if (request.tries <= MAX_RETRIES) {
        return request.retry();
      }
    }
    // If it was not an aborted QIX call, or if we reached MAX_RETRIES, we let the error
    // trickle down to potential other interceptors, and finally down to resolving/rejecting
    // the initial promise that the user got when invoking the QIX method:
    return this.Promise.reject(error);
  },
}];

const qDoc = async (config) => {
  const myConfig = config;
  // Make it work for Qlik Core scaling https://github.com/qlik-oss/core-scaling
  // qlikcore/engine:12.248.0
  if (myConfig.core) {
    myConfig.subpath = (myConfig.prefix) ? `${myConfig.prefix}/app` : 'app';
    myConfig.route = `doc/${myConfig.appId}`;
  }
  const url = SenseUtilities.buildUrl(myConfig);
  const session = enigma.create({ schema, url, responseInterceptors });
  const global = await session.open();
  if (myConfig.core) {
    return global.getActiveDoc();
  }

  return global.openDoc(myConfig.appId);
};

export default qDoc;
