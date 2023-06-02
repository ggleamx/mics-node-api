const APIResponse = require('../models/response-api-model');
const { v4: uuidv4 } = require('uuid');
const BaseController = require('./base-controller');

class InsightsController extends BaseController {
    
    constructor(repository) {
        super(repository);
    }

    getInsights = async (req, res) => {
        const { media_id , access_token , metric } = req.query;
        try {

            const response = await this.repository.getInsights(media_id, access_token, metric);
            const { data } = response;

            return res.json(new APIResponse().ok200({
                data
            }));


        } catch (error) {
            console.log(error)
            return res.json(new APIResponse().internalError500(error.message));
        }
    }

}

module.exports = InsightsController;
