const lib = require('./fizzBuzz'); 

describe('fizzBuzz', ()=>{
    it('should throw an error if input is falsy', () => {
        const args = [null, undefined, NaN, '', 0, false, {}];
        args.forEach( a => { expect(() => {lib.fizzBuzz(null)}).toThrow();
        })
    });
    
    it('should return FizzBuzz if divisible by 3 and 5', ()=>{
        const result = lib.fizzBuzz(15); 
        expect(result).toEqual('FizzBuzz');
    });

    it('should return Fizz if divisible by 3 ', ()=>{
        const result = lib.fizzBuzz(9); 
        expect(result).toEqual('Fizz');
    });

    it('should return Buzz if divisible by 5 ', ()=>{
        const result = lib.fizzBuzz(10); 
        expect(result).toEqual('Buzz');
    })

    it('should return the number if its not divisible by 3 or 5', ()=>{
        const result = lib.fizzBuzz(1); 
        expect(result).toBe(1);
    })
}); 




