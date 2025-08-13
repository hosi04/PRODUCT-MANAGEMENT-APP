# accounts/serializers.py
from rest_framework import serializers
from .models import SimpleUser
from django.contrib.auth.hashers import make_password

class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SimpleUser
        fields = ['id', 'username', 'password', 'rule']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        # Hash password để bảo mật
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
