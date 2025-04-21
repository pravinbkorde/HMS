from django.db import models
from django.db import transaction

class PatientsInfo(models.Model):
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
