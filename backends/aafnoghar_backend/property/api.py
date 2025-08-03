from django.http import JsonResponse

from rest_framework.decorators import api_view,  parser_classes, authentication_classes, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Reservation

from .forms import PropertyForm
from .models import Property
from .serializer import PropertiesListSerializers, PropertyDetailSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def properties_list(request):
    properties = Property.objects.all()
    
    landlord_id = request.GET.get('landlord_id','')
    if landlord_id:
        properties = properties.filter(landlord_id=landlord_id)
    

    serializer = PropertiesListSerializers(properties, many=True)
    
    return JsonResponse({
        'data':serializer.data
    })
    
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def create_property(request):
    form = PropertyForm(request.POST, request.FILES)
    
    if form.is_valid():
        property = form.save(commit = False)
        property.landlord = request.user
        property.save()
        
        return JsonResponse({"success": True})
    else:
        print('error', form.errors, form.non_field_errors )
        return JsonResponse({'errors': form.errors.as_json()},status = 400)  
    
    

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def properties_detail(request,pk):
    property = Property.objects.get(pk=pk)
    
    serializer = PropertyDetailSerializer(property, many = False)
    
    return JsonResponse(serializer.data)

@api_view(['POST'])
def book_property(request,pk):
    try:
        guests = request.POST.get('guests')
        renter = request.POST.get('renter')
        profession = request.POST.get('profession')
        
        property_obj = Property.objects.get(pk=pk)
        
        Reservation.objects.create(
            property = property_obj,
            guests=guests,
            renter=renter,
            profession=profession,
            created_by = request.user    
        )
        
        return JsonResponse({'success':True})
    except Exception as e:
        print("Error", e)
        
        return JsonResponse({'success':False})
    

@api_view(['POST'])
def toggle_favorite(request,pk):
    property = Property.objects.get(pk=pk)
    
    if request.user in property.favorited.all():
        property.favorited.remove(request.user)
        
        return JsonResponse({'is_favorite': False})
    else :
        property.favorited.add(request.user)
        
        return JsonResponse({'is_favorited': True})