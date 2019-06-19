'use strict'

const md5 = require('md5');
const jwt = require('jsonwebtoken');
const variables = require('../bin/config/variables');
const validation = require('../bin/helpers/validation');
const controllerBase = require('../bin/base/controller-base');
const repository = require('../repositories/user-repository');

const _rep = new repository();

function userController() {

}

/**
 * Receive one schema of User and create one user in database
 * @param {Http Request} req 
 */
userController.prototype.post = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.use_name, 'Name is required.');
    _validationContract.isRequired(req.body.use_email, 'E-mail is required.');
    _validationContract.isEmail(req.body.use_email, 'Incoming e-mail is invalid.');
    _validationContract.isRequired(req.body.use_password, 'Password is required.');
    _validationContract.isRequired(req.body.use_access_rule, 'Access rule is required.');
    _validationContract.isRequired(req.body.use_confirm_password, 'Confirm password is required.');
    _validationContract.isTrue(req.body.use_password != req.body.use_confirm_password, 'Password and password confirmation are different.');

    let userAlredyExists = await _rep.emailExist(req.body.use_email);
    if (userAlredyExists){
        _validationContract.isTrue(userAlredyExists.use_name != undefined, `The e-mail: ${req.body.use_email} alredy exists`)
    }

    req.body.use_password = md5(req.body.use_password);

    controllerBase.post(_rep, _validationContract, req, res);
};

/**
 * Receive one schema of User and update one user in database by id
 * @param {Http Request} req 
 */
userController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.params.id, 'Id is required.');
    _validationContract.isRequired(req.body.use_name, 'Name is required.');
    _validationContract.isRequired(req.body.use_email, 'E-mail is required.');
    _validationContract.isEmail(req.body.use_email, 'Incoming e-mail is invalid.');
    _validationContract.isRequired(req.body.use_password, 'Password is required.');
    _validationContract.isRequired(req.body.use_access_rule, 'Access rule is required.');
    _validationContract.isRequired(req.body.use_confirm_password, 'Confirm password is required.');
    _validationContract.isTrue(req.body.use_password != req.body.use_confirm_password, `The e-mail: ${req.body.use_email} alredy exists`);

    let userAlredyExists = await _rep.emailExist(req.body.use_name);
    if (userAlredyExists){
        _validationContract.isTrue(userAlredyExists.use_name != undefined && userAlredyExists._id != req.params.id, `Já existe o email ${req.body.use_email} cadastrado em nossa base`)
    }

    controllerBase.put(_rep, _validationContract, req, res);
    
};

/**
 * Return all user 
 * @param {Http Request} req
 * @return mongoose.Schema Array<User>
*/
userController.prototype.get = async (req, res) => {
    controllerBase.get(_rep, req, res);
};

/**
 * Return one user by id
 * @return mongoose.Schema User
*/
userController.prototype.getById = async (req, res) => {
    controllerBase.getById(_rep, req, res);
};

/**
 * Delete one user by id
 * @param {Http Request} req
 * @return mongoose.Schema User
*/
userController.prototype.delete = async (req, res) => {
    controllerBase.delete(_rep, req, res);
};

/**
 * Receive credentials and make login
 * @param {Http Request} req
 * @return mongoose.Schema User
*/
userController.prototype.autenticar = async (req, res) => {

    let _validationContract = new validation();
    console.log('req.body',req.body);
    _validationContract.isEmail(req.body.use_email, 'User not found.');
    _validationContract.isRequired(req.body.use_email, 'E-mail is required.');
    _validationContract.isRequired(req.body.use_password, 'Password is required.');

    if(!_validationContract.isValid()){
        res.status(400).send({message: 'Login fail: ', validation: _validationContract.errors() });
        return
    }

    let userFound = await _rep.authenticate(req.body.use_email, req.body.use_password);
    if(userFound){
        res.status(200).send({
            usuario: userFound,
            token: jwt.sign({ user:userFound }, variables.Security.secretKey)
        }) 
    }else{
        res.status(404).send({message: 'User and password invalid.' })
    }
}

module.exports = userController;