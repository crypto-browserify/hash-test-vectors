var crypto = require('crypto')
var hashes = crypto.getHashes()
//inputs taken from rfc4231.txt
var inputs = [{
  "key": "0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b",
  "data": "4869205468657265"
},
{
  "key": "4a656665",
  "data": "7768617420646f2079612077616e74207768617420646f2079612077616e7420"
},
{
  "key": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "data": "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
},
{
  "key": "0102030405060708090a0b0c0d0e0f10111213141516171819",
  "data": "cdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcd"
},
{
  "key": "0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c",
  "data": "546573742057697468205472756e636174696f6e",
  "truncate": 16
},
{
  "key": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "data": "5468697320697320612074657374207573696e672061206c6172676572207468616e20626c6f636b2d73697a65206b657920616e642061206c6172676572207468616e20626c6f636b2d73697a6520646174612e20546865206b6579206e6565647320746f20626520686173686564206265666f7265206265696e6720757365642062792074686520484d414320616c676f726974686d2e"
}]

inputs.forEach(function (input) {
  hashes.forEach(function (alg) {
    var output =
      crypto.createHmac(alg, new Buffer(input.key, 'hex'))
      .update(input.data, 'hex')
      .digest()

    input[alg] = (input.truncate ? output.slice(0, input.truncate) : output).toString('hex')
  })
})

console.log(JSON.stringify(inputs, null, 2))
