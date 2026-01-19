from rest_framework import serializers
from .models import JobApplication, StatusHistory

class StatusHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusHistory
        fields = '__all__'

class JobApplicationSerializer(serializers.ModelSerializer):
    history = StatusHistorySerializer(many=True, read_only=True)
    
    class Meta:
        model = JobApplication
        fields = '__all__'
        read_only_fields = ('user', 'last_updated')

    def create(self, validated_data):
        # Automatically assign current user
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
