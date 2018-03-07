const utilities = {
  uid: (length) => {
    const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const ID_LENGTH = (length) || 8;
    let rtn = '';
    for (let i = 0; i < ID_LENGTH; i += 1) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
  },
};

export default utilities;
