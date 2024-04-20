import FiniteInteger from "./FiniteInteger";
import FiniteSet     from './FiniteSet';

class FiniteSpace {
    constructor(set = new FiniteSet(), structure = {}) {
        this.set = set;
        this.structure = structure;
    }

    // Note: how do these generate the distinct spaces and not all spaces?
    static generateDistinctTopologicalSpaces(baseSet) {
        return baseSet.powerset.powerset.filter((candidateSet) => {
            const candidateSpace = new FiniteSpace(baseSet, candidateSet);
            return candidateSpace.isTopological;
        });
    }

    static generateDistinctTopologicalSpacesOnNPoints(n) {
        const baseSet = new FiniteSet(FiniteInteger.closedInterval(1, n));
        const distinctTopologies 
            = FiniteSpace.generateDistinctTopologicalSpaces(baseSet);
        return distinctTopologies.toArray;
    }

    get isKolmogorov() {
        return this.set.combinations.every(([point1, point2]) => {
            return this.pointsAreDistinguishable(point1, point2);
        });
    }

    get isSymmetric() {
        return this.set.combinations.every(([point1, point2]) => {
            return this.pointsAreDistinguishable(point1, point2)
                ? this.pointsAreSeparated(point1, point2)
                : true;
        });
    }

    get isFrechet() {
        return this.isKolmogorov && this.isSymmetric;
    }

    get isSystem() {
        return this.structure instanceof FiniteSet 
            && this.structure.every((element) => element.isSubset(this.set));
    }

    get isClosedUnderUnion() {
        if (!this.isSystem) return false;
        const structureArray = this.structure.toArray;
        for (let subsetA of structureArray) {
            for (let subsetB of structureArray) {
                if (!this.structure.contains(subsetA.union(subsetB))) {
                    return false;
                }
            }
        }
        return true;
    }

    get isClosedUnderIntersection() {
        if (!this.isSystem) return false;
        const structureArray = this.structure.toArray;
        for (let subsetA of structureArray) {
            for (let subsetB of structureArray) {
                if (!this.structure.contains(subsetA.intersect(subsetB))) {
                    return false;
                }
            }
        }
        return true;
    }

    get isLambdaSystem() {
        return this.isClosedUnderUnion && this.structure.contains(this.set);
    }

    get isPiSystem() {
        return this.isClosedUnderIntersection && this.structure.size !== 0;
    }

    get isTopological() {
        return this.isLambdaSystem 
            && this.isPiSystem 
            && this.structure.contains(FiniteSet.empty);
    }

    neighborhoods(point) {
        return this.structure.filter((openSet) => openSet.has(point));
    }

    closure(point) {
        return this.neighborhoods(point).reduce((set1, set2) => {
            return set1.filter((set1) => set2.has(set1));
        });
    }

    pointsAreDistinguishable(point1, point2) {
        return !this.neighborhoods(point1).equals(this.neighborhoods(point2));
    }

    pointsAreSeparated(point1, point2) {
        return (
            !this.closure(point1).has(point2) &&
            !this.closure(point2).has(point1)
        );
    }
}

export default FiniteSpace;