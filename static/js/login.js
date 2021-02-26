let formField = document.getElementsByTagName('input');
let emailDiv = document.querySelector('.email-div');
let passwordDiv = document.querySelector('.password1-div');

emailDiv.innerHTML += "<label for='Email' class='label-email'><span class='content-email'> Username </span></label>"
passwordDiv.innerHTML += "<label for='Password1' class='label-password'><span class='content-email'>Password</span></label>"

formField[1].autocomplete = "off";
formField[2].autocomplete = "off";

let Inputs = document.getElementsByTagName('Input');
console.log(Inputs)

addEventListener("click", (e) => {
    checkInputs();

});


function checkInputs() {
  const email = Inputs[1].value.trim();
  const password1 = Inputs[2].value.trim();

  if (password1 == ""){
    raiseError(Inputs[2], "password cannot be blank and both password must match")
  }else{
    raiseSuccess(Inputs[2], "")
  }
  if (email == ""){
    raiseError(Inputs[1], "email cannot be blank");
  }else{
    raiseSuccess(Inputs[1], "")
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