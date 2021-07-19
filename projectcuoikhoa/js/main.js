import AvatarGridLayout from "./component/avatargridlayout.js";
import NavBar from "./NavBar.js";
import RegisterForm from "./Login/RegisterForm.js";
import LoginForm from "./Login/LoginForm.js";
import InputData from "./Login/InputData.js";

import "./router.js";

import AnimalScreen from "./component/categoryScreen/AnimalScreen.js";
import HumanScreen from "./component/categoryScreen/HumanScreen.js";
import LoveScreen from "./component/categoryScreen/LoveScreen.js";
import NaturalScreen from "./component/categoryScreen/NaturalScreen.js";
import TopBar from "./TopBar.js";
import SearchScreen from "./component/categoryScreen/searchScreen.js";


const loggedUser = await firebase.auth().currentUser;
if (loggedUser != null) {
  router.navigate("/home");
  console.log("da dang nhap");
} else {
  router.navigate("/login"); // Sau sẽ sửa thành '/login'
  console.log("chua dang nhap");
}

export function getDataFromDoc(doc) {
  let myObj = doc.data();
  myObj.id = doc.id;
  return myObj;
}


export async function createNewStory() {
  // await firebase.auth().signInWithEmailAndPassword("dungdz@gmail.com", "123456")
  let currentUser = await firebase.auth().currentUser;
  // console.log(currentUser);
  let myUser = await firebase.firestore().collection("users").doc(currentUser.uid).get();
  if(myUser.data().idEditStory != ""){
    let myStory = await firebase.firestore().collection("storys").doc(myUser.data().idEditStory).get();
    // console.log(myStory.exists);
    if(!myStory.exists){
      // continue;
    }
    if(myStory.data().data == null || myStory.data().data == ""){
      return;
    }
  }
  
  let newStory = await firebase.firestore().collection("storys").add({
    id: "",
    userId: "",
    data: "",
  });

  newStory.set({
    id: newStory.id,
    userId: currentUser.uid,
    data: "",
  });

  await firebase
    .firestore()
    .collection("users")
    .doc(currentUser.uid)
    .update({ idEditStory: newStory.id });
}



