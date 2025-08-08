from django.urls import path
from . import api

urlpatterns = [
    path('',api.conversations_list,name="api_convestaion_list"),
    path('<uuid:pk>/',api.conversations_detail,name="api_convestaion_detail"),
    path('start/<uuid:user_id>/',api.conversations_start,name="api_convestaion_start")
]
