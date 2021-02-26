from django.urls import path, include
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.loginPage, name='login'),
    path('logout/', views.logoutUser, name='logout'),
    path('UserProfile/', views.UserProfilePage, name="userProfile"),
    path('UserProfile/updateUserProfile/', views.UserProfileUpdate, name="userProfileUpdate")
]