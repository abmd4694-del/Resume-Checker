from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Resume
from .serializers import ResumeSerializer
from .utils import parse_resume

class ResumeViewSet(viewsets.ModelViewSet):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Save first to get the file path
        resume = serializer.save(user=self.request.user)
        
        # Trigger Parsing
        if resume.file:
            result = parse_resume(resume.file.path)
            
            if "error" not in result:
                resume.extracted_text = result['text']
                resume.skills_detected = result['skills']
                resume.ats_score = result['score']
                resume.save()
