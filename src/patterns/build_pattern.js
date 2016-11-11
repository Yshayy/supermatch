import ExactPattern from './exact_pattern'
import ObjectPattern from './object_pattern'
import RegexPattern from './regex_pattern'
import VariablePattern from './variable_pattern'
import {variableSymbol} from '../capture' 

export default function buildPattern(rawPattern){
  if (typeof(rawPattern) ==='string' || typeof(rawPattern) === 'number'){
    return new ExactPattern(rawPattern)
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