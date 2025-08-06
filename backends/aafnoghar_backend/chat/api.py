from django.http import JsonResponse
from rest_framework.decorators import api_view

from .models import Conversation
from .serializers import ConverstaionListSerializer

@api_view(['GET'])
def conversations_list(request):
    serializer = ConverstaionListSerializer(request.user.conversations.all(),many=True)
    
    return JsonResponse(serializer.data)