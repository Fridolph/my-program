/**
 * [UrlParse description]
 * 解析url的方法
 */

UrlParse = function() {
  this.host = location.host
  this.url = location.herf
  this.hash = location.hash
  this.port = location.port
  this.script_name = location.pathname
  this.quartyString = location.search
  this.protocol = location.protocol
  this.GET = this.parseArguement()
}
UrlParse.prototype = {
  parseArguement: function() {
    var pos
    var arg = new Object()
    var quire = location.search.substring(1)
    var pair = quire.split('&')
    if (pair.length > 0) {
      for (var i = 0; i < pair.length; i++) {
        pos = pair[i].indexOf('=')
        if (pos == -1) continue
        argName = pair[i].substring(0, pos)
        argValue = pair[i].substring(pos + 1)
        arg[argName] = argValue
      }
    } else {
      de = quire.indexOf('=')
      if (de != -1) {
        argName = pair[i].substring(0, de)
        argValue = pair[i].substring(de + 1)
        arg[argName] = argValue
      }
    }
    return arg
  }
}
