import {performance} from "perf_hooks";

/**
 * A class to compute the Fibonacci sequence with two different options :
 * With or without Memoization
 */
class Fibonacci {
  private index : number;
  private result : number;
  private useMemoization : boolean;
  private execTime : number;
  private creationDate: Date;
  private memoizationArray : {[key: number] : number};


  /**
  * Computes the sequence with the parameters.
  * @param {number} index N-th item of the sequence.
  * @param {boolean} useMemoization Use of memoization technique.
  */
  constructor(index:number, useMemoization: boolean) {
    // TODO : Check if number is float
    this.index = index;
    this.useMemoization = useMemoization;
    this.memoizationArray = {0: 0, 1: 1};
    this.creationDate = new Date();
    const t0 = performance.now();
    this.result = this.compute(this.index);
    const t1 = performance.now();
    this.execTime = t1 - t0;
  }


  /**
  * Get index
  * @return {number}
  */
  getIndex():number {
    return this.index;
  }
  /**
  * Get Result
  * @return {number}
  */
  getResult():number {
    return this.result;
  }
  /**
  * Get if we are using memoization
  * @return {boolean}
  */
  isUsingMemoization():boolean {
    return this.useMemoization;
  }
  /**
  * Get compute time for the given params
  * @return {number}
  */
  getExecTime():number {
    return this.execTime;
  }
  /**
  * Get date of computation
  * @return {Date}
  */
  getCreationDate():Date {
    return this.creationDate;
  }

  /**
  * Computes the sequence from the N-th
  * @param {number} index on the sequence.
  * @return {number} Result for the Nt-th index
  */
  compute(index:number) : number {
    if (index < 2) {
      return index;
    }
    /* If we are using memoization and have already computed the current
    index, we return it to avoid unecessary calculations */
    if (this.useMemoization &&
        Object.prototype.hasOwnProperty.call(this.memoizationArray, index)) {
      return this.memoizationArray[index];
    }

    const res = this.compute(index-1) + this.compute(index-2);
    if (this.useMemoization) {
      this.memoizationArray[index] = res;
      return this.memoizationArray[index];
    }
    return res;
  }
}

export {Fibonacci};
