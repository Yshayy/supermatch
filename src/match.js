import buildPattern from './patterns/build_pattern'

const combine = (pattern, action) => (value, next)=>{
  let match = pattern.match(value)
  return match && action(match) || next(value)
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