from rest_framework import serializers


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