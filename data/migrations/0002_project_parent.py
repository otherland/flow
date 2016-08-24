# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='parent',
            field=models.ForeignKey(related_name='children', blank=True, to='data.Project', null=True),
        ),
    ]
