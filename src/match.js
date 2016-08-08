function buildPattern([pattern, action]){
  return (v, next)=>{
    if (typeof(pattern) ==='string' && v === pattern){
      return action(v)
    }
    if (pattern instanceof RegExp){
      const regexMatch =v.match(pattern)
      console.log(regexMatch);
      if (regexMatch) return action(regexMatch)
    }
    if (pattern instanceof Object){
      if (Object.keys(pattern).every(k=> pattern[k] === v[k])){
        return action()
      }
    }
    next(v)
  }
}

function pairs(arr){
  return arr.reduce((acc, next, i)=> i%2 ==0 ? [...acc, [next]] : [...acc.slice(1), [...acc[acc.length-1], next]], [])
}

function createMatcher(exp){
  const patternFunctions = pairs(exp).map(buildPattern)
  return patternFunctions.reduceRight((acc,next)=> (value)=>next(value,acc), ()=>{throw 'no match'})
}

export default function match(match, ...exp){
  return createMatcher(exp)(match)
}