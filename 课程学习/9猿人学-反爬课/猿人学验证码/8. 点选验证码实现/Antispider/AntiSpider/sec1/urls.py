from django.urls import path
from sec1 import views


urlpatterns = [
    path('lesson3', views.lesson3),
    path('lesson3_2', views.lesson3_2),
    path('lesson4', views.lesson4),
    path('lesson5', views.lesson5),
    path('lesson5_data_api', views.lesson5_data_api),
    path('lesson6', views.lesson6),
    path('lesson6_data_api', views.lesson6_data_api),
]