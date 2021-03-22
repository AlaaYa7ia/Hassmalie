"""hashmalie URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('hassmalieapp.urls')),
    # path('', TemplateView.as_view(template_name='index.html'))
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]

# If the user types any url that's not defined in our code he will be re directed to the "home" page.
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
