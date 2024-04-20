class FiniteInteger {
    /*
    static openInterval (infinum, supremum = 1) {
        if (supremum === 1) {
            return
        }
    }
    */

    static closedInterval (_minimum, _maximum = 0) {    
        const isDegenerate = _maximum === _minimum;
        if (isDegenerate) return [_minimum];
        
        const areArgumentsEmpty = arguments[0] === undefined;
        const isConcise         = arguments[1] === undefined;
        
        const isReversed = _minimum > _maximum;
        const isEmpty    = areArgumentsEmpty || !isConcise && isReversed;
        if (isEmpty) return [];        
        
        const minimum = isConcise ? _maximum : _minimum;
        const maximum = isConcise ? _minimum : _maximum;
        
        const difference = maximum - minimum;        
        const length     = difference <= 0 ? difference - 1 : difference + 1;
        const array      = [...Array(length).keys()];

        const offsetInteger 
            = (integer) => integer + Math.sign(difference) * minimum;
        
        return minimum === 0 ? array : array.map(offsetInteger);
    }

    // Inclusive
    static random (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

console.log(FiniteInteger.closedInterval(1))

//export default FiniteInteger;