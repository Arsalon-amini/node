const p = new Promise((resolve, reject) => {
    //kick off async work... (call web service, access db)
    setTimeout(() => {
        resolve(1); //result of asynch operation - resolve to send result to consumer of promise obj
        //reject(new Error('error message')); //result of asynch is failure 
    }, 2000); 
});

p
.then(result => console.log('Result', result)) //consume promise (.then to get result of async from promise)
.catch(err => console.log('Error', err.message)); 
