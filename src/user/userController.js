var userService = require('./userServices');

var createUserControllerFunc = async (req, res) =>  {
    try {
    console.log(req.body);
    var status = await userService.createUserDBService(req.body);
    console.log(status);

    if (status) {
        res.send({ "status": true, "message": "Usuario creado" });
    } else {
        res.send({ "status": false, "message": "Error creando usuario" });
    }
    }
    catch(err) {
        console.log(err);
    }
}
var readUserControllerFunc = async (req, res) => {
    try {
        result = await userService.readUserDBService();
        if (result.status) {
            res.send({"status": true, "message": result.msg});
        }
        else {
            res.send({"status": false, "message": result.msg});
        }
    }
    catch(error) {
        res.send({"status": false, "message": error.msg})
    }
}

var listUserControllerFunc = async (req, res) => {
    try {
        result = await userService.listUserDBService();
        if (result.status) {
            res.send({"status": true, "message": result.msg});
        }
        else {
            res.send({"status": false, "message": result.msg});
        }
    }
    catch (error) {
        res.send({"status": false, "message": error.msg})
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var searchUserControllerFunc = async (req, res) => {
    var result = null;

    try {
        result = await userService.searchUserDBService(req.param("email"));
        if(result.status) {
            res.send({"status": true, "message": result.msg});
        }
        else {
            res.send({"status": false, "message": result.msg});
        }
    }
    catch (error){
        console.log(error);
        res.send({"status": false, "message": error.msg})
    }
}

var updateUserControllerFunc = async (req,res) => {
    var result = null;

    try {
        result = await userService.updateUSerDBService(req.query.email, req.body);
        if(result.status) {
            res.send({"status": true, "message": result.msg});
        }
        else {
            res.send({"status": false, "message": result.msg})
        }
    }
    catch (error){
        console.log(error);
        res.send({"status": false, "message": error.msg});
    }
}

var deleteUserControllerFunc = async (req, res) => {
    var result = null;

    try {
        result = await userService.deleteUserDBService(req.query.email);
        if(result.status) {
            res.send({"status": true, "message": result.msg});
        }
        else {
            res.send({"status": false, "message": result.msg});
        }
    }
    catch (error) {
        console.log(error);
        res.send({"status": false, "message": error.msg});
    }
}

module.exports = { createUserControllerFunc, readUserControllerFunc, listUserControllerFunc, loginUserControllerFunc, searchUserControllerFunc,updateUserControllerFunc, deleteUserControllerFunc };