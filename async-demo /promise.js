//creating a promise
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1); //result of asynch operation - resolve to send result to consumer of promise obj
        reject(new Error('error message')); //result of asynch is failure 
    }, 2000); 
});

 //consuming promises
p
    .then(result => console.log('Result', result)) //consume promise (.then to get result of async from promise)
    .catch(err => console.log('Error', err.message));

getUser(1)
    .then(user => getRepositories(user.gitHubUsername)) //getUser - returns a user object, calling getRepo wraps in another promise 
    .then(repos => getCommits(repos[0])) //chain on second promise returned from getRepo function (resolves promise with array) 
    .then(commits => console.log('Commits', commits)); //third promise, eventually resolves commits for a repository



//promises (replaced callbacks) asynch functions
function getUser(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => { 
            console.log('Reading a user from a database...'); 
            resolve({id: id, gitHubUsername: 'arsalon-amini'}); //when result is ready, result sent to client
        }, 2000); 
    }) 
}

function getRepositories(username){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling GITHUB API....'); 
            resolve(['repo1', 'repo2', 'repo3']); //when result is ready, result sent to client
        }, 2000); 
    })
}


function getCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling GITHUB API....'); 
            resolve(['commit']); //when result is ready, result sent to client
        }, 2000); 
    })
}

