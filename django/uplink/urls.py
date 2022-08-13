from django.urls import path
# from .views.views import *
from .views.auth_views import *
from .views.stats_views import *
from .views.docs_views import *

# urlpatterns = [
#     path('auth/signin', SigInViews.as_view(), name='signin'),
#     path('auth/signup', SignUpViews.as_view(), name='signup'),
#     path('files/history', DocsViews.as_view({'get': 'history'})),
#     path('files/upload', DocsViews.as_view({'post': 'document'})),
#     path('files/save', DocsViews.as_view({'get': 'save_doc'})),
#     path('stats/total', StatisticsView.as_view({'get': 'get_total_stats'})),
#     path('stats/type', StatisticsView.as_view({'get': 'get_type_stats'})),
#     path('stats/user', StatisticsView.as_view({'get': 'get_user_stats'}))
# ]


urlpatterns = [

    # statistics
    path('stats/total', StatsViews.as_view({'get': 'aggregate_stats'})),
    path('stats/type', StatsViews.as_view({'get': 'filetype_stats'})),
    path('stats/user', StatsViews.as_view({'get': 'userwise_stats'})),

    # authentication
    path('auth/signin', SigInViews.as_view(), name='signin'),
    path('auth/signup', SignUpViews.as_view(), name='signup'),

    # document
    path('files/history', DocsViews.as_view({'get': 'docs_history'})),
    path('files/save', DocsViews.as_view({'get': 'download_doc'})),
    path('files/upload', DocsViews.as_view({'post': 'create_doc'})),
]
