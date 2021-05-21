from django.urls import path
from . import views
from rest_framework import routers
from django.conf.urls import include, url
from django.conf import settings
from django.views.static import serve

# the application API routes
router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'user')
router.register(r'workers', views.WorkerView, 'worker')
router.register(r'cars', views.CarView, 'car')
router.register(r'my-business', views.MyBusinessView, 'my-business')
router.register(r'reports', views.ReportView, 'report')
router.register(r'costumers', views.CostumerView, 'costumer')
router.register(r'projects', views.ProjectView, 'project')
#router.register(r'projects-files', views.ProjectFileView, 'projects-files')

urlpatterns = [
    path('api/', include(router.urls)),
    url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT, })
]
