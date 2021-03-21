import {Response} from "express";
import {db} from "./config/firebase";
import * as functions from "firebase-functions";
import {Fibonacci} from "./fibonacci";

type FiboParams = {
  index : number,
  memoization : boolean
}

type Request = {
  body : FiboParams,
  params : { fiboId : string }
}

const addFiboEntry = async (req : Request, res : Response) => {
  const {index, memoization} = req.body;
  try {
    // We check the body parameters are valid. The boolean should be checked in
    // higher level by typescript type enforcement.
    if (!Number.isInteger(index) || index < 0) {
      throw new Error("Please provide a valid index");
    }

    // We compute the fibonacci sequence for the given parameters
    const f = new Fibonacci(index, memoization);

    // Get an id for the new entry
    const entry = db.collection("fiboEntries").doc();
    // We create the object we want to store
    const entryObject = {
      id: entry.id,
      index: f.getIndex(),
      result: f.getResult(),
      useMemoization: f.isUsingMemoization(),
      execTime: f.getExecTime(),
      creationDate: f.getCreationDate(),
    };
    // We store it
    entry.set(entryObject);

    // We enjoy it
    res.status(200).send({
      status: "sucess",
      data: entryObject,
    });
  } catch (error) {
    // We enjoy it less
    functions.logger.log(error);
    res.status(500).json(error.message);
  }
};

const getAllFiboEntries = async (req: Request, res: Response) =>{
  try {
    const allFiboEntries : Fibonacci[] = [];
    const query = await db.collection("fiboEntries").get();
    query.forEach((doc:any)=>{
      functions.logger.log(doc.data());
      allFiboEntries.push(doc.data());

    });
    return res.status(200).json(allFiboEntries);
  } catch (error) {
    functions.logger.log(error);
    return res.status(500).json(error.message);
  }
};


export {addFiboEntry, getAllFiboEntries};
