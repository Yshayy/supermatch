import buildPattern from './patterns/build_pattern'
class Case{
  constructor(pattern, action){
    this.pattern = pattern
    this.action = action
  }
  eval(value, next){
    let match = this.pattern.match(value)
    return match && this.action(value, match) || next(value)    
  }
}

function createCase([rawPattern, action]){
  return new Case(buildPattern(rawPattern), action)
}

function pairs(arr){
  return arr.reduce((acc, next, i)=> i%2 ==0 ? [...acc, [next]] : [...acc.slice(1), [...acc[acc.length-1], next]], [])
}

const NoMatch = ()=>{throw 'no match'}

function createMatcher(exp){
  const cases = pairs(exp).map(createCase)
  return cases.reduceRight((acc,next)=> (value)=>
    next.eval(value,acc)
  , NoMatch)
}

export default function match(match, ...exp){
  return createMatcher(exp)(match)
}