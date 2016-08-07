function buildPattern(pattern){
  return (v)=>{
    if (typeof(pattern) ==='string'){
      return v === pattern
    }
    if (pattern instanceof RegExp){
      return v.match(pattern)
    }
  }
}

function pairs(arr){
  return arr.reduce((acc, next, i)=> i%2 ==0 ? [...acc, [next]] : [...acc.slice(1), [...acc[acc.length-1], next]], [])
}

function createMatcher(exp){
  const patternFunctions = pairs(exp).map(([pattern, action])=>([buildPattern(pattern), action]))
  return (value)=>{
    for (let [fn, action] of patternFunctions){
      let result = fn(value)
      if (result) return action(result)
    }
  }
}

export default function match(match, exp){
  return createMatcher(exp)(match)
}