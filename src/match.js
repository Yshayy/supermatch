import {variableSymbol} from "./capture";
const EmptyContext = {}

class VariablePattern {
  constructor(pattern){
    this.pattern = pattern
  }
  match(value){
    return {[this.pattern[variableSymbol]]: value}
  }
}

class ExactStringPattern {
  constructor(pattern){
    this.pattern = pattern
  }
  match(value){
    return value == this.pattern && EmptyContext
  }
}

class RegexPattern {
  constructor(pattern){
    this.pattern = pattern
  }
  match(value){
    return value.match(this.pattern)
  }
}
class ObjectPattern{
  constructor(pattern){
    this.pattern = pattern
  }
  match(value){
    let context = EmptyContext
    for (let key of Object.keys(this.pattern)){
      let match = buildPattern(this.pattern[key]).match(value[key]);
      if (!match) return
      context = {...context, ...match}
    }
    return context
  }
}

const combine = (pattern, action) => (value, next)=>{
  let match = pattern.match(value)
  return match && action(match) || next(value)
}

function buildPattern(rawPattern){
  if (typeof(rawPattern) ==='string'){
    return new ExactStringPattern(rawPattern)
  }
  if (rawPattern instanceof RegExp){
    return new RegexPattern(rawPattern)
  }
  if (rawPattern instanceof Object && rawPattern[variableSymbol]){
    return new VariablePattern(rawPattern)
  }
  if (rawPattern instanceof Object){
    return new ObjectPattern(rawPattern)
  }
}

function pairs(arr){
  return arr.reduce((acc, next, i)=> i%2 ==0 ? [...acc, [next]] : [...acc.slice(1), [...acc[acc.length-1], next]], [])
}

function noMatch(){throw 'no match'}

function createMatcher(exp){
  const patternFunctions = pairs(exp).map(([pattern,action])=> combine(buildPattern(pattern), action))
  return patternFunctions.reduceRight((acc,next)=> (value)=>next(value,acc), noMatch)
}

export default function match(match, ...exp){
  return createMatcher(exp)(match)
}