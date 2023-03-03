var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {

   return new Promise(function myFn(resolve, reject) {
       var userModelData = new userModel();

       userModelData.firstname = userDetails.firstname;
       userModelData.lastname = userDetails.lastname;
       userModelData.email = userDetails.email;
       userModelData.password = userDetails.password;
       var encrypted = encryptor.encrypt(userDetails.password);
       userModelData.password = encrypted;

       userModelData.save(function resultHandle(error, result) {

           if (error) {
               reject(false);
           } else {
               resolve(true);
           }
       });
   });
}

module.exports.readUserDBService = (keyword) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({email: keyword}, function getresult(errorvalue, result){
         if(errorvalue) {
            reject({status: false, msg: "Error"});
         }
         else {
            if(result != null && result.email.keyword) {
               resolve({status: true, msg: result});
            }
         }
         reject({status: false, msg: "Error"})
      })
   })
}

module.exports.listUserDBService = () => {
   return new Promise(function (resolve, reject) {
      userModel.find({}, (errorvalue, result) => {
         if (errorvalue) {
            reject({status: false, msg: "Error"})
         }
         resolve({status: true, msg: result})
      })
   })
} 


module.exports.loginuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               var decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  reject({status: false,msg: "Falla en validacion de usuario"});
               }
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}

module.exports.searchUserDBService = (keyword)=> {
   return new Promise(function myFn(resolve, reject){
      userModel.findOne({email: keyword}, function getResult(errorvalue, result){
         if(errorvalue) {
            reject({status: false, msg: "Datos erróneos o usuario no existente"});
         }
         else{
            if(result !== null && result.email===keyword){
               resolve({status: true, msg: result})
            }
            reject({status: false, msg: "Usuario no existente"})
         }
      })
   })
}

module.exports.updateUSerDBService = (keyword, userDetails) => {
   return new Promise(function myFn(resolve, reject){
      userModel.findOneAndUpdate({email: keyword}, userDetails, function getResult(errorvalue, result){
         if(errorvalue) {
            reject({status: false, msg: "usuario no encontrado"}); 
         }
         else{
            if(result !== null && result.email===keyword){
               resolve({status: true, msg: result})
            }
            reject({status: false, msg: "Error"})
         }
      })
   })
}

module.exports.deleteUserDBService = (keyword) => {
   return new Promise(function myFn(resolve, reject){
      userModel.findOneAndDelete({email: keyword}, function getResult(errorvalue, result){
         if(errorvalue) {
            reject({status: false, msg: "Error"});
         }
         else{
            if(result !== null && result.email===keyword){
               resolve({status: true, msg: result})
            }
            reject({status: false, msg: "Error"})
         }
      })
   })
}