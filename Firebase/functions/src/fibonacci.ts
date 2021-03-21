import { performance } from "perf_hooks";

class Fibonacci {
  
  private index : number;
  private result : number;
  private useMemoization : boolean;
  private execTime : number;
  private creationDate: Date;
  private memoizationArray : number[];

  constructor(index:number, useMemoization: boolean) {

  	//TODO : Check if number is float
    this.index = index;
    this.useMemoization = useMemoization;
    this.memoizationArray = [];
    this.creationDate = new Date();
    const t0 = performance.now();
    this.result = this.compute(this.index);
    const t1 = performance.now();
    this.execTime = t1 - t0;

  }

  getIndex():number{
  	return this.index;
  }
  getResult():number{
  	return this.result;
  }
  isUsingMemoization():boolean{
  	return this.useMemoization;
  }
  getExecTime():number{
  	return this.execTime;
  }
  getCreationDate():Date{
  	return this.creationDate;
  }

  compute(index:number) : number{

  	if(index < 2){
  		return index;
  	}

  	/*If we are using memoization and have already computed the current 
  	index, we return it to avoid unecessary calculations */
  	if(this.useMemoization && this.memoizationArray.includes(index)){
  		return this.memoizationArray[index];
  	}

  	return this.compute(index-1) + this.compute(index-2);
  }
}

export {Fibonacci};