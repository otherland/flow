from __future__ import unicode_literals

from django.db import models
import uuid
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save
from django.contrib.postgres.fields import JSONField
# import the logging library
import logging

# Get an instance of a logger
logger = logging.getLogger('django')


User = settings.AUTH_USER_MODEL


def generate_referral():
	pass

class ProjectManager(models.Manager):
		def get_queryset(self):
			return super(ProjectManager, self).get_queryset().filter(deleted__isnull=True)

		def deleted(self):
			return super(ProjectManager, self).get_queryset().exclude(deleted__isnull=True)

class Project(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	parent = models.ForeignKey('Project', related_name='children', blank=True, null=True)

	user = models.ForeignKey(User, related_name='projects')
	priority = models.IntegerField(default=0)
	created = models.DateTimeField(auto_now_add=True, null=True)
	modified = models.PositiveIntegerField(default=0)

	name = models.TextField(default='')
	description = models.TextField(blank=True, null=True)
	complete = models.PositiveIntegerField(blank=True, null=True)
	deleted = models.PositiveIntegerField(blank=True, null=True)

	# share_data = models.ForeignKey(ShareData)
	objects = ProjectManager()

	class Meta:
		ordering = ['priority']

	@property
	def siblings(self):
		if self.parent == None:
			return Project.objects.filter(parent=None).exclude(id=self.id)
		else:
			return self.parent.children.all()

	def __str__(self):
		return "{}: {}".format(self.name, self.id)



class UserProfile(models.Model):
		FONT_CHOICES = enumerate([
			'default',
		])
		THEME_CHOICES = enumerate([
			'default',
		])
		user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
		# referral = models.CharField(default=generate_referral(), max_length=255)
		public_key = models.TextField(blank=True)
		private_key = models.TextField(blank=True)

		monthly_item_quota = models.PositiveIntegerField(default=5000)
		created = models.DateTimeField(auto_now=True)
		auto_hide_left_bar = models.BooleanField(default=False)
		backup_to_dropbox = models.BooleanField(default=False)
		show_completed = models.BooleanField(default=True)
		show_keyboard_shortcuts = models.BooleanField(default=False)
		font = models.PositiveIntegerField(default=0, choices=FONT_CHOICES)
		theme = models.PositiveIntegerField(default=0, choices=THEME_CHOICES)
		unsubscribe_from_summary_emails = models.BooleanField(default=True)
		saved_views_json = JSONField(default=list)

class Transaction(models.Model):
		user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')



def get_tree(user_id):
	def serialize(project):
		data = {
			'id': str(project['id']),
			'nm': project['name'],
		}
		if project['modified']:
			data['lm'] = project['modified']
		if project['description']:
			data['no'] = project['description']
		if project['complete']:
			data['cp'] = project['complete']
		if project.get('children'):
			data['ch'] = project['children']

		return data

	def recurse(project, project_id):
		if project != None and len(project.get('children', [])) > 0:
			new_children = []
			for child_id in project['children']:
				recurse(flat[child_id], child_id)
				new_children.append(flat[child_id])
				flat[child_id] = None
			new_children = sorted(new_children, key=lambda k: k.get('priority', 0))
			project['children'] = [serialize(child) for child in new_children]

	all = Project._default_manager.filter(user_id=user_id).values('name', 'parent_id', 'modified', 'description', 'complete', 'priority', 'id')
	flat = {k['id'] : k for k in all}
	tree = {}

	# I'm a child, store my id on my parent with my siblings' ids
	for key in flat:
		project = flat[key]
		parentid = project.get('parent_id', None)
		if not parentid:
			continue
		if flat.get(parentid, False) != False:
			flat[parentid].setdefault('children',[]).append(key)
		else:
			flat[key] = None

	for key in flat:
		project = flat[key]
		if project != None and project.get('parent_id', None) == None:
			recurse(project=project, project_id=key)

	top_sort = sorted([flat[key] for key in flat if flat[key]], key=lambda k: k.get('priority', 0))
	tree = [serialize(p) for p in top_sort]
	return tree

def get_transaction_timestamp(date_joined=1414319969):
	import time
	current_milli_time = lambda: int(round(time.time() * 1000))
	return (current_milli_time() / 1000 - date_joined)

@receiver(pre_save, sender='data.Project')
def update_sibling_priority(sender, instance, **kwargs):
	siblings = instance.siblings
	try:
		# updating
		old = Project.objects.get(pk=instance.id)

		if instance.parent_id != old.parent_id:
				"""
				if the project's parent changed, lower the old siblings that were higher than it
				"""
				old_siblings = old.siblings.filter(priority__gte=old.priority)
				old_siblings.update(priority=models.F('priority')-1)

				"""
				Lower new siblings
				1
				- > 2
				2 > 3
				3 > 4
				4 > 5
				"""
				siblings = siblings.filter(priority__gte=instance.priority)
				siblings.update(priority=models.F('priority')+1)


		elif instance.priority < old.priority:
				"""
				if the project moved up (lower number)
				1 > 2
				2 > 3
				3 > 1
				4
				"""
				siblings = siblings.filter(priority__lt=old.priority, priority__gte=instance.priority)
				siblings.update(priority=models.F('priority')+1)

		elif instance.priority > old.priority:
				"""
				if the project moved down (higher number)
				1
				2 > 4
				3 > 2
				4 > 3
				"""
				siblings = siblings.filter(priority__gt=old.priority, priority__lte=instance.priority)
				siblings.update(priority=models.F('priority')-1)



	except Project.DoesNotExist:
		# project doesn't exist yet, increment new siblings
		siblings = siblings.filter(priority__gte=instance.priority)
		siblings.update(priority=models.F('priority')+1)

@receiver(post_save, sender='auth.User')
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
