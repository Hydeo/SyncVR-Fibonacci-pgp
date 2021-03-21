import * as functions from "firebase-functions";
import * as express from "express";
import {addFiboEntry} from "./fiboController";

const app = express();

app.post("/fiboEntries", addFiboEntry);
app.get("/", (req, res) => res.status(200).send("Express test"));

exports.app = functions.https.onRequest(app);
