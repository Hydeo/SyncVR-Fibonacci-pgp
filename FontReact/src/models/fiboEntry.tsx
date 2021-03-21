export default interface FiboEntryInterface {
  id: string;
  index:number;
  result:number;
  useMemoization:boolean;
  execTime:number;
}