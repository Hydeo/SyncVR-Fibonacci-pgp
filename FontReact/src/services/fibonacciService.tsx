
//This is not how it should be handled
const  REACT_APP_API_URL : string = process.env.PORT || "https://us-central1-syncvr-fibonacci-pgp.cloudfunctions.net/app/";

export function getAllFiboEntries() {
  return fetch(REACT_APP_API_URL)
    .then(data => {
    	return data.json()
    })
}

export function postFiboEntry(item) {
	return fetch(REACT_APP_API_URL, {
	   method: 'POST',
	   headers: {
	     'Content-Type': 'application/json'
	   },
	   body: JSON.stringify(item)
	 })
   	.then((data) => {return data.json()})
   	.catch((error) => {return error.json()})
}