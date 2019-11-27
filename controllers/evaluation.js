const Evaluation = require('../models/evaluation')
const handleError = require('../utils/handler-error');
const handleSuccess = require('../utils/handler-success');
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
//const authConfig = require('../config/auth');


exports.newEvaluation = function(req, resp){
    Evaluation.find({user : req.userId, movieId: req.body.movieId}, (error,evaluation)=>{
        if(evaluation.length > 0) return handleError(resp,{errors : { message : 'Você já favoritou esse filme.' }}) 
        Evaluation.create( req.body,(error, evaluation ) => {
            if (error) return handleError(resp,error);
            return resp.send({
                evaluation,
                message:'Favorito cadastrada com sucesso'
            });
        });
    });

    

}

exports.findAll = function(req, resp) {
    Evaluation.find()
     .select('-__v')
     .exec((error,users) => {
         if (error) return handleError(resp,error);
         return handleSuccess(resp,users);
     })
    //resp.json([])
}

exports.findById = function(req,resp) {
    Evaluation.findOne()
    .where("_id").equals(req.params.id)
    .select('-__v')
    .exec((error,response) => {
        if (error) return handleError(resp,error);
        return handleSuccess(resp,response);
    })
}


exports.delete = function(req,resp){
    Evaluation.remove()
    .where("_id").equals(req.params.id)
    .exec((error,response) => {
        if (error) return handleError(resp,error);
        return handleSuccess(resp,response,'Favorito deletada com sucesso');
    })
};

