export default interface FiboPropsInterface {
  id: string;
  index:number;
  result:number;
  useMemoization:boolean;
  execTime:number;
  creationDate:{"_seconds" : number,"_nanoseconds":number}
}