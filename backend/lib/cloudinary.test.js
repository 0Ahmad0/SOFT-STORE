const assert = require('assert')
const { publicIdFromUrl } = require('./cloudinary')

assert.strictEqual(
  publicIdFromUrl('https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v123/soft-store/products/a.jpg'),
  'soft-store/products/a'
)
assert.strictEqual(publicIdFromUrl('/uploads/a.jpg'), null)
