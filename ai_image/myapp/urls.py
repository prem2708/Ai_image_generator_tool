from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('register/', views.register_view, name="register"),
    path('login/', views.login_view, name="login"),
    path('ai_image/', views.ai_image, name="ai_image"),
    path('logout/', views.logout_view, name="logout"),
    path('generate-image/', views.generate_image, name="generate_image"),
]

    #const MODEL_URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0`;
