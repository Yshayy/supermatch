export const variableSymbol = Symbol()
const proxy = {
  get: function(target, name){
    return variable(name)
  }
}

export function variable(s){
  return {[variableSymbol]:s} 
}

export const wildcard = variable('_')

let proxyApi = {}
if (global.Proxy){
  proxyApi = new Proxy({}, proxy)
}

export default proxyApi
