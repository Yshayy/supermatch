/* eslint-env node, mocha */
import {expect} from 'chai'
import match from '../src/match'

describe('match specs', function(){
  describe('matching a string', ()=>{
    it('should support fixed strings', ()=>{
      const result = match('abc', [
        'abc', ()=> true
      ])
      expect(result).to.be.eql(true)
    })
    it('should support regex', ()=>{
      const result = match('abc', [
        /ab/, ()=> true
      ])
      expect(result).to.be.eql(true)
    })
    it('should capture regex value', ()=>{
      const result = match('abc', [
        /ab/, (m)=> m
      ])
      expect(result[0]).to.be.eql('ab')
    })
  })
})