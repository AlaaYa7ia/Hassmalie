from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'user')
router.register(r'workers', views.WorkerView, 'worker')
router.register(r'cars', views.CarView, 'car')
router.register(r'my-business', views.MyBusinessView, 'my-business')

urlpatterns = [
    path('api/', include(router.urls))
]
