function uid(length) {
  const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const ID_LENGTH = (length) || 8;
  let rtn = '';
  for (let i = 0; i < ID_LENGTH; i += 1) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
}

export default uid;
