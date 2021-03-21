import {Response} from "express";
import {db} from "./config/firebase";
import * as functions from "firebase-functions";
import {Fibonacci} from "./fibonacci";

type FiboEntry = {
  index : number,
  memoization : boolean
}

type Request = {
  body : FiboEntry,
  params : { fiboId : string }
}

const addFiboEntry = async (req : Request, res : Response) => {
  const {index, memoization} = req.body;
  try {

    //TODO : Add Tests 

    let f = new Fibonacci(index,memoization);


    const entry = db.collection("fiboEntries").doc();
    const entryObject = {
      id: entry.id,
      ...f
    };

    entry.set(entryObject);

    res.status(200).send({
      status: "sucess",
      message: "Entry add ok",
      data: entryObject,
    });
  } catch (error) {
    functions.logger.log(error);
    res.status(500).json(error.message);
  }
};

export {addFiboEntry};
