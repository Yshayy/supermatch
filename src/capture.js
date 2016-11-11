export const variableSymbol = Symbol()
const proxy = {
  get: function(target, name){
    return variable(name)
  }
}

export function variable(s){
  return {[variableSymbol]:s} 
}

let proxyApi = {}
if (global.Proxy){
  proxyApi = new Proxy({}, proxy)
}

export default proxyApi
