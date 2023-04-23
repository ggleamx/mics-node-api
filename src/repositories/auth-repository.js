const { default: axios } = require('axios')
const FirestoreRepository = require('./firestore-repository')

class AuthRepository extends FirestoreRepository{
  constructor () {
    super();
  }

}
module.exports = AuthRepository
