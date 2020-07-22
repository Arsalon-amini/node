//callback hell 
console.log('before'); 
getUser(1, (user) => {
    getRepositories(user.gitHubUsername, (repos) => {
        getCommits(repo, (commits) => {
        })
    }); 
});
console.log('after'); 

//Flat structure - name annonymous functions 
console.log('before'); 
getUser(1, getRepositories); //flattened
console.log('after'); 

//giving names to anonymous functions (callback args) 
function getRepositories(user){
    getRepositories(user.gitHubUsername, getCommits); 
}
function getCommits(repos){
    console.log(repo, displayCommits); 
}
function displayCommits(comits){
    console.log(commits); 
}

//callback function - called when result of operation is ready 
function getUser(id, callback){
    setTimeout(() => { 
        console.log('Reading a user from a database...'); 
        callback({id: id, gitHubUsername: 'arsalon-amini'}); //when result is ready, callback this 
    }, 2000); 
}

//asynch function (using callbacks)
function getRepositories(username, callback){
    setTimeout(() => {
        console.log('calling GITHUB API....'); 
        callback(['repo1', 'repo2', 'repo3']); //callback fn takes arg (array of strings) 
    }, 2000); 
}

//synchronous 
console.log("before"); 
const user = getUser(1); 
const repos = getRepositories(user.gitHubUsername); 
const commits = getCommits(repos[0]); 
console.log('After'); 



//sync function
function getRepositories(username){
    setTimeout(() => {
        console.log("calling github repository....")
        return ['repo1', 'repo2', 'repo3']; //cannnot return a value here (undefined until future), must use a callback function 
    }, 2000);
}




