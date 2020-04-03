const { createHash } = require('crypto');
console.log(
  createHash('md5')
    .update('root')
    .digest('hex'),
);
