//simulate asych operation completing successfully (create a promise already resolved)


//already resolved promise
const p = Promise.resolve({id: 1}); //returns a promise that is already resolved
p.then(result => console.log(result)); 

//already rejected promise 
const pr = Promise.reject(new Error('reason for rejection'));
pr.catch(error => console.log(error));


//promises in parrellel (when both complete, kickoff an operation)
const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('async operation 1'); //simulate calling FB api
        resolve(1); 
    }, 2000)

});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('async operation 1'); //simulate calling IG api
        resolve(2); 
    }, 2000)

});

//kick off multiple promises (wait for all to complete before a next event)
Promise.all([p1, p2]) //returns a new promise after all promises in array are resolved
    .then(result => console.log(result)) //this operation begins when all promises are resolved 
    .catch(err => console.log(err.message)); 


//wait for first operation to complete (race)
Promise.race([p1, p2])
    .then(result => console.log(result)) //this operation begins when the first promise is resolved
    .catch(err => console.log(err.message)); 


//asynch and await approach - write async code like synchronous code (re-write promises cleaner)
async function displayCommits(){
    const user = await getUser(1); //calling a promous, can await, get result and store in user obj
    const repos = await getRepositories(user.gitHubUsername); //pass another promise, await it's result
    const commits = await getCommits(repos[0]); //returns a promise, await the result, store 
    console.log(commits); 
}

displayCommits(); 


//Promises 
function getUser(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => { 
            console.log('Reading a user from a database...'); 
            resolve({id: id, gitHubUsername: 'arsalon-amini'}); //when result is ready, callback this 
        }, 2000); 
    })
}

function getRepositories(username){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling GITHUB API....'); 
            resolve(['repo1', 'repo2', 'repo3']); //resolved promise's result (sent to client) is an array of repos 
        }, 2000); 
    })
}

function getCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling GITHUB API....'); 
            callback(['commit']); //callback fn takes arg (array of strings) 
        }, 2000); 
    })
}

