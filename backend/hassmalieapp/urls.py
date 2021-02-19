from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'user')
router.register(r'workers', views.WorkerView, 'worker')
router.register(r'cars/(?P<business>[0-9]+)', views.CarView, 'car')
router.register(r'my-business', views.MyBusinessView, 'my-business')
router.register(r'reports', views.ReportView, 'report')
router.register(r'costumers', views.CostumerView, 'costumer')
router.register(r'projects', views.ProjectView, 'project')

urlpatterns = [
    path('api/', include(router.urls))
]
