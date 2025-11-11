from django.urls import path
from sec3 import views, views2

urlpatterns = [
    path('lesson1', views.lesson1),
    path('lesson1_data_api', views.lesson1_data_api),

    path('lesson3', views.lesson3),
    path('lesson3_data_api', views.lesson3_data_api),

    path('lesson4', views2.lesson4),
    path('lesson4_data_api', views2.lesson4_data_api),

    path('lesson5', views2.lesson5),
    path('lesson5_data_api', views2.lesson5_data_api),

]