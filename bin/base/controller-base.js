exports.post = async(repository, validationContract, req, res) => {
    try {

        let data = req.body;

        if(!validationContract.isValid()){
            res.status(400).send({
                message: 'There is invalid data in your request...', 
                validation: validationContract.errors() 
            }).end();
            return;
        }

        let resultado = await repository.create(data);
        res.status(201).send(resultado);

    } catch (err) {

        console.log('Post error: ', err);
        res.status(500).send({ message: 'Erro no processamento', error: err});

    }
};

exports.put = async(repository, validationContract, req, res) => {
    try {

        let data = req.body;

        if(!validationContract.isValid()){
            res.status(400).send({
                message: 'There is invalid data in your request...', 
                validation: validationContract.errors() 
            }).end();
            return;
        }

        let resultado = await repository.update(req.params.id, data);
        res.status(202).send(resultado);

    } catch (err) {

        console.log('Put error: ', err);
        res.status(500).send({ message: 'Erro no processamento', error: err});
        
    }
};

exports.get = async(repository, req, res) => {
    try {
        let data = await repository.getAll()
        res.status(200).send(data);
    } catch (err) {
        console.log('Get error: ', err);
        res.status(500).send({ message: 'Erro no processamento', error: err});
    }
};

exports.getById = async(repository, req, res) => {
    try {
        let id = req.params.id
        if(id){
            let data = await repository.getById(id)
            res.status(200).send(data);
        } else {
            res.status(400).send({message: 'O parâmetro id precisa ser informado.'});
        }
    } catch (err) {
        console.log('Get error: ', err);
        res.status(500).send({ message: 'Erro no processamento', error: err});
    }
};

exports.delete = async(repository, req, res) => {
    try {
        let id = req.params.id
        if(id){
            let data = await repository.delete(id);
            res.status(200).send({message: 'Registro excluído com sucesso.'});
        } else{
            res.status(400).send({message: 'O parâmetro id precisa ser informado.'});
        }
    } catch (err) {
        console.log('Delete error: ', err);
        res.status(500).send({ message: 'Erro no processamento', error: err});
    }
};