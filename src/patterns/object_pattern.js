import buildPattern from './build_pattern'
const EmptyContext = {}

export default class ObjectPattern{
  constructor(pattern){
    this.pattern = pattern
  }
  match(value){
    let context = EmptyContext
    for (let key of Object.keys(this.pattern)){
      let match = buildPattern(this.pattern[key]).match(value[key])
      if (!match) return
      context = {...context, ...match}
    }
    return context
  }
}