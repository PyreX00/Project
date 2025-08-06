from rest_framework import serializers
from .models import Conversation,ConverstaionMessage


from useraccount.serializers import UserDetailSerializer

class ConverstaionListSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(many=True,read_only=True)
    
    
    class Meta:
        model = Conversation
        fields = ('id','users','modified_at')
        