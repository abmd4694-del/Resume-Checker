from django.db import models
from django.conf import settings

class Resume(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='resumes')
    file = models.FileField(upload_to='resumes/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    # Parsing Results
    extracted_text = models.TextField(blank=True, null=True)
    skills_detected = models.JSONField(blank=True, null=True) # e.g. ["Python", "Django", "React"]
    experience_summary = models.TextField(blank=True, null=True)
    
    # Score
    ats_score = models.IntegerField(default=0)
    
    def __str__(self):
        return f"Resume of {self.user.username} ({self.uploaded_at.date()})"
