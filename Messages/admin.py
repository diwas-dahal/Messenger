from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(GlobalMessage)
admin.site.register(Messages)
admin.site.register(UserProfile)