import Processing, { getDataFromDoc, getUserAction } from "./Processing.js";


export async function reload() {
    // let currentUser = await firebase.auth().currentUser;
    // fix cung du lieu 
    // await firebase.auth().signInWithEmailAndPassword("dungdz@gmail.com", "123456") +++++++++
    
    let designStoryForm = document.querySelector("design-story-form");
    let myStory = document.querySelector("story-maked");

    let currentUser = await firebase.auth().currentUser;
    console.log(currentUser.uid);
    let user = await firebase.firestore().collection("users").doc(currentUser.uid).get();
    let userObj = getDataFromDoc(user);
    // console.log(userObj);

    let doc = await firebase.firestore().collection("storys").doc(userObj.idEditStory).get();
    let dataStory = getDataFromDoc(doc);
    // console.log(dataStory);

    designStoryForm.data = JSON.stringify(dataStory);
    myStory.data = dataStory.data;
    updatePageForm();
    // console.log(currentPage);
}
// Processing.getToDay();

// await reload();
