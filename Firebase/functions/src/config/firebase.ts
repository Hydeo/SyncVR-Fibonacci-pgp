import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

// We retrieve the config value set previously in the firebase project vars with 
// firebase functions:config:set
admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: functions.config().private.key.replace(/\\n/g, "\n"), // We replace the the Private key break line signs to evoid a "Invalid PEM format" error
    projectId: functions.config().project.id,
    clientEmail: functions.config().client.email,
  }),
  databaseURL: "https://syncvr-fibonacci-pgp-default-rtdb.europe-west1.firebasedatabase.app/",
});


const db = admin.firestore();
functions.logger.log("DB Initialized");
export {admin, db};
