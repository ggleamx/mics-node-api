class APIResponse {
    error = null;
    message  = null;
    payload = null;
    statusCode = null;
 
    constructor() {}
  
    getStatus() {
      return this.error;
    }
  
    getStatusCode() {
      return this.statusCode;
    }
  
    getPayload() {
      return this.payload;
    }
  
    getMessage() {
      return this.message;
    }

    /* OK: La solicitud fue exitosa y se recibió una respuesta. */
    ok200(payload = null, msg = null) {
      this.error = false;
      this.message = msg;
      this.payload = payload;
      this.statusCode = 200;

      return this.toObject();
    }
    
    /* Created: Se ha creado un nuevo recurso */
    created201(msg = null,payload = null) {
      this.error = false;
      this.message = msg;
      this.payload = payload;
      this.statusCode = 202;

      return this.toObject();
    }




    /* Bad Request: La solicitud del cliente es incorrecta o no se pudo entender */
    badRequest400(msg) {
      this.error = true;
      this.message = msg;
      this.statusCode = 400;
      return this.toObject();
    }

    /*
        El código de estado HTTP 400 indica que el servidor no pudo procesar la solicitud del cliente porque el servidor no pudo entender lo que se le estaba pidiendo. Este error se conoce como "Bad Request" (solicitud incorrecta).
     */

    notFound404(service){
      this.error = true;
      this.message = `Resource ${service} not found.`
      this.statusCode = 404;

      return this.toObject();
    }

    invalid422(message){
      this.error = true;
      this.message = message;
      this.statusCode = 422;

      return this.toObject();
    }

    /* Unathorized: La solicitud require autenticación del cliente. */
    unauthorized401(msg = null){
      this.error = true;
      this.message = msg;
      this.statusCode = 401;
      
      return this.toObject();
    }

    conflict409(msg = null){
      this.error = true;
      this.message = msg;
      this.statusCode = 409;
      
      return this.toObject();
    }




    toManyRequest429(message){
      this.error = true;
      this.message = message;
      this.stateCode = 429;

      return this.toObject();
    }
  
    /* Internal Server Error: El servidor encontró un error inesperado y no puede completar la solicitud del cliente. */
    internalError500(message = null){
      this.error = true;
      this.message = message ?? `An unknown error occurred`
      this.statusCode = 500;
      return this.toObject();
    }

    updatedResource204(msg = null,payload = null) {
      this.error = false;
      this.message = msg;
      this.payload = payload;
      this.statusCode = 204;

      return this.toObject();
    }

  
    toObject() {
      const obj = {
        error: this.error,
        statusCode: this.statusCode,
        payload: this.payload,
      };

      if(this.message) { 
        obj.message = this.message;
      }
      if(this.payload) { 
        obj.payload = this.payload;
      }
      return obj;
    }
  
    toJSON() {
      return JSON.stringify(this.toObject());
    }
  }
  


  module.exports = APIResponse;