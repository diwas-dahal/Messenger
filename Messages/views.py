from django.shortcuts import render
from .decorators import *
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.models import User
from .models import *
from datetime import date
from django.utils import timezone
from .forms import *
# Create your views here.


@login_required
def homePage(request):
    return render(request, "Messages/home.html")


@login_required
def ClientInfo(request):
    username = str(request.user)
    userProfile = request.user.userprofile.GetProfilePic
    userId = request.user.id
    data = {
        "username": username,
        "userProfile": userProfile,
        "userID": userId
    }

    return JsonResponse(data)


@login_required
def GetPM(request, upto, friendID):
    MessagesList = Messages.objects.all().filter(code="".join(sorted(list(str(request.user.id) + str(friendID)))))

    while True:
        try:
            qs = MessagesList[0: int(upto)]
            break
        except IndexError:
            upto = int(int(upto) - 1)

    message_list = [{"user": str(x.user1), "userProfile": x.user1.userprofile.GetProfilePic, "userID": x.user1.id, "id": x.id, "content": x.content, "image": x.ImageURL, "video":
                    x.VideoURL, "date": x.date_time} for x in qs]
    data = {
        'response': message_list
    }
    return JsonResponse(data)

@login_required
def GetGM(request, upto):
    upto = upto
    while True:
        try:
            qs = GlobalMessage.objects.all()[0: int(upto)]
            break
        except IndexError:
            upto = int(int(upto) - 1)
    messages_list = [{"userID": x.user.id, "id": x.id, "content": x.content, "user": str(x.user), "userProfile": x.user.userprofile.GetProfilePic, "image": x.ImageURL, "video": x.VideoURL, "date": x.date_time} for x in qs]
    data = {
        "response": messages_list
    }
    return JsonResponse(data)


def NewMessage(user1, user2, messageId):
    if user2 == "global":
        MessagesList = GlobalMessage.objects.all()
        if int(messageId) != MessagesList[0].id:
            if str(MessagesList[0].user) != user1:
                return True
            else:
                return False
        else:
            return False
    else:
        MessagesList = Messages.objects.all().filter(code="".join(sorted(list(str(user1) + str(user2)))))
        try:
            if int(messageId) != MessagesList[0].id:
                if str(MessagesList[0].user1 != user1):
                    return True
                else:
                    return False
            else:
                return False
        except:
            if int(messageId) != MessagesList[0].id:
                if str(MessagesList.user1) != user1:
                    return True
                else:
                    return False
            else:
                return False


def UpdateUserLastRequest(userTar):
    currentTime = timezone.now()
    userP = UserProfile.objects.get(user=userTar)
    userP.lastRequest = currentTime
    userP.save()


def IsActive(user):
    now = user.userprofile.lastRequest
    now1 = timezone.now()
    current = now1 - now
    if current.seconds > 10:
        return False
    else:
        return True


def GetUsers():
    return [{"username": str(x), "id": x.id, 'image': x.userprofile.GetProfilePic, "active": IsActive(x), } for x in User.objects.all()]


@login_required
def Gateway(request, messageId, friendId):
    UpdateUserLastRequest(request.user)
    user1 = request.user.id
    user2 = friendId

    data = {
        "users": GetUsers(),
        "new_message": NewMessage(user1, user2, messageId)
    }

    return JsonResponse(data)


@login_required
def addMessage(request, receiver):
    if receiver != "global":
        form = MessageForm(request.POST or None, request.FILES or None)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.user1 = request.user
            obj.user2 = User.objects.get(id=int(receiver))
            obj.code = "".join(sorted(list(str(obj.user1.id) + str(obj.user2.id))))
            obj.date_time = date.today()
            obj.save()
            if request.is_ajax():
                return JsonResponse({}, status=201)
    else:
        form = GlobalMessageForm(request.POST or None, request.FILES or None)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.user = request.user
            obj.date_time = date.today()
            obj.save()
            if request.is_ajax():
                return JsonResponse({}, status=201)
