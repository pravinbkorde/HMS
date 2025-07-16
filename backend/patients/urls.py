from django.urls import path
from patients import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
urlpatterns = [
    path('',views.add_patient,name='add_patient'),
    path('superadminlogin/',views.SuperAdminLogin,name='SuperAdminLogin'),
    path('register/', views.register),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('get_all_patients/<str:username>/',views.get_all_patients,name="get_all_patients"),
    path('custom-token/',views.custome_login,name='custome_login'),
    path('logout/',views.custom_logout_view,name='custom_logout_view'),
    path('doctors/create/', views.create_doctor),
    path('doctors/by_user/<str:username>/', views.get_doctors_by_user, name='get_doctors_by_user'),
    path('ipds/create/',views.create_ipd,name='create_ipd'),
    path('get_ipd_ids_by_user/<str:username>/',views.get_ipd_ids_by_user,name="get_ipd_ids_by_user"),
]
