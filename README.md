# SyncVR-Fibonacci-pgp 
This is an assignment done for SyncVR. 

Done the 21/03/2021

API Url : https://us-central1-syncvr-fibonacci-pgp.cloudfunctions.net/app/

Front Url : https://syncvr-fibonacci-pgp.web.app/index.js

## Requirements 
This exercice is based on the Fibonacci Sequence. The objectives are : 
- Provide a REST endpoint allowing to GET the N-th element in the sequence and save this query in a history. 
- Provide a REST endpoint allowing to get all previously queried Indexes of the sequence. 
- Build a Front-end consuming these endpoints. 
## Stack & Previous Knowledge 
- ***Firebase Functions*** for the backend, I used a ***TypeScript*** template coupled with ***EsLint***. 
-  ***React*** for the Front end, with ***Material-UI*** for the design and ***Recharts*** for the data visualisation all of this build with ***TypeScript***. 

I have previously worked with the Serverless architecture, mainly with the Lambda Functions from AWS for some small scale stateless work, I worked with Firebase but only for Auth.
Front wise, I used React and Material-UI in the past mostly pre-16.8 which means pre-hooks. This was a great opportunity to see how React evolved since then: less verbose, cool component state management.
I have to admit that it was the first time I did more than just read some TypeScript, it brings some much needed typing in the world of JS. Same for the Linter, first time using EsLint, very picky on it's default configuration but I already appreciate the consistency it brings.
As for Reacharts, it is just a visualisation tool.

The Fibonacci being a very well known problem the stack was where I could get a bit more personal. I chose to follow the tech suggestion when given (Firebase), go with some tech I have familiarities with (React) but could really use a refresh while at the same time throwing some unknows (TypeScript/EsLint) to really bring something back home.

## Design

### Fibonacci Algorithm
There are several ways to solve the Fibonacci problem, I went for the recursive approach. 

    function fibo(index){
	    if(index < 2)
		    return index;
		return fibo(index-1) + fibo(index-2);
    }

The main issue with this approach being the complexity skyrocketing as each recursive call create two of its own and keeps calculating the same values over and over as each recursive call will go through the same tree. 
A easy way to mitigate this issue is to use memoization, fancy term for a dictionary storing the already computed index of the sequence to reuse them when needed.

    let cache = {0:0,1:1}; //First two values given for simplicity
    function fibo(index){
	    if(index < 2)
		    return index;
		if(cache.hasOwnProperty(index)){
			return cache[index];
		}
		let res = fibo(index-1) + fibo(index-2);
		cache[index] = res;
		return res;
    }

This trick reduces the complexity by a great deal.
Another reason I went for this solution is that gives us two ways of generating the same value, thus comparison can be made.

### Architecture
![Diagram ](https://i.ibb.co/fnThCtc/Diagram.png)

The Firebase function expose two endpoints exposed at the API URL
(https://us-central1-syncvr-fibonacci-pgp.cloudfunctions.net/app/)

 - **GET** : returns all previously generated Fibonacci values. 
 ex: 
        
    	    {
	    	    "id": "3uFPVrPHw5pg4LZnRx0J",
	    	    "index": 5,
	    	    "result": 5,
	    	    "useMemoization": true,
	    	    "execTime": 0.008092000149190426,   
	    	    "creationDate": {
	    	        "_seconds": 1616362965,
	    	        "_nanoseconds": 658000000
		        },
	        }
    
 - **POST**: Compute Fibonacci result for given Index with or without memoization.

	    {
		    "index":12,
		    "memoization":false
		}

### Comments 

 - I liked using TypeScript, but it was great on the Firebase Function part, a bit less on the React part as the syntax really get messy.
 - The error handling could use some improvements, right now anything else that 200 is bad without much more thinking, or some debounce on the POST call.
 - The Chart is a bit weak. I misunderstood the format it needed and when for a "direct" approach as the time was running low. I like the visualization it offers, but it seems to be breaking easily, might be my "direct" approach or the too big gaps between min and max values (0.001 ~ 150).
