from rest_framework import serializers

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