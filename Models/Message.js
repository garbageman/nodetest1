var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    msg: String
},
    {
        collection : 'messageCollection'    
                               });
module.exports = mongoose.model('Message', MessageSchema);