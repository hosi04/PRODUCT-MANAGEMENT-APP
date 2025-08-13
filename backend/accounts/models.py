# accounts/models.py
from django.db import models

class SimpleUser(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)  # lưu password đã hash (hoặc thô nếu đơn giản)
    rule = models.CharField(max_length=50, default="staff")  # hoặc "admin", "editor" tùy nhu cầu

    def __str__(self):
        return self.username
