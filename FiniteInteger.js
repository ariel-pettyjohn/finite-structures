class FiniteInteger {
    static closedInterval (_minimum, _maximum = 0) {        
        if (_maximum === _minimum) return [_minimum]; // degenerate interval

        const isReversed = _minimum > _maximum;
        
        const minimum    = isReversed ? _maximum : _minimum;
        const maximum    = isReversed ? _minimum : _maximum;
        
        const difference = maximum - minimum
        
        const length     = difference <= 0 ? difference - 1 : difference + 1;
        const array      = [...Array(length).keys()];
        
        const offsetInteger 
            = (integer) => integer + Math.sign(difference) * minimum;
        
        return minimum === 0 
            ? array 
            : array.map(offsetInteger);
    }

    // Inclusive
    static random (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default FiniteInteger;