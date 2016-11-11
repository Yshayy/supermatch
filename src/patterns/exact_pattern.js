export default class ExactPattern {
  constructor(pattern){
    this.pattern = pattern
  }
  match(value){
    return value == this.pattern
  }
}
