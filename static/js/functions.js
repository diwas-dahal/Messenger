let extraoptions = document.querySelector(".extra-options");
let homeoptions = document.querySelector("#menu-option")
let openButton = document.querySelector(".fa-ellipsis-v");
let viewFriend = document.querySelectorAll(".view-friend");
let leftSection = document.querySelector(".left-section");
let rightSection = document.querySelector(".right-section");
let inputBar = document.querySelector(".message-input");
let thumbsup = document.querySelector(".fa-thumbs-up");
let messageSection = document.querySelector(".message-section");
let dynamicImage = document.getElementById("dynamic-image");
let dynamicUsername = document.getElementById("dynamic-username");
let inputfile = document.querySelector(".file-input")

// Open and close extra options
window.addEventListener("click", (event) => {
    if (event.target == homeoptions) {
        extraoptions.innerHTML = `<p><i class="fas fa-adjust"><span class="text">Appearances</span></i></p><a class="text" href="accounts/UserProfile/"><p><i class="fas fa-user-circle"><span class="text">Profile</span></i></p></a><p><i class="fas fa-sign-out-alt"><a class="text" href="accounts/logout/">Logout</a></i></p>`
        extraoptions.style.left = (event.pageX - extraoptions.offsetWidth) + "px";
        extraoptions.style.top = event.pageY + "px";
        extraoptions.style.transform = "scale(1)";
    }else{
        extraoptions.style.transform = "scale(0)";
    }
    if (event.target.innerText == "Appearances") {
        extraoptions.style.transform = "scale(1)"
        extraoptions.innerHTML = `<p><i class="fas fa-long-arrow-alt-left"><span class="text">Back</span></i></p><p><i class="far fa-moon"><span class="text">Dark Theme</span></i></p><p><i class="fas fa-lightbulb"><span class="text">Light Theme</span></i></p>`
    }
    if (event.target.innerText == "Back") {
        extraoptions.style.transform = "scale(1)";
        extraoptions.innerHTML = `<p><i class="fas fa-adjust"><span class="text">Appearances</span></i></p><a class="text" href="accounts/UserProfile/"><p><i class="fas fa-user-circle"><span class="text">Profile</span></i></p></a><p><i class="fas fa-sign-out-alt"><a class="text" href="accounts/logout/">Logout</a></i></p>`

    }
    if (event.target.innerText == "Dark Theme") {
        let darkColor = "rgba(0, 0, 0, 0.8)"
        document.querySelector(".main-body").style.backgroundColor = darkColor
        document.querySelector(".user-profile-and-username").style.backgroundColor = darkColor
        document.querySelector(".Global").style.backgroundColor = darkColor
        document.querySelector(".client-friend-display").style.backgroundColor = darkColor
    }

  if (event.target.classList[1] == "fa-chevron-left") {
    rightSection.style.transform = "scale(0)";
    leftSection.style.transform = "scale(1)"
    leftSection.style.position = "initial"
    leftSection.style.width = "100%"
  }


})

// Displays the message of selected friend
viewFriend.forEach((friend) => {
  friend.addEventListener("click", () => {
    if (window.innerWidth <= 700) {

      // hide left screen and display right screen
      leftSection.style.transform = "scale(0)";
      leftSection.style.position = "absolute";
      rightSection.style.transform = "scale(1)";
      rightSection.style.width = "100%";
      rightSection.style.height = "100vh";
    }

  })
})


// checks the size of screen and manages the layout
window.addEventListener('resize', function(){
  if(window.innerWidth > 700){
    leftSection.style.width = "40%";
    leftSection.style.transform = "scale(1)";
    leftSection.style.position = "initial";
    rightSection.style.transform = "scale(1)";
    rightSection.style.width = "60%";
    document.querySelector(".main-body").style.display = "flex";
    document.querySelector(".fa-chevron-left").style.transform = "scale(0)"
  }else{
    document.querySelector(".fa-chevron-left").style.transform = "scale(1)"
    if (rightSection.style.width != "100%") {
      leftSection.style.width = "100%";
      rightSection.style.transform = "scale(0)";
      document.querySelector(".main-body").style.display = "initial";
  }
}
});



// Initial setup
if(window.innerWidth > 700){
  leftSection.style.width = "40%";
  leftSection.style.transform = "scale(1)";
  leftSection.style.position = "initial";
  rightSection.style.transform = "scale(1)";
  rightSection.style.width = "60%";
  document.querySelector(".main-body").style.display = "flex";
  document.querySelector(".fa-chevron-left").style.transform = "scale(0)"
}else{
  document.querySelector(".fa-chevron-left").style.transform = "scale(1)"
  if (rightSection.style.width != "100%") {
    leftSection.style.width = "100%";
    rightSection.style.transform = "scale(0)";
    document.querySelector(".main-body").style.display = "initial";
}
}

inputfile.addEventListener("input", (event) => {
    // files
    if (inputfile.value == "") {
       thumbsup.className = "fas fa-thumbs-up";
    }else {
        thumbsup.className = "fas fa-paper-plane";
    }

    if (inputBar.value != "") {
        thumbsup.className = "fas fa-paper-plane";
    }
} )


function showsubmit (event) {
      thumbsup.className = "fas fa-paper-plane";
      if (inputBar.value == "") {
        thumbsup.className = "fas fa-thumbs-up";
      }
}

