function buildPattern(pattern){
  return (v)=>{
    if (typeof(pattern) ==='string'){
      return v === pattern
    }
  }
}

function createMatcher(exp){
  const patternFunctions = exp.map(([pattern, action])=>([buildPattern(pattern), action]))
  return (value)=>{
    for (let [fn, action] of patternFunctions){
      if (fn(value)){
        return action()
      }
    }
  }
}

export default function match(match, exp){
  console.log(match, exp);
  return createMatcher(exp)(match)
}