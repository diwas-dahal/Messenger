from django import forms
from .models import *
from django.contrib.auth.forms import UserCreationForm


class MessageForm(forms.ModelForm):
    class Meta:
        model = Messages
        fields = ['content', 'file']


class GlobalMessageForm(forms.ModelForm):
    class Meta:
        model = GlobalMessage
        fields = ['content', 'file']