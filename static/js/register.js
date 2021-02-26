let formField = document.getElementsByTagName('input');
let userNameDiv = document.querySelector('.username-div');
let emailDiv = document.querySelector('.email-div');
let passwordDiv = document.querySelector('.password1-div');
let passwordDiv2 = document.querySelector('.password2-div');
let Inputs = document.getElementsByTagName('Input');

formField[0].autocomplete = "off";
formField[0].autocomplete = "off";
formField[1].autocomplete = "off";
formField[2].autocomplete = "off";
formField[3].autocomplete = "off";
formField[4].autocomplete = "off";

formField[0].name = "unknown"
formField[1].name = "Username"
formField[2].name = "Email"
formField[3].name = "Password1"
formField[4].name = "Password2"

userNameDiv.innerHTML += "<label for='Username' class='label-name'><span class='content-email'>User name</span> </label>"
emailDiv.innerHTML += "<label for='Email' class='label-email'><span class='content-email'> Email </span></label>"
passwordDiv.innerHTML += "<label for='Password1' class='label-password'><span class='content-email'>Password</span></label>"
passwordDiv2.innerHTML += "<label for='Password2' class='label-password2'><span class='content-email'>Confirm Password</span></label>"

addEventListener("click", (e) => {

 checkInputs();

});

function checkInputs() {
  const username = Inputs[1].value.trim();
  const email = Inputs[2].value.trim();
  const password1 = Inputs[3].value.trim();
  const password2 = Inputs[4].value.trim();



  if (username == ""){
  // declined
  raiseError(Inputs[1], "username cannot be blank")
  }else{
  raiseSuccess(Inputs[1], "")
  }
  if (password1 == ""){
  raiseError(Inputs[3], "password cannot be blank and both password must match")
  }else{
  raiseSuccess(Inputs[3], "")
  }
  if (email == ""){
  raiseError(Inputs[2], "email cannot be blank");
  }else{
  raiseSuccess(Inputs[2], "")
  }

  if (!isValid(email)){
  raiseError(Inputs[2], "Invalid email")
  }

  if(password2 == ""){
    raiseError(Inputs[4], "password2 cannot be blank")

  }else{
  raiseSuccess(Inputs[4], "")
  }

  if (password1 != password2){
    raiseError(Inputs[3], "");
    raiseError(Inputs[4], "");
  }


}

function raiseError(target, message){
const formControl = target;


// add error classes in inputs
formControl.classList.add("declined");
formControl.classList.remove("accepted");
}

function raiseSuccess(target, message){
const formControl = target;

// add success in classes
formControl.classList.add("accepted");
formControl.classList.remove("declined")
}

function isValid(email){
return /^(([^<>()\[s\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}