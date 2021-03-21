import * as functions from "firebase-functions";
import * as express from "express";
import {addFiboEntry, getAllFiboEntries} from "./fiboController";
const cors = require("cors");

const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

app.post("/", addFiboEntry);
app.get("/", getAllFiboEntries);

exports.app = functions.https.onRequest(app);
