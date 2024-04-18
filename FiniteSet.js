class FiniteSet extends Set {
    static get empty() {
        return new FiniteSet([]);
    };

    get toArray() {
        return Array.from(this);
    }

    get powerset() {
        const powerset = [[]];
        this.forEach(function (element) {
            const currentLength = powerset.length;
            for (let i = 0; i < currentLength; i++) {
                powerset.push([...powerset[i], element]);
            }
        });
        return new FiniteSet(powerset.map((openSet) => new FiniteSet(openSet)));
    }

    get combinations() {
        const source = [...this];
        const combinations = new FiniteSet(source.flatMap((x, index) => {
            return source.slice(index + 1).map(y => new FiniteSet([x, y]));
        }));
        return combinations;
    }

    isSubset(superset) {
        return [...this].every(element => superset.has(element));
    }

    isSuperset(subset) {
        return subset.isSubset(this);
    }

    difference(set) {
        return new FiniteSet([...this].filter(x => !set.has(x)));
    }

    equals(finiteSet) {
        if (this.size !== finiteSet.size) return false;
        return this.isSubset(finiteSet);
    }

    contains(element) {
        const equals = (set1, set2) => {
            if (
                (!(set1 instanceof FiniteSet) && (set2 instanceof FiniteSet))
                || ((set1 instanceof FiniteSet) && !(set2 instanceof FiniteSet))
            ) {
                return false;
            } else if (
                !(set1 instanceof FiniteSet) && !(set2 instanceof FiniteSet)
            ) {
                return set1 === set2;
            }
            return set1.size === set2.size && [...set1].every(e => set2.has(e));
        };
        return this.toArray.some(item => equals(item, element));
    }

    every(...args) {
        return this.toArray.every(...args);
    }

    some(...args) {
        return this.toArray.some(...args);
    }

    filter(...args) {
        return new FiniteSet(this.toArray.filter(...args));
    }

    flat(depth = 1) {
        const _flat = (space, depth = 1) => {
            return (
                depth > 0
                    ? space.toArray.reduce((elements, element) => {
                        return elements.concat(
                            element instanceof FiniteSet
                                ? _flat(element, depth - 1)
                                : element
                        )
                    }, [])
                    : space.toArray.slice()
            );
        }
        return new FiniteSet(_flat(this, depth));
    }

    flatMap(callback) {
        return this.reduce((acc, x) => acc.concat(callback(x)), []);
    }

    forEach(...args) {
        this.toArray.forEach(...args);
    }

    map(...args) {
        return this.toArray.map(...args);
    }

    reduce(...args) {
        return this.toArray.reduce(...args);
    }

    slice(...args) {
        return this.toArray.slice(...args);
    }

    intersect(space) {
        return this.filter((subset) => space.has(subset));
    }

    union(space) {
        return new FiniteSet([...this, ...space]);
    }
}

export default FiniteSet;