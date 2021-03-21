
/*Typescript is a bit picky on the fact that the env var could be empty. This is not a viable solution, the env 
variable is basically not pulling correctly right now*/
const  REACT_APP_API_URL : string = process.env.PORT || "https://us-central1-syncvr-fibonacci-pgp.cloudfunctions.net/app/";

//We get all the fibonacci entries we have
export function getAllFiboEntries() {
  return fetch(REACT_APP_API_URL)
    .then(data => {
    	return data.json()
    })
}

//We insert a new fibonacci entry
export function postFiboEntry(item) {
	return fetch(REACT_APP_API_URL, {
	   method: 'POST',
	   headers: {
	     'Content-Type': 'application/json'
	   },
	   body: JSON.stringify(item)
	 })
   	.then((data) => {
      // Error handling could use some work, now it either we get a 200 and it works  
      // or it not and we say that we wouldn't compute
   		if(data.status != 200){
   			throw new Error ();
   		}
   		return data.json()
   	})
   	.catch((error) => {return error})
}