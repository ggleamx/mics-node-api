const FirestoreRepository = require('./firestore-repository');
const axios = require('axios');

class LinksRepository extends FirestoreRepository { 
    
    constructor() {
        super();
    }


    getLinks = async (media_id, access_token, fields) => {

        //https://graph.facebook.com/v16.0/17973262913362852?access_token=EACCWyWdwt9gBADvsulH1aPZCIuwDZBiZBJija4S9HQjZA6DsvvCx2xuiimSJON206WxqHwVEQ56APfphF2ppNfx9mxLCkyCSR0mlZC02CIzFFcEmGnl8mPunDvghqQGFlxiW13MTPQoL9DIZABCH6K76XxfNppqYy1VvJPPxMzZBS4rGcgeq0AMkdsN4DNTBhIZD&fields=caption,comments_count,like_count,media_product_type,media_type,timestamp

        const url = `https://graph.facebook.com/v16.0/${media_id}?access_token=${access_token}&fields=${fields}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error(error.message);
        }x
    }
} 

module.exports = LinksRepository;

