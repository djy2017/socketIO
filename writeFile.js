const fs = require('fs')
const path = require('path')
module.exports = function(filePath, data){
  fs.writeFile(path.join(__dirname,filePath), dataManage(data), (err)=>{
    if(err) throw err
  })

}
function dataManage(data) {
  var cache = []
  let mData = JSON.stringify(data, function(key, value) {
      if (typeof value === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1) {
              return
          }
          cache.push(value)
      }
      return value
  })
  cache = null
  return mData
}