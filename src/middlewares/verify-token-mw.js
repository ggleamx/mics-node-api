const {
    default: axios
} = require("axios");
const RealtimeProvider = require("../config/realtime");
const Response = require("../models/response-model");


async function verifyToken(req, res, next) {
    const instance = RealtimeProvider.getInstance();

    try {

        const token = await instance.getToken();
        const url = instance.urls.base_url + '/ConnectionDb.json';

        await axios.get(url, {
            params: {
                access_token: token
            }
        });
        next();

    } catch (error) {

        if (error.response.status === 401) {
            console.log("Token unauthorized, refreshing..")
            await instance.refreshToken();
            console.log("Token updated.")
            next();
        } else {
            return res.json(new Response(true, "Servidor no disponbile.", null, error))
        }
    }

}

module.exports = {
    verifyToken
}