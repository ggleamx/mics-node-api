const axios = require('axios');
const cheerio = require('cheerio');

async function getLikes(username) {
  try {
    const url = `https://www.instagram.com/${username}/`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    console.log(response.data)
    const likesElement = $('span.vcOH2');
    const likes = likesElement.text().trim() || 'Likes not found';
    return likes;
  } catch (error) {
    console.error('Error:', error.message);
  }
}


// Aquí puedes cambiar 'cristiano' por el nombre de usuario de la cuenta de Instagram que deseas obtener los likes
const username = 'cristiano';
getLikes(username)
  .then((likes) => {
    console.log('Likes:', likes);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });