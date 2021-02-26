
class App {
    constructor (messageSection, activeuserslist) {
    // current ActiveFriend
    this.friendId = "global";
    // Info of all the user
    this.friendLists = [];
    // Client Info
    this.ClientProfile = "";
    this.ClientName = "";
    this.ClientID = "";
    // Contains all the messages that are currently being displayed
    this.Messages = [];
    this.LatestMessage;
    // Html elements
    this.MessageSection = messageSection;
    this.ActiveUsersList = activeuserslist

    }

    isOverFlown(element) {
        return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    }


    AjaxRequestSetup(methods, urls, responseTypes) {
        let xhr = new XMLHttpRequest();
        let  method = methods;
        let url = urls;
        let responseType = responseTypes;

        xhr.open(method, url)

        return xhr
    };

    getClientInfo() {
        let xhr = this.AjaxRequestSetup("GET", "ClientInfo/", "json");
        let target = this
        xhr.onload = function() {
            let serverResponse = JSON.parse(xhr.response)
            // client Info
            document.querySelector("#user-image-top").src = serverResponse.userProfile
            Application.ClientProfile = serverResponse.userProfile;
            Application.ClientName = serverResponse.username;
            Application.ClientID = serverResponse.userID;

            // load first twenty messages
            target.loadMessage(20, true)

            loop = setInterval(target.start, 3000)

        }

        xhr.send();
    }

    loadMessage(required, scrollBottom=false) {
        let target = this
        let xhr = "";
        if (this.friendId == "global") {
            xhr = this.AjaxRequestSetup("GET", "jsonInfo/" + required + "/", "json");
        }else {
            xhr = this.AjaxRequestSetup("GET", "jsonInfo/" + required + "/" + this.friendId + "/" , "json");
        }

        xhr.onload = function(event) {

            let serverResponse = JSON.parse(xhr.response);
            let MessagesList = serverResponse.response;
            let beforeload = 0;
            if (scrollBottom == false) {
                beforeload = target.Messages[target.Messages.length - 1].id
            }

            target.Messages = [];
            for (var i = 0; i < MessagesList.length ; i++) {
                new Messages(MessagesList[i].user, MessagesList[i].userID, MessagesList[i].userProfile, MessagesList[i].content, MessagesList[i].date, MessagesList[i].image, MessagesList[i].video, MessagesList[i].id)
            }
            if (MessagesList.length == 0) {
                target.LatestMessage = null
            }else{
                target.LatestMessage = MessagesList[0].id
                target.displayMessages();

                if(scrollBottom == true) {
                    document.querySelector(".message-section").scrollTo(0, 10000000000000000000)
                }else {
                document.getElementById("" + beforeload).scrollIntoView();
                 }

                 target.displayMessages();
            }

            if(scrollBottom == true) {
                document.querySelector(".message-section").scrollTo(0, 10000000000000000000)
            }else {
                document.getElementById("" + beforeload).scrollIntoView();
            }

        }

        xhr.send();

    };

    displayMessages() {
        HtmlMessagesection.innerHTML =  "";
        for (var i = this.Messages.length - 1; i >= 0; i--) {

            if (this.Messages[i].IsUser(this.Messages[i].userID)) {
                 if (this.Messages[i].containVideo()) {
                    // video and text
                    HtmlMessagesection.innerHTML +=`<div class="received-message" id="${this.Messages[i].id}"><div class="client-message"><p class="client-message-content"><a href="${this.Messages[i].video}"> <video controls class="video"> <source src="${this.Messages[i].video}" type="video/mp4"></video></a>${this.Messages[i].content}</p><img class="client-message-pic openUrl" src="${this.Messages[i].userProfile}"></div></div>`
                }else if (this.Messages[i].containImage()) {
                    // image and text
                    HtmlMessagesection.innerHTML +=`<div class="received-message" id="${this.Messages[i].id}"><div class="client-message"><p class="client-message-content"><a href="{this.Messages[i].image}"><img class="message-content-image" src="${this.Messages[i].image}"> </a>${this.Messages[i].content}</p><img class="client-message-pic openUrl" src="${this.Messages[i].userProfile}"></div></div>`
                }else {
                    // text
                    HtmlMessagesection.innerHTML += `<div class="received-message" id="${this.Messages[i].id}"><div class="client-message"><p class="client-message-content">${this.Messages[i].content}</p><img class="client-message-pic openUrl" src="${this.Messages[i].userProfile}"></div></div>`
                }
            }else {

                if (this.Messages[i].containVideo()) {
                    // video and text
                    HtmlMessagesection.innerHTML += `<div class="received-message" id="${this.Messages[i].id}"><div class="client-friend-message"><img class="client-friend-message-pic openUrl" src="${this.Messages[i].userProfile}"><p class="client-friend-message-content"><a href="${this.Messages[i].video}"> <video controls class="video"> <source src="${this.Messages[i].video}"></video></a> ${this.Messages[i].content}</p></div></div>`
                }else if (this.Messages[i].containImage()) {
                    // image and text
                    HtmlMessagesection.innerHTML += `<div class="received-message" id="${this.Messages[i].id}"><div class="client-friend-message"><img class="client-friend-message-pic openUrl" src="${this.Messages[i].userProfile}"><p class="client-friend-message-content"><a href="${this.Messages[i].image}"><img src="${this.Messages[i].image}" class="client-friend-message-content-image"></a>${this.Messages[i].content}</p></div></div>`
                }else {
                    // text
                    HtmlMessagesection.innerHTML += `<div class="received-message" id="${this.Messages[i].id}"><div class="client-friend-message"><img class="client-friend-message-pic openUrl" src="${this.Messages[i].userProfile}"><p class="client-friend-message-content">${this.Messages[i].content}</p></div></div>`
                }

            }

        }


           document.querySelectorAll(".openUrl").forEach((element) => {
            element.addEventListener("click", (event) => {
                window.location.href = event.target.src
            } )
        })



    };
    displayUser(Users) {
        this.ActiveUsersList.innerHTML = "";
        for (var i = Users.length - 1; i >=0; i--) {
        if (Users[i].id != this.ClientID) {
            if (Users[i].active) {
                this.ActiveUsersList.innerHTML += `<div class="view-friend" id="${Users[i].id}" imagelink="${Users[i].image}" username="${Users[i].username}"><img src="${Users[i].image}" class="image-friend openUrl"><p class="friend-username active-user-profile">${Users[i].username}</p></div>`
            }else {
                this.ActiveUsersList.innerHTML += `<div class="view-friend" id="${Users[i].id}" imagelink="${Users[i].image}" username="${Users[i].username}"><img src="${Users[i].image}" class="image-friend openUrl"><p class="friend-username">${Users[i].username}</p></div>`
            }
        }}


        document.querySelectorAll(".view-friend").forEach((friend) =>  {
            friend.addEventListener("click", () => {
            if (window.innerWidth <= 700) {

            // hide left screen and display right screen
                leftsection.style.transform = "scale(0)";
                leftsection.style.position = "absolute";
                rightsection.style.transform = "scale(1)";
                rightsection.style.width = "100%";
                rightsection.style.height = "100vh";
            }
            document.getElementById("dynamic-image").src = friend.getAttribute("imagelink")
            document.querySelector("#dynamic-username").innerHTML = friend.getAttribute("username")
            clearInterval(loop);
            HtmlMessagesection.innerHTML = "";
            Application.friendId = friend.id
            Application.loadMessage(20, true)
            loop = setInterval(this.start, 3000)
                })
            })

    };

    gateWay() {
        let target = this;
        if (this.LatestMessage != null) {
        const xhr = this.AjaxRequestSetup("GET", "GateWay/" + this.LatestMessage + "/" + (this.friendId + "") + "/", "json")

        xhr.onload = function() {
            const serverResponse = JSON.parse(xhr.response);
            if (serverResponse.new_message == true) {
                target.loadMessage(target.Messages.length + 1, true)
            }
            target.displayUser(serverResponse.users);
        }
        xhr.send()
        }
    };

    start() {
        Application.gateWay();
        // if user seeks for more messages
        if (Application.Messages != null) {
        if (Application.Messages.length != 0) {
            if (HtmlMessagesection.scrollTop == 0 && Application.isOverFlown(HtmlMessagesection)) {
                Application.loadMessage(Application.Messages.length * 2)
            }
        }
        }
    };

}


class Messages {
    constructor (user, userID, userProfile, content, date, image, video, id)  {
        this.user = user;
        this.userID = userID
        this.userProfile = userProfile
        this.content = content;
        this.date = date;
        this.image = image;
        this.video = video;
        this.id = id;
        Application.Messages.push(this);
    }

    containImage() {
        if (this.image !== false) {
            return true
        }else{

            return false
        }
    };
    containVideo() {
        if (this.video !== false) {
            return true
        }else {

            return false
        }

    };

    IsUser(userID) {
        if (userID == Application.ClientID) {
            return true
        }else {

            return false
        }

    };
    formatedDate() {


    };
}


// global variables

let HtmlMessagesection = document.querySelector(".message-section");
let Application = new App(HtmlMessagesection, document.querySelector(".client-friend-display"))
let clients = false
let loop;
Application.friendId = "global";
Application.getClientInfo();
let fileinput = document.querySelector(".file-input")
let messageInput = document.querySelector(".message-input")
let leftsection = document.querySelector(".left-section");
let rightsection = document.querySelector(".right-section");

// Event Listeners




document.querySelector(".input-elements").addEventListener("submit", (event) => {
    event.preventDefault();
    if (fileinput.value == "" && messageInput.value == "") {
        messageInput.value = "👍"
    }
    let myForm = event.target;
    const Form = new FormData(myForm);
    const url = `add-message/${Application.friendId}/`
    const method = myForm.getAttribute("method");
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    xhr.onload = function () {
        Application.loadMessage(Application.Messages.length + 1, scrollBottom=true)
    }

    xhr.send(Form);
    document.querySelector(".message-input").value = "";
    document.querySelector(".file-input").value = "";
})