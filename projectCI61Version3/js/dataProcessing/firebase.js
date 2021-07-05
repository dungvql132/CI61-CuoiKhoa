import Processing, { getDataFromDoc, getUserAction } from "./Processing.js";

document.getElementById("btn-saveStory").addEventListener("click", () => {
    let storyForm = document.querySelector("design-story-form");
    Processing.saveStoryToFireBase(storyForm.dataHTML)
})
let selectedStory;
let designStoryForm = document.querySelector("design-story-form");
// console.log(designStoryForm);
await firebase.auth().signInWithEmailAndPassword("dungdz@gmail.com", "123456")
let userAction = await getUserAction();
if(userAction == null){
    console.log("vao null");
}

let doc = await firebase.firestore().collection("storys").doc(userAction.idStory).get();
let dataStory = getDataFromDoc(doc);

designStoryForm.data = JSON.stringify(dataStory);
let myStory = document.querySelector("story-maked");
myStory.data = dataStory.data;