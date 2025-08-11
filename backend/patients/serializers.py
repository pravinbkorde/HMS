from rest_framework import serializers
from patients.models import PatientsInfo
from django.contrib.auth.password_validation import validate_password
from .models import User, AllUser, SuperAdmin, Doctor, IPD,OPD

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=User.ROLE_CHOICES)

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords must match."})
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            role=validated_data['role']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    
class PatientFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientsInfo
        fields = [
            'first_name', 'middle_name', 'last_name', 'address',
            'gender', 'mobile_number', 'dob', 'blood_group',
            'email', 'user'
        ]
   

class PatientInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientsInfo
        fields = '__all__'

    

class AlluserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllUser
        fields = '__all__'


class SuperAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuperAdmin
        fields ='__all__'


class DoctorSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True, required=True)
    password = serializers.CharField(write_only=True, required=True)
    created_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)

    class Meta:
        model = Doctor
        fields = [
            'id', 'doctor_id', 'doctor_type', 'first_name', 'last_name',
            'phone', 'email', 'address', 'created_by', 'user',
            'username', 'password'
        ]
        read_only_fields = ['doctor_id', 'user']

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        email = validated_data.get('email')

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            role='doctor'
        )
        doctor = Doctor.objects.create(user=user, **validated_data)
        return doctor


class IPDSerializer(serializers.ModelSerializer):
    class Meta:
        model = IPD
        fields = '__all__'
        read_only_fields = ['ipd_id', 'admission_date', 'created_by']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['created_by'] = request.user
        return super().create(validated_data)

class OPDSerializer(serializers.ModelSerializer):
    class Meta:
        model = OPD
        fields = '__all__'