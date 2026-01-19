from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Custom User model to handle Role-based access.
    Inherits from AbstractUser which already provides:
    username, password, email, first_name, last_name, is_staff, is_active, date_joined
    """
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True, null=True)
    
    # We can use groups/permissions for roles, or simple boolean flags/choices
    # User Roles: 'admin', 'user' (default)
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')

    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username
