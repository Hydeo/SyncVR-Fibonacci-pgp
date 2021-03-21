import * as functions from "firebase-functions";
import * as express from "express";
import {addFiboEntry, getAllFiboEntries} from "./fiboController";

const app = express();

app.post("/", addFiboEntry);
app.get("/", getAllFiboEntries);

exports.app = functions.https.onRequest(app);
