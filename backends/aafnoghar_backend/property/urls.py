from django.urls import path
from . import api

urlpatterns = [
    path('', api.properties_list, name ='api_properties)list'),
    path('create/', api.create_property, name = 'api_create_proper'),
    path('<uuid:pk>/',api.properties_detail,name='api_property_detail')
]
