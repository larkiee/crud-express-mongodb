function checkAdminAndUserPrivilege(req, res, next){
    const userID = req.user._id.toString()
    const isUserAdmin = req.user.isAdmin

    const protectedRouteUserID = req.params["id"]
    console.log({userID, isUserAdmin, protectedRouteUserID});
    if(isUserAdmin || protectedRouteUserID === userID){
        next()
        return
    }
    res.status(401)
    res.send({
        success: false,
        message: "you don't access to this resource"
    })
}

function checkAdminPrivilege(req, res, next){
    const isUserAdmin = req?.user?.isAdmin
    if(isUserAdmin){
        next()
        return
    }
    res.status(401)
    res.send({
        success: false,
        message: "you don't have perivilege for this resource"
    })
}

function errorHandler(err, req, res, next){
    console.log({
        err
    });
    res.status(500)
    res.send({
        success: false,
        message: "sorry, something unexpected happened"
    })
}

export default {
    checkAdminAndUserPrivilege,
    checkAdminPrivilege,
    errorHandler
}