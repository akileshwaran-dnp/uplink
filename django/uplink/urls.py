from django.urls import path
from rest_framework.routers import DefaultRouter

from .views.stats_views import StatsViews
from .views.docs_views import DocsViewsSets
from .views.signup_view import SignUpView
from .views.signin_view import login_user, logout_user


# document related views
# docs/ => list
# docs/id => retrive
# docs/ => create POST
router = DefaultRouter()
router.register('docs', DocsViewsSets, basename='user')


urlpatterns = [

    # statistics
    path('stats/total', StatsViews.as_view({'get': 'aggregate_stats'})),
    path('stats/type', StatsViews.as_view({'get': 'filetype_stats'})),
    path('stats/user', StatsViews.as_view({'get': 'userwise_stats'})),

    # authentication
    path('auth/signin', login_user),
    path('auth/signout', logout_user),
    path('auth/signup', SignUpView.as_view(), name='signup'),

]

urlpatterns += router.urls
