from rest_framework import viewsets
from rest_framework.response import Response
from django.db.models import Count

from ..models import Docs


class StatsViews(viewsets.ViewSet):
    def aggregate_stats(self, request):
        res = Response()
        total_count = Docs.objects.count()
        res.data = total_count
        return res

    def filetype_stats(self, request):
        res = Response()
        type_count = Docs.objects.values('filetype').annotate(
            count=Count('filetype')).order_by('filetype')
        res.data = type_count
        return res

    def userwise_stats(self, request):
        res = Response()
        user_count = Docs.objects.values('username').annotate(
            count=Count('filename')).order_by('username')
        res.data = user_count
        return res
