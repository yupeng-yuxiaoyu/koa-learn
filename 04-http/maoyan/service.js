const Http = require('http')
const queryString = require('querystring')

module.exports = {
  search: async (kw = "狮子王") => {
    return new Promise((resolve, reject) => {
      Http.request({
        hostname: 'm.maoyan.com',
        path: '/ajax/search?' + queryString.stringify({
          kw,
          cityId: 10
        })
      }, (res) => {
        res.setEncoding('utf-8')
        let data = []
        res.on('data', (chunk) => {
          data.push(chunk)
        }).on('end', () => {
          resolve(data.join(''))
        })
      }).end()
    })

  }
}