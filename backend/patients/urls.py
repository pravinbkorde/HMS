from django.urls import path
from patients import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
urlpatterns = [
    path('',views.add_patient,name='add_patient'),
    path('register/', views.register),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('get_all_patients/',views.get_all_patients,name="get_all_patients"),
    path('custom-token/',views.custome_login,name='custome_login'),
    path('logout/',views.custom_logout_view,name='custom_logout_view')
]
