from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from patients.serializers import PatientFormSerializer
from rest_framework import status
from patients.models import PatientsInfo, Doctor, IPD, OPD
from django.db import transaction
from patients.serializers import PatientInfoSerializer, AlluserSerializer, DoctorSerializer, IPDSerializer, OPDSerializer
from .serializers import RegisterSerializer
from django.contrib.auth import authenticate, login, logout
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
import logging
from . models import AllUser, SuperAdmin
from .permissions import IsAdmin,IsDoctor,IsReceptionist,IsSuperAdmin, IsAdminOrSuperAdmin
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
# Create your views here.
User = get_user_model()
logger = logging.getLogger('patients')



@api_view(['POST'])
@permission_classes([AllowAny])
def SuperAdminLogin(request):
    email = request.data.get("email")
    password = request.data.get("password")

    try:
        user = SuperAdmin.objects.get(email=email)

    except SuperAdmin.DoesNotExist:
        print("User not found")
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # Validate password
    if check_password(password, user.password) and user.role == 'superadmin':
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': user.username,
            'superadmin_id': user.superadmin_id,
            'role':user.role
        })
        logger.debug("Super admin login")

    print("Invalid credentials")
    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)



@api_view(['POST'])
@permission_classes([AllowAny])
def custome_login(request):
   """custome login and set the session id using the login module"""
   if request.method == 'POST':
        username = request.data.get("username")
        password = request.data.get("password")
        logger.debug("Admin Log In logged in")
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
@permission_classes([AllowAny])
def custom_logout_view(request):
    """Logs out user and clears session."""
    logout(request)  # 🔄 This logs out the user and clears sessionid
    logger.debug("User Log Out")
    return Response({'detail': 'Logged out successfully'})

 
@api_view(['POST'])
def register(request):
    # print(request.data)
    # username = request.data.get("username")
    # email = request.data.get("email")
    # password = request.data.get("password")
    # role = request.data.get("role")
    # print(username,email,password,role)
    userSerializer = AlluserSerializer(data= request.data)
    
    if userSerializer.is_valid():
        userSerializer.save()
        logger.debug("user data save")

    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        logger.debug("User Register successfully")
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdminOrSuperAdmin])
def get_all_patients(request,username):
    if request.method == 'GET':
        
        all_patients = PatientsInfo.objects.filter(user__username=username)
        serializer = PatientInfoSerializer(all_patients, many=True)
        return Response({
            "all_patients":serializer.data
        })

@api_view(['POST'])
@permission_classes([IsAdminOrSuperAdmin])
def add_patient(request):
    """Add patient under a specific user using username"""

    username = request.data.get('username')
    if not username:
        return Response({'error': 'username is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = AllUser.objects.get(username=username)
    except AllUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    # Map frontend camelCase keys to model snake_case keys
    mapped_data = {
        'first_name': request.data.get('firstName'),
        'middle_name': request.data.get('middleName'),
        'last_name': request.data.get('lastName'),
        'address': request.data.get('address'),
        'gender': request.data.get('gender'),
        'mobile_number': request.data.get('mobile'),
        'dob': request.data.get('dob'),
        'blood_group': request.data.get('bloodGroup'),
        'email': request.data.get('email'),
        'user': user.id,  # pass FK id here
    }

    serializer = PatientFormSerializer(data=mapped_data)
    if serializer.is_valid():
        try:
            serializer.save()
            return Response({'message': 'Form submitted successfully!'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print("Exception:", e)
            return Response({'error': 'Database error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def is_admin_user(user):
    return user.role in ['admin', 'superadmin']


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_doctor(request):
    """Function to create the doctor"""
    data = request.data.copy()
    data['created_by'] = request.user.id

    serializer = DoctorSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdminOrSuperAdmin])
def get_doctors_by_user(request, username):
    try:
        # Get all doctors created by the user with given username
        doctors = Doctor.objects.filter(created_by__username=username)
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)



@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminOrSuperAdmin])
def create_ipd(request):
    """
    Create a new IPD record with only admission info (no patient or doctor).
    """
    serializer = IPDSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()  # created_by is auto-set in serializer
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminOrSuperAdmin])
def get_ipd_ids_by_user(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)

    ipds = IPD.objects.filter(created_by=user).select_related('doctor')
    
    result = []
    for ipd in ipds:
        result.append({
            "ipd_id": ipd.ipd_id,
            "doctor": {
                "id": ipd.doctor.id if ipd.doctor else None,
                "name": f"Dr. {ipd.doctor.first_name} {ipd.doctor.last_name}" if ipd.doctor else None,
                "type": ipd.doctor.doctor_type if ipd.doctor and hasattr(ipd.doctor, 'doctor_type') else None
            }
        })

    return JsonResponse({"ipds": result})


@api_view(['PATCH'])
@permission_classes([IsAuthenticated, IsAdminOrSuperAdmin])
def assign_patient_doctor(request, ipd_id):
    try:
        ipd = IPD.objects.get(ipd_id=ipd_id)
    except IPD.DoesNotExist:
        return Response({"detail": "IPD not found"}, status=404)

    serializer = IPDSerializer(ipd, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_opd(request):
    user = request.user
    print(user)
    doctor_id = request.data.get("doctor")

    if not doctor_id:
        return Response({'error': 'Doctor ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        doctor = Doctor.objects.get(id=doctor_id)
    except Doctor.DoesNotExist:
        return Response({'error': 'Doctor not found.'}, status=status.HTTP_404_NOT_FOUND)

    # Create OPD
    opd = OPD.objects.create(
        user=user,
        doctor=doctor
        # patient is not added yet
    )

    serializer = OPDSerializer(opd)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_opds(request):
    user = request.user
    opds = OPD.objects.filter(user=user).order_by('-create_date')

    data = []
    for opd in opds:
        if opd.doctor:
            doctor_name = f"Dr. {opd.doctor.first_name} {opd.doctor.last_name}"
            doctor_type = opd.doctor.doctor_type
        else:
            doctor_name = None
            doctor_type = None

        data.append({
            'opd_id': opd.opd_id,
            'doctor_name': doctor_name,
            'doctor_type': doctor_type,
            'create_date': opd.create_date,
        })

    return Response(data)


@api_view(['POST'])
def register_patient(request):
    """Function to register the patient under the admin"""
    if request.method == "POST":
        logger.debug("register_patient endpoint hit")
        print("🔵 Patient Data Received:")
        
        # Print all key-value pairs
        for key, value in request.data.items():
            print(f"{key}: {value}")

        return Response({"message": "Patient data received"}, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_admin(request):
    """Send all the Admin data to frontend for super admin"""
    All_admin = AllUser.objects.filter(role="admin").values("centerName","username","email",'password',"restricted","managePassowrd","created_at","id")
    # print(All_admin)

    return Response({
        "admins":list(All_admin)
    })


@api_view(["GET","POST"])
@permission_classes([AllowAny])
def restrict_admin(request):
    print("URL Hit")
    print("Data received:", request.data)  # This will show the data sent from frontend
    admin_id = request.data.get("id")
    value_restrict = request.data.get("restricted")
    get_admin = AllUser.objects.filter(id=admin_id)
    return Response({
        "message": "Hit",
    }, status=status.HTTP_200_OK)