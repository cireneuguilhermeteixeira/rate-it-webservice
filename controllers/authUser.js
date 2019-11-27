const User = require('../models/user')
const handleError = require('../utils/handler-error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');


function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 86400
    });
}



exports.save = function(req,resp) {
    const user = req.body
    User.find({enrollment : user.enrollment}, (error,userFound)=>{
        if(userFound.length > 0) return handleError(resp,{errors : { enrollment : 'Path enrolment should be unique' }, message : 'já existe um usuário com essa matrícula'}) 
        bcrypt.hash(user.password,10,(error,hash)=>{
            if (error) return handleError(resp,error);
            user.password = hash
            User.create( user,(error, userSaved ) => {
                if (error) return handleError(resp,error);
                userSaved.password = null
                return resp.send({
                    userSaved,
                    token: generateToken({id:userSaved.id}),
                    message:'usuario cadastrado com sucesso'
                });
            });
        })
    });
}

exports.authentication = function(req,resp){
    const {enrollment , password } = req.body;
    User.findOne()
    .where("enrollment").equals(enrollment)
    .select('-__v')
    .exec((error,user) => {
        if (error) return handleError(resp,error);
        if(!user){return resp.status(400).send({erro:'Usuario nao encontrado'});}
        bcrypt.compare(password,user.password,function(err, result){
            if (err) { throw (err);}
            user.password = undefined;
            if(!result){return resp.status(400).send({erro:'Senha invalida'});}
            
            return resp.send({
                    user,
                    token: generateToken({id:user.id})
            });
        });       
    });
}

exports.forgotPassword = function(req, resp){
    //ToDo
}
