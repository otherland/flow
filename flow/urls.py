"""flow URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from .views import get_settings, get_init_data, track, change_settings, push_and_poll, home

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', home, name='home'),
    url(r'^get_initialization_data/$', get_init_data, name='get_init_data'),
    url(r'^metrics/track/$', track, name='track'),
    url(r'^get_settings/$', get_settings, name='get_settings'),
    url(r'^change_settings/$', change_settings, name='change_settings'),
    url(r'^push_and_poll/$', push_and_poll, name='push_and_poll'),

]
