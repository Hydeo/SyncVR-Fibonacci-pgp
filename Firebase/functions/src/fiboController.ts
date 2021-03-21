import {Response} from "express";
import {db} from "./config/firebase";
import * as functions from "firebase-functions";

type FiboEntry = {
  type : string,
  result : number,
  execTime : number
}

type Request = {
  body : FiboEntry,
  params : { fiboId : string }
}

const addFiboEntry = async (req : Request, res : Response) => {
  const {type, result, execTime} = req.body;
  try {
    const entry = db.collection("fiboEntries").doc();
    const entryObject = {
      id: entry.id,
      type,
      result,
      execTime,
      creationDate: new Date(),
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
