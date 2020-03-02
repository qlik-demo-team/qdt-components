import deepmerge from 'deepmerge';

const merge = (x, y) => deepmerge(x, y, { arrayMerge: (destinationArray, sourceArray) => sourceArray });

merge.all = (arr) => deepmerge.all(arr, { arrayMerge: (destinationArray, sourceArray) => sourceArray });

export default merge;
