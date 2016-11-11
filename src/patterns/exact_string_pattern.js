export default class ExactStringPattern {
  constructor(pattern){
    this.pattern = pattern
  }
  match(value){
    return value == this.pattern
  }
}
