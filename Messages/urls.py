from django.urls import path, include
from . import views

# code

urlpatterns = [
    path('', views.homePage, name="home"),
    path('ClientInfo/', views.ClientInfo),
    path('jsonInfo/<str:upto>/<str:friendID>/', views.GetPM),
    path('jsonInfo/<str:upto>/', views.GetGM),
    path('GateWay/<str:messageId>/<str:friendId>/', views.Gateway),
    path('add-message/<str:receiver>/', views.addMessage),
]