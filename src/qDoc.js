import utility from './utilities/';

const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/12.20.0.json');
const SenseUtilities = require('enigma.js/sense-utilities');


const qDoc = async (config) => {
  const myConfig = config;
  myConfig.identity = utility.uid(16);
  const url = SenseUtilities.buildUrl(config);
  const session = enigma.create({ schema, url });
  const global = await session.open();
  return global.openDoc(config.appId);
};

export default qDoc;
