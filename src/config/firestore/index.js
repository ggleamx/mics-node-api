const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

class FirestoreProvider {
  static instance = null
  db = null
  consumerKeys = null

  constructor () {
    if (FirestoreProvider.instance !== null) {
      throw new Error('No se puede instanciar esta clase directamente')
    }
  }

  async init (api = true) {
    this.connectDatabase()

  }

  static getInstance () {
    if (this.instance === null) {
      this.instance = new FirestoreProvider()
    }
    return this.instance
  }

  connectDatabase () {
    try {
      var serviceAccount =  require('../envs/service-accounts/sa-dev.json')

      initializeApp({
        credential: cert(serviceAccount),
        
      })

      console.log('~ Firestore database successfuly connected')

      this.db = getFirestore()
    } catch (error) {
      console.log(error)
      console.log('~ Firestore database cannot be connected')
    }
  }


}

module.exports = FirestoreProvider;
