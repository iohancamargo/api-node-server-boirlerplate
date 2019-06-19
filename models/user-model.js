'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

/**
 * use_access_rule
 * 1 -> ADMIN
 * 2 -> CUSTUMER
 */

const userModel = new schema({
    use_name: { required: true, type: String },
    use_email: { trim: true, index: true, unique: true, required: true, type: String },
    use_email_is_confirmed : { trim: true, required: true, type: Number, default: 0 },
    use_password: { required: true, type: String },
    use_access_rule: { trim: true, required: true, type: Number },
    use_date_of_removal: { trim: true, type: Date },
    use_id_user_of_removal: { trim: true, type: String },
    use_is_block: { trim: true, type: Number, default: 0 },
    use_date_of_block: { trim: true, type: Date },
    use_id_user_of_block: { trim: true, type: String },
    use_reason_of_block: { trim: true, type: String },
    use_id_user_insert: { trim: true, type: String },
    use_date_insert: { trim: true, type: Date, default: Date.now },
    use_id_user_update: { trim: true, type: String },
    use_date_update: { trim: true, type: Date },

}, { versionKey: false });

/*
userModel.pre('save', next => {
    let agora = new Date();
    if(!this.dataCriacao){
        this.dataCriacao = agora;
    }
    next();
});
*/
module.exports = mongoose.model('User', userModel)