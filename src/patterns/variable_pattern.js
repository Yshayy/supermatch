import {variableSymbol} from '../capture'

export default class VariablePattern {
  constructor(pattern){
    this.pattern = pattern
  }
  match(value){
    return {[this.pattern[variableSymbol]]: value}
  }
}