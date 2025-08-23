from django.forms import ModelForm
from .models import Property

class PropertyForm(ModelForm):
    class Meta:
        model = Property
        fields = (
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
        ) 