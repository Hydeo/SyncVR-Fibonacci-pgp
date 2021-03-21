/* I tried to follow as much as the TS philosophy for react, but the syntax can be really hard to get, 
This props interface worked, don't think it was the best aproach though*/
export default interface FiboPropsInterface {
  id: string;
  index:number;
  result:number;
  useMemoization:boolean;
  execTime:number;
  creationDate:{"_seconds" : number,"_nanoseconds":number}
}