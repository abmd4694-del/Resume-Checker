from rest_framework import views, permissions
from rest_framework.response import Response
from django.db.models import Count
from jobs.models import JobApplication
from django.utils import timezone
from datetime import timedelta

class AnalyticsView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        
        # Status Distribution
        status_counts = JobApplication.objects.filter(user=user).values('status').annotate(count=Count('status'))
        
        # Weekly Progress (Applications in last 7 days)
        one_week_ago = timezone.now().date() - timedelta(days=7)
        weekly_apps = JobApplication.objects.filter(user=user, date_applied__gte=one_week_ago).count()
        
        return Response({
            "status_distribution": status_counts,
            "weekly_applications": weekly_apps,
            "total_applications": JobApplication.objects.filter(user=user).count()
        })
