from rest_framework import serializers
from patients.models import PatientsInfo
from django.contrib.auth.password_validation import validate_password
from .models import User

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
    
    
class PatientFormSerializer(serializers.Serializer):
    firstName = serializers.CharField(max_length=100)
    middleName = serializers.CharField(max_length=100, allow_blank=True, required=False)
    lastName = serializers.CharField(max_length=100)
    address = serializers.CharField()
    gender = serializers.CharField()
    mobile = serializers.CharField(max_length=15)
    dob = serializers.DateField()
    bloodGroup = serializers.CharField(max_length=20)
    email = serializers.EmailField()
    consultingDoctor = serializers.CharField(max_length=100)

class PatientInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientsInfo
        fields = '__all__'