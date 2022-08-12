from django.urls import path
from . views import *

urlpatterns = [
    path('auth/signin', SigInViews.as_view(), name='signin'),
    path('auth/signup', SignUpViews.as_view(), name='signup'),
    path('files/history', DocsViews.as_view({'get': 'get_history'})),
    path('files/upload', DocsViews.as_view({'post': 'post_file'})),
    path('files/save', DocsViews.as_view({'get': 'get_file'})),
    path('stats/total', StatisticsView.as_view({'get': 'get_total_stats'})),
    path('stats/type', StatisticsView.as_view({'get': 'get_type_stats'})),
    path('stats/user', StatisticsView.as_view({'get': 'get_user_stats'}))
]
