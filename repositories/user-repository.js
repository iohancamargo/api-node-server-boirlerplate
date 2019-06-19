require('../models/user-model');

const md5 = require('md5')
const base = require('../bin/base/repository-base');

class userRepository {
    constructor() {
        this._base = new base('User');
        this._projection = '_id use_name use_email use_access_rule use_date_of_removal use_id_user_of_removal use_is_block use_date_of_block use_id_user_of_block use_reason_of_block use_id_user_insert use_date_insert use_id_user_update use_id_user_update use_date_update';
    }

    /**
     * Receive one email and verify if already exists in database
     * @param {String} emailReceived 
     * @return mongoose.Schema User
     */
    async emailExist(emailReceived){
        return await this._base._model.findOne({ email: emailReceived }, this._projection)
    }

    /**
     * Receive credentials and make login
     * @param {String} emailReceived 
     * @param {String} passWordReceived 
     * @return mongoose.Schema User
     */
    async authenticate(emailReceived, passWordReceived){
        let passwordHash = md5(passWordReceived);        
        return await this._base._model.findOne({ use_email: emailReceived, use_password: passwordHash }, this._projection);
    }

    /**
     * Receive one schema of User and create one user in database
     * @param {mongoose.Schema User} data 
     */
    async create(data){
        let sendToCreate = await this._base.create(data);
        return this._base._model.findById(sendToCreate._id, this._projection)
    }

    /**
     * Receive one id and schema of user for update
     * @param {String} id 
     * @param {mongoose.Schema User} data 
     * @return mongoose.Schema User
     */
    async update(id, data){
        let updated = await this._base.update(id, 
        {
            use_name : data.use_name,
            use_email : data.use_email,
            use_password : data.use_password,
            use_is_block : data.use_is_block,
            use_access_rule : data.use_access_rule,
            use_date_insert : data.use_date_insert,
            use_date_update : data.use_date_update,
            use_date_of_block : data.use_date_of_block,
            use_id_user_insert : data.use_id_user_insert,
            use_id_user_update : data.use_id_user_update,
            use_date_of_removal : data.use_date_of_removal,
            use_reason_of_block : data.use_reason_of_block,
            use_id_user_of_block : data.use_id_user_of_block,
            use_email_is_confirmed : data.use_email_is_confirmed,
            use_id_user_of_removal : data.use_id_user_of_removal,
        });

        return updated;
        // return this._base._model.findById(updated._id, this._projection)
    }

    /**
     * Return all user 
     * @return mongoose.Schema Array<User>
     */
    async getAll(){
        return await this._base._model.find({}, this._projection);
    }

    /**
     * Return one user by id
     * @return mongoose.Schema User
     */
    async getById(id){
        return await this._base._model.findById(id, this._projection);
    }

    /**
     * Delete one user by id
     * @return mongoose.Schema User
     */
    async delete(id){
        return await this._base.delete(id);
    }
}

module.exports = userRepository;