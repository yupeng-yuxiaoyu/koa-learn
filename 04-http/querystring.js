const querystring = require('querystring');
console.log(querystring.escape('id=1'));
console.log(querystring.unescape('id%3D1'));
console.log(querystring.parse('type=1&status=0'));
console.log(querystring.stringify({
  type: '1',
  status: '0'
}));