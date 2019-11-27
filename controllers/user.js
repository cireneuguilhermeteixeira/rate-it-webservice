const User = require('../models/user')
const handleError = require('../utils/handler-error');
const handleSuccess = require('../utils/handler-success');
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
//const authConfig = require('../config/auth');

exports.currentUser = function(req,resp){
    User.findOne()
    .select('-password')
    .select('-__v')
    .where('_id').equals(req.userId)
    .exec((error,response) => {
    if(error){resp.status(401).send({error:'Erro inesperado'});}
    return resp.status(200).send({user:response});
    });
}

exports.findAll = function(req, resp) {
     User.find()
     .select('-password')
     .select('-__v')
     .exec((error,users) => {
         if (error) return handleError(resp,error);
         return handleSuccess(resp,users);
     })
    //resp.json([])
}

exports.findById = function(req,resp) {
    User.findOne()
    .where("_id").equals(req.params.id)
    .select('-password')
    .select('-__v')
    .exec((error,response) => {
        if (error) return handleError(resp,error);
        return handleSuccess(resp,response);
    })
}

exports.update = function(req,resp){
    User.find({enrollment : req.body.enrollment}, (error,userFound)=>{
        if(error) return req.statu(401).send({erro:'Erro ao tentar alterar usuário'});
        if(userFound.length > 0) return handleError(resp,{errors : { enrollment : 'Path enrolment should be unique' }, message : 'Já existe um usuário com essa matrícula'}) 
        User.update({_id : req.body.id}, req.body , (error,userUpdated)=>{
            if (error) return handleError(resp,error);
            const msg = 'Usuário atualizado com sucesso';
            return handleSuccess(resp,userUpdated,msg);
        }); 
    });     
};


exports.delete = function(req,resp){
    User.remove()
    .where("_id").equals(req.params.id)
    .exec((error,response) => {
        if (error) return handleError(resp,error);
        return handleSuccess(resp,response,'Usuário deletado com sucesso');
    })
};

