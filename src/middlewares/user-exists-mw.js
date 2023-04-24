const FirestoreProvider = require("../config/firestore");
const Response = require("../models/response-model");

const firestoreProvider = FirestoreProvider.getInstance();


userExists = async (req,res,next) => {

    const email = req.params.email;
    const uuid  = req.params.id;
    const emailBody = req.body.useremail;

    console.log(email,uuid,emailBody);

    try {
        if(email != undefined) { 
            const user = await userExistsByEmail(email);

        } else if(uuid != undefined) {
            const user = await userExistsByOD(uuid);

        } else if ( emailBody != undefined) {
            const user = await userExistsByEmail(emailBody);
            console.log(user);
        }

        next();
        
    } catch (error) {
        console.log(error)
        return res.status(401).json(new Response(true,"User not found."))
    }
    
}

userExistsByID = async (uuid)  => {
    const ref = firestoreProvider.db.collection('users').doc(uuid);

    const snapshot = await ref.get()

    let founded = null
    snapshot.forEach(doc => {
      founded = doc.data()
      founded['uuid'] = doc.id
    })

    return founded
  }



  userExistsByEmail = async (email)  => {
    const ref = firestoreProvider.db.collection('users').where('user', '==', email)

    const snapshot = await ref.get()

    let founded = null
    snapshot.forEach(doc => {
      founded = doc.data()
      founded['uuid'] = doc.id
    })

    return founded
  }
  

module.exports = userExists;