from .models import *
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from Messages.models import UserProfile
from django.forms import ModelForm


class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']


class UpdateUserProfilePic(ModelForm):
    class Meta:
        model = UserProfile
        fields = ['userImage']
