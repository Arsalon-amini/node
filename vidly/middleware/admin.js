module.exports = function(req, res, next) {
    //auth middleware sets req.user (can acess here)
    if(!req.user.isAdmin) return res.status(403).send('Access denied'); //forbidden
    next(); 
}




  
    