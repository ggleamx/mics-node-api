const FirestoreRepository = require('./firestore-repository');
const axios = require('axios');
class InsightsRepository extends FirestoreRepository { 
    
    constructor() {
        super();
    }

    getInsights = async (media_id, access_token, fields) => {
        //https://graph.facebook.com/v16.0/17973262913362852/insights?access_token=EACCWyWdwt9gBADvsulH1aPZCIuwDZBiZBJija4S9HQjZA6DsvvCx2xuiimSJON206WxqHwVEQ56APfphF2ppNfx9mxLCkyCSR0mlZC02CIzFFcEmGnl8mPunDvghqQGFlxiW13MTPQoL9DIZABCH6K76XxfNppqYy1VvJPPxMzZBS4rGcgeq0AMkdsN4DNTBhIZD&metric=impressions,reach,profile_visits,total_interactions,likes,comments,shares,total_interactions,engagement,saved,follows

        const url = `https://graph.facebook.com/v16.0/${media_id}/insights?access_token=${access_token}&metric=${fields}`;
        try {
            const response = await axios.get(url);
            return response.data;
        }
        catch (error) {
            console.log(error)
            throw new Error(error.message);
        }
    }
    } 

module.exports = InsightsRepository;

