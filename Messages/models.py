from django.db import models

# Create your models here.
from django.db import models
from datetime import datetime

from django.contrib.auth.models import User
# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    userImage = models.FileField(blank=True, null=True)
    lastRequest = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return str(self.user)

    @property
    def GetProfilePic(self):
        profile_pic = ""
        try:
            profile_pic = self.userImage.url
        except:
            profile_pic = 'https://png.pngtree.com/png-clipart/20200224/original/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_5247852.jpg'
        return profile_pic


class Messages(models.Model):
    content = models.TextField(max_length=2000, blank=True, null=True)
    user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages', null=True, blank=True)
    user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user2', null=True, blank=True)
    code = models.IntegerField(null=True, blank=True)
    date_time = models.DateTimeField(auto_now_add=True, blank=True)
    file = models.FileField(blank=True, null=True)
    # image = models.ImageField(blank=True, null=True)
    # video = models.FileField(upload_to='videos/', null=True, blank=True, verbose_name="")

    def __str__(self):
        result = ""
        if self.content == "":
            try:
                result = self.file.url
                return result
            except:
                result = self.content
                return result
        return self.content

    class Meta:
        ordering =['-id']

    @property
    def ImageURL(self):
        try:
            if self.file.url.endswith('.png') or self.file.url.endswith('.jpeg') or self.file.url.endswith('.jpg'):
                return self.file.url
            else:
                return False
        except:
            return False

    @property
    def VideoURL(self):
        try:
            if self.file.url.endswith('.mp4') or self.file.url.endswith('.mp3') or self.file.url.endswith('.avi'):
                return self.file.url
            else:
                return False
        except:
            return False


class GlobalMessage(models.Model):
    content = models.TextField(max_length=2000, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    date_time = models.DateTimeField(auto_now_add=True, blank=True)
    file = models.FileField(blank=True, null=True)
    # image = models.ImageField(blank=True, null=True)
    # video = models.FileField(upload_to='videos/', null=True, blank=True, verbose_name="")

    def __str__(self):
        result = ""
        if self.content == "":
            try:
                result = self.file.url
                return result
            except:
                result = self.content
                return result
        return self.content

    class Meta:
        ordering = ['-id']

    @property
    def ImageURL(self):
        try:
            if self.file.url.endswith('.png') or self.file.url.endswith('.jpeg') or self.file.url.endswith('.jpg'):
                return self.file.url
            else:
                return False
        except:
            return False

    @property
    def VideoURL(self):
        try:
            if self.file.url.endswith('.mp4') or self.file.url.endswith('.mp3') or self.file.url.endswith('.avi'):
                return self.file.url
            else:
                return False
        except:
            return False

