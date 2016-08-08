/* eslint-env node, mocha */
import {expect} from 'chai'
import match from '../src/match'

describe('match specs', function(){
  describe('matching a string', ()=>{
    it('should support fixed strings', ()=>{
      const result = match('abc', 
        'abc', ()=> true
      )
      expect(result).to.be.eql(true)
    })
    it('should support regex', ()=>{
      const result = match('abc', 
        /ab/, ()=> true
      )
      expect(result).to.be.eql(true)
    })
    it('should capture regex value', ()=>{
      const result = match('abc', [
        /ab/, (m)=> m
      ])
      expect(result[0]).to.be.eql('ab')
    })
  })
  describe('flow', function(){
    it('should fall between cases', ()=>{
      const result = match('abc', 
        'def', ()=> 0,
        /ab/, ()=> 1,
        'abc', ()=> 2
      )
      expect(result).to.be.eql(1)
    })
    it('should throw when there is no match', ()=>{
      expect(()=>match('abc', 
        'def', ()=> 0
      )).to.throw('no match')
    })
  })
  describe('matching an object', ()=>{
    it('should capture regex value', ()=>{
      const result = match({'a': 'b'}, 
        {'a': 'b'}, ()=> true
      )
      expect(result).to.be.eql(true)
    })
  })
})