from django.db import models
from django.conf import settings

class Company(models.Model):
    name = models.CharField(max_length=255)
    website = models.URLField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return self.name

class JobApplication(models.Model):
    STATUS_CHOICES = (
        ('applied', 'Applied'),
        ('interviewing', 'Interviewing'),
        ('offer', 'Offer'),
        ('rejected', 'Rejected'),
        ('accepted', 'Accepted'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='job_applications')
    company = models.CharField(max_length=255) # Simple CharField for now, can perform lookup later
    position = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='applied')
    salary_range = models.CharField(max_length=100, blank=True, null=True)
    
    date_applied = models.DateField()
    last_updated = models.DateTimeField(auto_now=True)
    
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.position} at {self.company} ({self.status})"

class StatusHistory(models.Model):
    job = models.ForeignKey(JobApplication, on_delete=models.CASCADE, related_name='history')
    old_status = models.CharField(max_length=20, choices=JobApplication.STATUS_CHOICES)
    new_status = models.CharField(max_length=20, choices=JobApplication.STATUS_CHOICES)
    changed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.job} changed from {self.old_status} to {self.new_status}"
