/**
 * @class
 * @deprecated Utilice la clase APIResponse en su lugar para nuevas implementaciones.
 */
class Response {
    constructor(error, msg, payload = null,internalError = null){
        this.error = error;
        this.msg = msg;
        this.payload = payload;
        this.internalError = internalError;
    }
}

module.exports = Response;