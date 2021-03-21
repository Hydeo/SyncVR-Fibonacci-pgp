
//This is not how it should be handled
const  REACT_APP_API_URL : string = process.env.PORT || "https://us-central1-syncvr-fibonacci-pgp.cloudfunctions.net/app/";

export function getAllFiboEntires() {
  return fetch(REACT_APP_API_URL)
    .then(data => {
    	return data.json()
    })
}