from rest_framework import serializers
from useraccount.serializers import UserDetailSerializer

from .models import Property


class PropertiesListSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Property
        fields = [
            'id',
            'title',
            'rent',
            'image_url', 
        ]
        

class PropertyDetailSerializer(serializers.ModelSerializer):
    landlord = UserDetailSerializer(read_only=True)
    class Meta:
        model = Property
        fields = (
            'id',
            'title',
            'description',
            'rent',
            'bedroom',
            'kitchen',
            'toilet',
            'parking',
            'preferred',
            'size',
            'location',
            'no_of_people',
            'image',
            'landlord'
            
        )