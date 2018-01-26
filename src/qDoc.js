import config from './qConfig';

const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/12.20.0.json');
const SenseUtilities = require('enigma.js/sense-utilities');


async function qDocAsync() {
  const url = SenseUtilities.buildUrl(config);
  const session = enigma.create({ schema, url });
  const global = await session.open();
  const qDoc = await global.openDoc(config.appId);
  return qDoc;
}

const qDocPromise = qDocAsync();

export default qDocPromise;
