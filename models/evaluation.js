const mongoose = require('../connection/Connection');
const Schema = mongoose.Schema;

const EvaluationSchema = new Schema({

    user: {type :  Schema.Types.ObjectId, ref : 'User', required : [true, 'informe o usuário'], index : true},
    movieId: {type: String, index: true, required: [true, 'informe o id do filme']}
    
});

module.exports = mongoose.model('Evaluation',EvaluationSchema);