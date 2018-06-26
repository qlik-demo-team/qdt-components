function roundNumber(numb, precision) {
  let num = numb;
  // check if the string passed is number or contains formatting like 13%
  if (/^[0-9.]+$/.test(num)) {
    num = (precision && num > 1000) ? parseFloat(num).toFixed(2) : Math.round(num);
    if (num >= 1000 && num < 1000000) {
      num = (precision) ? parseFloat(num / 1000).toFixed(2) : Math.round(num / 1000);
      if (/\.00$/.test(num)) {
        num = num.replace(/\.00$/, ''); // Remove .00
      }
      num += 'K'; // Add the abbreviation
    } else if (num >= 1000000 && num < 1000000000) {
      num = (precision) ? parseFloat(num / 1000000).toFixed(2) : Math.round(num / 1000000);
      if (/\.00$/.test(num)) {
        num = num.replace(/\.00$/, ''); // Remove .00
      }
      num += 'M'; // Add the abbreviation
    } else if (num >= 1000000000 && num < 1000000000000) {
      num = (precision) ? parseFloat(num / 1000000000).toFixed(2) : Math.round(num / 1000000000);
      if (/\.00$/.test(num)) {
        num = num.replace(/\.00$/, ''); // Remove .00
      }
      num += 'G'; // Add the abbreviation
    } else if (num >= 1000000000000) {
      num = (precision) ? parseFloat(num / 1000000000000).toFixed(2) : Math.round(num / 1000000000000);
      if (/\.00$/.test(num)) {
        num = num.replace(/\.00$/, ''); // Remove .00
      }
      num += 'T'; // Add the abbreviation
      // Change to B and add T
    }
  }
  return num;
}

export default roundNumber;
