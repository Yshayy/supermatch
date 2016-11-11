export default class RegexPattern {
  constructor(pattern){
    this.pattern = pattern
  }
  match(value){
    return value.match(this.pattern)
  }
}