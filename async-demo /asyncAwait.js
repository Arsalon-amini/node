//asynch and await approach - write async code like synchronous code (re-write promises cleaner)
async function displayCommits(){
    const user = await getUser(1); //calling a promous, can await, get result and store in user obj
    const repos = await getRepositories(user.gitHubUsername); //pass another promise, await it's result
    const commits = await getCommits(repos[0]); //returns a promise, await the result, store 
    console.log(commits); 
}

displayCommits(); 