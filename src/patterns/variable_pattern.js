import {variableSymbol} from '../capture'

export default class VariablePattern {
  constructor(pattern){
    this.pattern = pattern
    this.isWildCard = this.pattern[variableSymbol] === '_' 
  }
  match(value){
    if (this.isWildCard) return {}
    return {[this.pattern[variableSymbol]]: value}
  }
}