let newProfilePic = document.querySelector("#new-profile-pic-input");
let SaveBtn = document.querySelector("#save-btn");
let invisibleFile = document.querySelector(".invisible-file");
let username = document.querySelector("#user-username")
let usernameValue = document.querySelector("#user-username").value
let newProfile = 0;
let form = document.querySelector(".name-language")

newProfilePic.addEventListener("click", (event) => {
    event.preventDefault();
    invisibleFile.click()

})

SaveBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (invisibleFile.value !=  0 ||  username != usernameValue) {
    let myForm = form;
    const Form = new FormData(myForm);
    const method = "POST";
    const xhr = new XMLHttpRequest();
    const url = "updateUserProfile/"
    xhr.open(method, url);
    xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.onload = function () {

    }
    xhr.send(Form);
    console.log(invisibleFile.value)

    }

})