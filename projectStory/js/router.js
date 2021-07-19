var root = null;
var useHash = true; // Defaults to: false
var hash = "#"; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

router
  .on("/login", function () {
    document.getElementById("container").innerHTML =
      "<login-form></login-form>";
  })
  .resolve();

router
  .on("/register", function () {
    document.getElementById("container").innerHTML =
      "<register-form></register-form>";
  })
  .resolve();

router
  .on("/home", function () {
    document.getElementById("container").innerHTML = `
    <top-bar></top-bar>
    <nav-bar></nav-bar>
    <avatar-grid></avatar-grid>
    `;
  })
  .resolve();

  router
  .on("/present", function () {
    document.getElementById("container").innerHTML = `
    <top-bar></top-bar>
    <nav-bar></nav-bar>
    <present-story></present-story>`;
  })
  .resolve();

  router
  .on("/design", function () {
    let currentUser = firebase.auth().currentUser;
    if (currentUser == null) {
      router.navigate("./login")
    }
    document.getElementById("container").innerHTML = `
    <nav-bar></nav-bar>
    <design-screen></design-screen>`;
  })
  .resolve();

  router
  .on("/read", function () {
    document.getElementById("container").innerHTML = `
    <nav-bar></nav-bar>
    <read-story-screen></read-story-screen>`;
  })
  .resolve();

  router
  .on("/animal", function () {
    document.getElementById("container").innerHTML = `
    <top-bar></top-bar>
    <nav-bar></nav-bar>
    <animal-screen></animal-screen>`;
  })
  .resolve();

  router
  .on("/human", function () {
    document.getElementById("container").innerHTML = `
    <top-bar></top-bar>
    <nav-bar></nav-bar>
    <human-screen></human-screen>`;
  })
  .resolve();

  router
  .on("/love", function () {
    document.getElementById("container").innerHTML = `
    <top-bar></top-bar>
    <nav-bar></nav-bar>
    <love-screen></love-screen>`;
  })
  .resolve();

  router
  .on("/natural", function () {
    document.getElementById("container").innerHTML = `
    <top-bar></top-bar>
    <nav-bar></nav-bar>
    <natural-screen></natural-screen>`;
  })
  .resolve();

  router
  .on("/search", function () {
    document.getElementById("container").innerHTML = `
    <top-bar></top-bar>
    <nav-bar></nav-bar>
    <search-screen></search-screen>`;
  })
  .resolve();

window.router = router;
