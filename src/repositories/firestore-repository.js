const FirestoreProvider = require('../config/firestore')

class FirestoreRepository {
  provider = null

  constructor () {
    this.provider = FirestoreProvider.getInstance()
  }

  async getCollection (collection) {
    const ref = this.provider.db.collection(collection)
    const snapshot = await ref.get()

    return snapshot.docs.map(doc => {
      const obj = doc.data()
      obj['uuid'] = doc.ref.id
      return obj
    })
  }

  async postDocument (path, document, uuid) {
    const res = await this.provider.db.collection(path).doc(uuid).set(document)
    const doc = await this.getDocumentById(path,uuid);
    if (res != null) return doc;

    return false
  }

  async patchDocument (collection, updates, uuid) {
    const ref = this.provider.db.collection(collection).doc(uuid)

    const snapshot = await ref.get();


    if (snapshot.exists) {
      await ref.update(updates)
      return true
    } else {
      return false
    }
  }

  async getDocumentByKey (collection, key, value) {
    const ref = this.provider.db.collection(collection).where(key, '==', value)

    const snapshot = await ref.get()

    let founded = null
    snapshot.forEach(doc => {
      founded = doc.data()
      founded['uuid'] = doc.id
    })

    return founded
  }

  async getDocumentById (collection,uuid) {
    const ref = this.provider.db.collection(collection).doc(uuid)

    const snapshot = await ref.get()

    if (!snapshot.exists) {
      return null;
    } else {
    const doc =  snapshot.data();
    doc['uuid'] = snapshot.ref.id;

    return doc;
    }
  }

  async getDocumentsByKey (collection,key,value) { 
    const ref = this.provider.db.collection(collection).where(key,'==',value);

    const snapshot = await ref.get();

    let founded = [];
    snapshot.forEach(doc => {
      let aux = doc.data()
      aux['uuid'] = doc.id;

      founded.push(aux);
    })

    return founded;
  }


  async deleteDocument (collection,uuid){
    const ref = await this.provider.db.collection(collection).doc(uuid).delete();
    if(ref === null || ref === undefined)
      return false;

      else 
    return true;
  }

  async deleteDocumentByKey(collection,key,value) {
    const querySnapshot = await this.provider.db.collection(collection).where(key,'==',value).get();
    querySnapshot.forEach(async (doc) => {
    const res =   await this.provider.db.collection(collection).doc(doc.id).delete();
    if(res === null || res === undefined)
      return false;
      else 
    return true;
    });
  }

  async getDocumentsByFields(collection, filters) {
    try {
      let ref = this.proider.db.collection(collection);

      for (const [key, value] of Object.entries(filters)) {
        ref = ref.where(key, "==", value);
      }
      
      const snapshot = await ref.get();
  
      const documents = [];
      snapshot.forEach((doc) => {
        const fixed = doc.data();
        fixed["uid"] = doc.ref.id;
        documents.push(fixed);
      });
  
      return documents;
    } catch (error) {
      console.log(error);
      throw new Error(`Error getting documents from collection ${collection}: ${error.message}`);
    }
  }
  

}

module.exports = FirestoreRepository
