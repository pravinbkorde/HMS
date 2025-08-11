from django.db import models
from django.db import transaction
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password


class User(AbstractUser):
    ROLE_CHOICES = (
        ('superadmin', 'Super Admin'),
        ('admin', 'Admin'),
        ('receptionist', 'Receptionist'),
        ('doctor', 'Doctor'),
    )
    role = models.CharField(max_length=20,choices=ROLE_CHOICES)

class SuperAdmin(models.Model):
    superadmin_id = models.CharField(max_length=50, unique=True, blank=True)
    username = models.CharField(max_length=100, unique=True, blank=True)
    email = models.EmailField(unique=True, blank=True)
    password = models.CharField(max_length=128)  # hashed passwords are long
    role = models.CharField(max_length=20, editable=False, default='superadmin')

    def generate_superadmin_id(self):
        with transaction.atomic():
            last_superadmin = SuperAdmin.objects.all().order_by('superadmin_id').last()
            
            if last_superadmin:
                # Get the number part of the last patient_id
                last_id = int(last_superadmin.patient_id.split('-')[1])
                new_id = f"SUP-{str(last_id + 1).zfill(3)}"  # Example: PAT-001, PAT-002, etc.
            else:
                new_id = "SUP-001"
            
            return new_id

    def save(self, *args, **kwargs):
        # Ensure password is hashed only once
        if not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)

        self.role = 'superadmin'

        if not self.superadmin_id:
            self.superadmin_id = self.generate_patient_id()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username


class AllUser(models.Model):
    centerName = models.CharField(max_length=100, blank=True,null=True)
    username = models.CharField(max_length=100,unique=True,blank=False)
    email = models.EmailField(unique=True,blank=False)
    password = models.CharField(max_length=500,blank=False)
    role =models.CharField(max_length=20,null=False,blank=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    restricted = models.BooleanField(default=False, null=True,blank=True)
    managePassowrd = models.CharField(max_length=100,blank=True, null=True)

    

    def __str__(self):
        return f"{self.username}"


class PatientsInfo(models.Model):
    user = models.ForeignKey("AllUser",on_delete=models.CASCADE,related_name='patients',blank=True, null=True)
    patient_id = models.CharField(max_length=20, unique=True, blank=True)
    first_name = models.CharField(max_length=100, null=False, blank=False)
    middle_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=False, blank=False)
    address = models.TextField()
    gender = models.CharField(max_length=10)
    mobile_number = models.CharField(max_length=15, null=False, blank=False)
    dob = models.DateField()
    blood_group = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField()

    def generate_patient_id(self):
        # Using transaction to ensure atomic operation for concurrent requests
        with transaction.atomic():
            last_patient = PatientsInfo.objects.all().order_by('patient_id').last()
            
            if last_patient:
                # Get the number part of the last patient_id
                last_id = int(last_patient.patient_id.split('-')[1])
                new_id = f"PAT-{str(last_id + 1).zfill(3)}"  # Example: PAT-001, PAT-002, etc.
            else:
                new_id = "PAT-001"
            
            return new_id
    
    def save(self, *args, **kwargs):
        # Automatically generate a patient_id before saving the object
        if not self.patient_id:
            self.patient_id = self.generate_patient_id()

        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.patient_id}"


class Doctor(models.Model):
    DOCTOR_TYPE_CHOICES = [
        ('consulting', 'Consulting Doctor'),
        ('referring', 'Referring Doctor'),
    ]

    doctor_id = models.CharField(max_length=10, unique=True, blank=True)
    doctor_type = models.CharField(max_length=10, choices=DOCTOR_TYPE_CHOICES)
    
    # User login
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctor_profile', null=True, blank=True)
    
    # Admin who created this doctor
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='created_doctors', limit_choices_to={'role': 'admin'})

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    address = models.TextField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.doctor_id:
            last_doctor = Doctor.objects.order_by('-id').first()
            last_id = int(last_doctor.doctor_id.replace('DOC', '')) if last_doctor and last_doctor.doctor_id else 0
            self.doctor_id = f'DOC{last_id + 1:04d}'
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Dr. {self.first_name} {self.last_name} ({self.get_doctor_type_display()})"


class IPD(models.Model):
    ipd_id = models.CharField(max_length=20, unique=True, blank=True)
    patient = models.ForeignKey(PatientsInfo, on_delete=models.CASCADE, null=True, blank=True)
    doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='created_ipds', limit_choices_to={'role': 'admin'})
    admission_date = models.DateTimeField(auto_now_add=True)
    discharge_date = models.DateTimeField(null=True, blank=True)
    reason_for_admission = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    def generate_ipd_id(self):
        with transaction.atomic():
            last_ipd = IPD.objects.order_by('-id').first()
            last_num = 0
            if last_ipd and last_ipd.ipd_id:
                try:
                    last_num = int(last_ipd.ipd_id.split('-')[1])
                except:
                    pass
            return f"IPD-{str(last_num + 1).zfill(4)}"

    def save(self, *args, **kwargs):
        if not self.ipd_id:
            self.ipd_id = self.generate_ipd_id()
        super().save(*args, **kwargs)





class Patient(models.Model):
    GENDER_CHOICES = [
        ("Male", "Male"),
        ("Female", "Female"),
        ("Other", "Other"),
    ]

    MARITAL_STATUS_CHOICES = [
        ("Single", "Single"),
        ("Married", "Married"),
    ]

    BLOOD_GROUP_CHOICES = [
        ("A+", "A+"), ("A-", "A-"), ("B+", "B+"), ("B-", "B-"),
        ("AB+", "AB+"), ("AB-", "AB-"), ("O+", "O+"), ("O-", "O-"),
    ]
    user = models.ForeignKey("AllUser",on_delete=models.CASCADE,blank=True, null=True)
    patientName = models.CharField(max_length=100)
    guardianName = models.CharField(max_length=100, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    dob = models.DateField()
    age = models.PositiveIntegerField()
    bloodGroup = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICES, blank=True, null=True)
    maritalStatus = models.CharField(max_length=10, choices=MARITAL_STATUS_CHOICES, blank=True, null=True)
    phone = models.CharField(max_length=15)
    email = models.EmailField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    remark = models.TextField(blank=True, null=True)
    nid = models.CharField(max_length=20, unique=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.patientName
    

class OPD(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    opd_id = models.CharField(max_length=20, unique=True, blank=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=True, blank=True)
    doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True)
    consultation_date = models.DateTimeField(auto_now_add=True)
    symptoms = models.TextField(blank=True, null=True)
    create_date= models.DateTimeField(auto_now_add=True, null=True,blank=True)

    def generate_opd_id(self):
        last = OPD.objects.order_by('id').last()
        num = int(last.opd_id.split('-')[1]) if last and last.opd_id else 0
        return f"OPD-{num + 1:04d}"

    def save(self, *args, **kwargs):
        if not self.opd_id:
            self.opd_id = self.generate_opd_id()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.opd_id} - {self.patient.patientName}"
