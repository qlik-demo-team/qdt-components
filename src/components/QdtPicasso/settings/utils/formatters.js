import picasso from 'picasso.js';

picasso.formatter('abs', () => (v) => Math.abs(v));
