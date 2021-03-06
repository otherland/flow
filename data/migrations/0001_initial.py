# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-09-02 09:18
from __future__ import unicode_literals

from django.conf import settings
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('priority', models.IntegerField(default=0)),
                ('created', models.DateTimeField(auto_now_add=True, null=True)),
                ('modified', models.PositiveIntegerField(default=0)),
                ('name', models.TextField(default='')),
                ('description', models.TextField(blank=True, null=True)),
                ('complete', models.PositiveIntegerField(blank=True, null=True)),
                ('deleted', models.PositiveIntegerField(blank=True, null=True)),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='data.Project')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='projects', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['priority'],
            },
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('public_key', models.TextField(blank=True)),
                ('private_key', models.TextField(blank=True)),
                ('monthly_item_quota', models.PositiveIntegerField(default=5000)),
                ('created', models.DateTimeField(auto_now=True)),
                ('auto_hide_left_bar', models.BooleanField(default=False)),
                ('backup_to_dropbox', models.BooleanField(default=False)),
                ('show_completed', models.BooleanField(default=True)),
                ('show_keyboard_shortcuts', models.BooleanField(default=False)),
                ('font', models.PositiveIntegerField(choices=[(0, 'default')], default=0)),
                ('theme', models.PositiveIntegerField(choices=[(0, 'default')], default=0)),
                ('unsubscribe_from_summary_emails', models.BooleanField(default=True)),
                ('saved_views_json', django.contrib.postgres.fields.jsonb.JSONField(default=list)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
