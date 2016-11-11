/* eslint-env node, jest */
import {match, capture as $} from '../src/api'

describe('match specs', function(){
  describe('matching a string', ()=>{
    it('should support fixed strings', ()=>{
      const result = match('abc', 
        'abc', ()=> true
      )
      expect(result).toBe(true)
    })
    it('should support regex', ()=>{
      const result = match('abc', 
        /ab/, ()=> true
      )
      expect(result).toBe(true)
    })
    it('should capture regex value', ()=>{
      const result = match('abc', 
        /ab/, (m)=> m
      )
      expect(result[0]).toBe('ab')
    })
  })
  describe('flow', function(){
    it('should fall between cases', ()=>{
      const result = match('abc', 
        'def', ()=> 0,
        /ab/, ()=> 1,
        'abc', ()=> 2
      )
      expect(result).toBe(1)
    })
    it('should throw when there is no match', ()=>{
      expect(()=>match('abc', 
        'def', ()=> 0
      )).toThrow('no match')
    })
  })
  describe('matching an object', ()=>{
    it('should match object structure', ()=>{
      const result = match({a: 'b'}, 
        {a: 'b'}, ()=> true
      )
      expect(result).toBe(true)
    })
    it('should match complex object structure', ()=>{
      const result = match({a: {c:'b'}}, 
        {a: {c:'b'}}, ()=> true
      )
      expect(result).toBe(true)
    })
    it('should able to capture variable', ()=>{
      const result = match({a: 'b'}, 
        {a: $.x}, ({x})=> x === 'b'
      )
      expect(result).toBe(true)
    })
    it('should able to capture multiple variable', ()=>{
      const result = match({x: 'a', y: 'b', z:{zz:'c'}}, 
        {
          x: $.x, 
          y: $.y, 
          z: {
            zz: $.zz
          }
        }, ({x, y, zz})=> x === 'a' && y === 'b' && zz === 'c'
      )
      expect(result).toBe(true)
    })
  })
})