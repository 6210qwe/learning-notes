from django.urls import path
from sec2 import views


urlpatterns = [
    # 获取服务器的时间 3 html 3 api
    path('lesson1_server_time', views.lesson1_server_time),
    path('lesson1_1', views.lesson1_1),
    path('lesson1_1_data_api', views.lesson1_1_data_api),
    path('lesson1_2', views.lesson1_2),
    path('lesson1_2_data_api', views.lesson1_2_data_api),
    path('lesson1_3', views.lesson1_3),
    path('lesson1_3_data_api', views.lesson1_3_data_api),

    path('lesson2', views.lesson2),
    path('lesson2_data_api', views.lesson2_data_api),

    path('lesson3', views.lesson3),
    path('lesson3_data_api', views.lesson3_data_api),

    path('lesson4', views.lesson4),
    path('lesson4_data_api', views.lesson4_data_api),

    path('lesson6', views.lesson6),
    path('lesson6_data_api', views.lesson6_data_api),

    path('lesson9', views.lesson9),
    path('lesson9_data_api', views.lesson9_data_api),
    
    # 这个验证接口应该由安全开发来书写
    path('lesson9_data_check_api', views.lesson9_data_check_api),
]