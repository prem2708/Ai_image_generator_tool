from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('register/', views.register_view, name="register"),
    path('login/', views.login_view, name="login"),
    path('ai_image/', views.ai_image, name="ai_image"),
    
    path('logout/', views.logout_view, name="logout"),
    
    
]

   
