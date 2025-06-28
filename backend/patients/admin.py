from django.contrib import admin
# username = spark Passwrod = Spark@123
from django.contrib import admin
from .models import User, PatientsInfo
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class CustomUserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Role Info', {'fields': ('role',)}),
    )

    list_display = BaseUserAdmin.list_display + ('role',)

admin.site.register(User, CustomUserAdmin)

# Register your models here.
class PatientInfoAdmin(admin.ModelAdmin):
    list_display = (
        'patient_id',
        'first_name',
        'middle_name',
        'last_name',
        'gender',
        'dob',
        'mobile_number',
        'email',
        'blood_group',
        'address',
    )
    search_fields = ('patient_id', 'first_name', 'last_name', 'mobile_number', 'email')
    list_filter = ('gender', 'blood_group')
admin.site.register(PatientsInfo, PatientInfoAdmin)