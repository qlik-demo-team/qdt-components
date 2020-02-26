import merge from 'deepmerge';

export default (x, y) => merge(x, y, { arrayMerge: (destinationArray, sourceArray) => sourceArray });
