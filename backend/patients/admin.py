from django.contrib import admin
# username = Korde Password = Korde@123
from django.contrib import admin
from .models import User, PatientsInfo,AllUser, SuperAdmin, Doctor, IPD
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class AdminSuperAdmin(admin.ModelAdmin):
    list_display= ('superadmin_id','username','email','role','password')
    search_fields =("username","email")

admin.site.register(SuperAdmin,AdminSuperAdmin)


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

class AlluserAdmin(admin.ModelAdmin):
    list_display=("username","email","password","role")
    search_fields = ("username","email")
admin.site.register(AllUser,AlluserAdmin)

class DocotrAdmin(admin.ModelAdmin):
    list_display=('doctor_id','doctor_type','first_name','last_name','phone','email','address')
    search_fields = ('doctor_id','first_name','doctor_type','email')
admin.site.register(Doctor,DocotrAdmin)


class IPDAdmin(admin.ModelAdmin):
    list_display = ("ipd_id","patient","doctor","created_by","admission_date","discharge_date","reason_for_admission","notes")
    search_fields =("ipd_id","doctor","created_by")
admin.site.register(IPD,IPDAdmin)