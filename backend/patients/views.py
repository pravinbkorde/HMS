from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from patients.serializers import PatientFormSerializer
from rest_framework import status
from patients.models import PatientsInfo
from django.db import transaction
from patients.serializers import PatientInfoSerializer
from .serializers import RegisterSerializer
from django.contrib.auth import authenticate, login, logout
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
import logging

# Create your views here.
User = get_user_model()
logger = logging.getLogger('patients')


@api_view(['POST'])
def custome_login(request):
   """custome login and set the session id using the login module"""
   if request.method == 'POST':
        username = request.data.get("username")
        password = request.data.get("password")
        logger.debug("User logged in")
        user =authenticate(request,username=username,password =password)
        logger.info("User is authenticated")
        if user is not None:
            login(request, user)  # <- This creates the Django session

            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role': user.role,  # This uses the role from your custom User model
                'username': user.username
            })
        else:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        


@api_view(['POST'])
def custom_logout_view(request):
    """Logs out user and clears session."""
    logout(request)  # 🔄 This logs out the user and clears sessionid
    return Response({'detail': 'Logged out successfully'})

 
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    print(request.data)
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_patients(request):
    if request.method == 'GET':
        all_patients = PatientsInfo.objects.all()
        serializer = PatientInfoSerializer(all_patients, many=True)
        return Response({
            "all_patients":serializer.data
        })


@api_view(['GET','POST'])
def add_patient(request):

    """Add patients form """

    converted_data = {
        'first_name': request.data.get('firstName'),
        'middle_name': request.data.get('middleName'),
        'last_name': request.data.get('lastName'),
        'address': request.data.get('address'),
        'gender': request.data.get('gender'),
        'mobile_number': request.data.get('mobile'),
        'dob': request.data.get('dob'),
        'blood_group': request.data.get('bloodGroup'),
        'email': request.data.get('email'),
    }
    if request.method == 'POST':
        serializer = PatientFormSerializer(data=request.data)
        

        if serializer.is_valid():
            validate_data = serializer.validated_data
            # serializer.save()  #  Creates the DB record!
            # print("Saved patient:", serializer.validated_data)

            # print('Recieve for data')

            # for key, value in validate_data.items():
            #     print(f"{key}:{value}")
            
            try:
                with transaction.atomic():
                    patient = PatientsInfo.objects.create(**converted_data)
                
                return Response({'message': 'Form submitted successfully!'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                print(e)
                print("Validation failed with errors:", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

        