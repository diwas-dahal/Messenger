from django.shortcuts import render, redirect
from .forms import CreateUserForm, UpdateUserProfilePic
from django.contrib import messages
from .decorators import *
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from Messages.models import UserProfile
from django.contrib.auth.models import User
from django.http import JsonResponse
import os
# Create your views here.


def createCustomer(user):
    customer = UserProfile(user=user)
    customer.save()


@csrf_exempt
@unauthenticated_User
def register(request):
    form = CreateUserForm()
    if request.method == "POST":
        user, email, password1, password2 = request.POST['Username'], request.POST['Email'], request.POST['Password1'], request.POST['Password2']
        form = CreateUserForm({"username": user, "email": email, "password1": password1, "password2": password2})
        if form.is_valid():
            form.save()
            newuser = User.objects.get(username=user, email=email)
            createCustomer(newuser)
            messages.success(request, "Account was successfully created for " + user)
            return redirect("login")
    context = {"form": form}
    return render(request, "accounts/register.html", context)


@unauthenticated_User
def loginPage(request):
    form = CreateUserForm()
    context = {"form": form}

    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password1")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("home")
        else:
            messages.info(request, "Username or password is incorrect")
            return render(request, "accounts/login.html", context)

    return render(request, "accounts/login.html", context)


def logoutUser(request):
    if request.user.is_authenticated:
        logout(request)
        return redirect("login")
    else:
        return redirect("login")


def UserProfilePage(request):
    if request.user.is_authenticated:
        userProfile = request.user.userprofile.GetProfilePic
        username = str(request.user)
        data = {
            "username": username,
            "userProfile": userProfile
        }
        return render(request, "accounts/UserProfile.html", data)
    else:
        return redirect("login")


def UserProfileUpdate(request):
    user = request.user.userprofile
    if request.method == "POST":
        request.user.username = request.POST['user']
        request.user.save()
        form = UpdateUserProfilePic(request.POST, request.FILES, instance=user)
        if form.is_valid():
            form.save()
    return render(request, "accounts/userProfile.html")