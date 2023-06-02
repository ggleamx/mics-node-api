const APIResponse = require("../models/response-api-model");
const { v4: uuidv4 } = require("uuid");
const BaseController = require("./base-controller");

class LinksController extends BaseController {
  constructor(repository) {
    super(repository);
  }

  // https://graph.facebook.com

  getLinks = async (req, res) => {
    const { media_id, access_token, fields } = req.query;

    try {
      const response = await this.repository.getLinks(
        media_id,
        access_token,
        fields
      );
      const {
        caption,
        comments_count,
        like_count,
        media_product_type,
        media_type,
        timestamp,
        id,
      } = response;
      console.log(caption);

      // Expresión regular para buscar URLs en el texto
      const urlRegex = /(?:https?:\/\/|www\.)[^\s]+/g;

      // Array para almacenar los links encontrados
      const linksArray = [];

      // Expresión regular para buscar hashtags (#) y tags (@)
      const hashtagRegex = /#[^\s#]+/g;
      const tagRegex = /@[^\s@]+/g;

      // Array para almacenar los hashtags y tags encontrados
      const hashtagsArray = caption.match(hashtagRegex) || [];
      const tagsArray = caption.match(tagRegex) || [];


      // Buscar y almacenar los links en el array
      let match;
      while ((match = urlRegex.exec(caption)) !== null) {
        linksArray.push(match[0]);
      }

      console.log(linksArray);
      return res.json(
        new APIResponse().ok200({
          caption,
          id,
          links: linksArray,
          hashtags: hashtagsArray,
          tags: tagsArray,

        })
      );
    } catch (error) {
      console.log(error);
      return res.json(new APIResponse().internalError500(error.message));
    }
  };
}

module.exports = LinksController;
