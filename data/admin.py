from django.contrib import admin
from .models import *
# Register your models here.

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('user','id','parent','priority','modified')
    list_filter = ('deleted','complete')
    search_fields = ('id', 'name', 'parent__id')
    exclude = ('parent',)

admin.site.register(Project, ProjectAdmin)