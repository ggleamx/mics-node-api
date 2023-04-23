
class BaseController {
    repository;

    constructor( repository ) {
        this.repository = repository;
    }
}

module.exports = BaseController;