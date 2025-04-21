from django.urls import path, include
from myopd import views
urlpatterns = [
    path('lmk/',views.index,name='index')
]
