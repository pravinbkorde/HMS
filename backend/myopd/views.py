from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.serializers import ModelSerializer
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model


from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer  # or a custom one if you created it
User = get_user_model()  # ✅ This uses the custom user model


class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    print(queryset)
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer



@api_view(['GET'])
def index(request):
    # You can return JSON data in an API response
    data = {"message": "hi"}
    return Response(data)




