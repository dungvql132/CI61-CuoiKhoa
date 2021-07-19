 

export async function register(name, email, password) {
    await firebase.auth().createUserWithEmailAndPassword(email, password); 
    await firebase.auth().currentUser.updateProfile({
        displayName: name
    });

    let currentUser =  await firebase.auth().currentUser;
    await firebase.firestore().collection("users").doc(currentUser.uid).set({
        name : name,
        idViewStory : "",
        idEditStory : ""
    })
}

export async function login(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
}

