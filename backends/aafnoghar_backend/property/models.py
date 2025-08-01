import uuid
from django.conf import settings
from django.db import models

from useraccount.models import User

class Property(models.Model):
    
    NA = 'N'
    BIKE = 'B'
    CAR = 'C'
    
    MALE = 'M'
    FEMALE = 'F'
    FAMILY = "FL"
    ALL = "DNM"
    
    SMALL = 'SM'
    MEDIUM = 'MD'
    LARGE = "LG"
    
    PARKING_CHOICES = [
        (NA,'Not Available'),
        (BIKE, 'Bike'),
        (CAR,'Car')
    ]
    
    PREFERRED_CHOICES = [
        (MALE,'Male'),
        (FEMALE,'Female'),
        (FAMILY,'Family'),
        (ALL,'All')
    ]
    
    SIZE_CHOICES = [
        (SMALL,'Small'),
        (MEDIUM,'Medium'),
        (LARGE,'Large')
    ]
    
    
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    rent = models.PositiveIntegerField()
    bedroom = models.PositiveIntegerField()
    kitchen = models.PositiveIntegerField(null = True, blank= True)
    toilet = models.PositiveIntegerField()
    parking = models.CharField(max_length=1,  choices = PARKING_CHOICES, default=NA)
    preferred = models.CharField(max_length=3, choices = PREFERRED_CHOICES, default= ALL)
    size = models.CharField(max_length=2,  choices = SIZE_CHOICES, default=MEDIUM)
    location = models.CharField(max_length=255)
    no_of_people = models.PositiveIntegerField(null=True,blank=True)
    
    #favorited
    image = models.ImageField(upload_to='uploads/properties')
    landlord = models.ForeignKey(User, related_name='properties', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def image_url(self):
        if self.image and hasattr(self.image, 'url'):
            return f'{settings.WEBSITE_URL}{self.image.url}'
        
    
