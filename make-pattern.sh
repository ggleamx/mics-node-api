#!/bin/bash

model=$1

if [ "$model" ]; then

    # Variable declarations
    modelUpper="$(tr '[:lower:]' '[:upper:]' <<< "${model:0:1}")${model:1}"
    modelController="$modelUpper""Controller"
    modelRepository="$modelUpper""Repository"

    # Create files
    touch ./src/routes/$model.routes.js
    touch ./src/controllers/$model-controller.js
    touch ./src/repositories/$model-repository.js
    touch ./src/schemas/$model-schema.js

    # File content for routes
    echo "const { Router } = require('express');
const $modelController = require('../controllers/$model-controller.js');
const $modelRepository = require('../repositories/$model-repository.js');
const router = Router();

const controller = new $modelController(new $modelRepository());

// router.get('/', controller.get$modelUpper);
// router.post('/', controller.create$modelUpper);
// router.put('/:id', controller.update$modelUpper);

module.exports = router;
" >> ./src/routes/$model.routes.js

    # File content for controller
    echo "const APIResponse = require('../models/response-api-model');
const { v4: uuidv4 } = require('uuid');
const BaseController = require('./base-controller');

class $modelController extends BaseController {
    
    constructor(repository) {
        super(repository);
    }

    get$modelUpper = async (req, res) => {
        
        try {
            return res.json(new Response(false, 'List of $model', []));
        } catch (error) {
            return res.json(new Response(true, 'Error on get $model', null, error));
        }
    }

    create$modelUpper = async (req, res) => {
        try {
            const {
                // props 
            } = req.body;

            // const reqStatus = await this.repository.postDocument(table, { props })

            // if (reqStatus)
            //   return res.json(new Response(false, 'Create $model successfully'));

            return res.json(new Response(true, 'Error while creating $model'));
        } catch (error) {
            return res.json(new Response(true, 'Fatal error on create $model', null, error));
        }
    }

    update$modelUpper = async (req, res) => {
        const updates = req.body;
        const uuid = req.params.id;

        try {
            // const isUpdated = await this.repository.patchDocument(table, updates, uuid);

            // if (isUpdated)
            //      return res.json(new Response(false, '$modelUpper updated successfully'));

            return res.json(new Response(true, 'Error on update $model'));
        } catch (error) {
            return res.json(new Response(true, 'Fatal error while updating $model', null, error));
        }
    }   
}

module.exports = $modelController;
" >> ./src/controllers/$model-controller.js

    # File content for repository
    echo "const FirestoreRepository = require('./firestore-repository');

class $modelRepository extends FirestoreRepository { 
    
    constructor() {
        super();
    }
} 

module.exports = $modelRepository;
" >> ./src/repositories/$model-repository.js

    # File content for schema
    echo "const Joi = require('joi');

const $modelSchema = Joi.object({
    example: Joi.string().required()
});

module.exports = $modelSchema;
" >> ./src/schemas/$model-schema.js

else 
    echo "Parameter needed"
fi
