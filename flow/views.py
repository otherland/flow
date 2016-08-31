from django.contrib.auth.decorators import login_required
import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from django.conf import settings
from data.models import Project, get_tree
from uuid import UUID
from django.contrib.auth.models import User
from datetime import datetime
from pprint import pprint

@login_required
def home(request, template="index.html"):
		return render(request, template)

@login_required
def get_init_data(request):
		user = request.user
		rootProjectChildren = get_tree(user_id=user.id)
		month_start = datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
		month_projects = Project.objects.filter(created__gte=month_start).count()
		init_data = {'globals': [['USER_ID', str(user.id)],
		['SEND_TIMEZONE_TO_SERVER', False],
		['SHOW_COMPLETED_DEFAULT', user.profile.show_completed],
		['COHORT', '2014-10-26'],
		['EXPERIMENTS',
		{}],
		['REFERRAL_LINK', 'https://workflowy.com/?ref=281c0749'],
		['LAST_WEEKLY_REPORT', ''],
		['USER_EMAIL_ADDED', False],
		['HAS_STRIPE_CUSTOMER_ID', False],
		['HAS_ACTIVE_SUBSCRIPTION', False],
		['SUBSCRIPTION_CANCELLED', False],
		['SUBSCRIPTION_ENDS_DATE_STRING', None],
		['USER_BASE_QUOTA', 5000]],
		'projectTreeData': {'auxiliaryProjectTreeInfos': [],
		'clientId': '2016-07-14 10:19:40.580369',
		'mainProjectTreeInfo': {'dateJoinedTimestampInSeconds': 1414319969,
		'initialMostRecentOperationTransactionId': '746671802',
		'initialPollingIntervalInMs': 10000,
		'isReadOnly': False,
		'itemsCreatedInCurrentMonth': month_projects,
		'monthlyItemQuota': user.profile.monthly_item_quota,
		'ownerId': user.id,
		'rootProject': None,
		'rootProjectChildren': rootProjectChildren,
		'serverExpandedProjectsList': []}},
		'settings': {
			'auto_hide_left_bar': user.profile.auto_hide_left_bar,
			'backup_to_dropbox': user.profile.backup_to_dropbox,
			'email': user.email,
			'font': user.profile.font,
			'last_seen_message_json_string': '{}',
			'saved_views_json': '[]',
			'show_keyboard_shortcuts': user.profile.show_keyboard_shortcuts,
			'theme': user.profile.theme,
			'unsubscribe_from_summary_emails': user.profile.unsubscribe_from_summary_emails,
			'username': user.username
		}
		}
		response =  JsonResponse(init_data)
		return response

@csrf_exempt
@login_required
def track(request):
	return JsonResponse({"success": "event tracked"})

@csrf_exempt
@login_required
def change_settings(request):
	user = request.user
	profile = user.profile
	data = request.POST

	if data.get('saved_views_json_delta'):
		saved_views_json = profile.saved_views_json or list()
		saved_views_delta = data.get('saved_views_json_delta')
		operation = json.loads(saved_views_delta)
		added = operation.get('added')
		removed = operation.get('removed')
		if added:
			project = added[0]
			if project not in saved_views_json:
				saved_views_json.append(project)
		elif removed:
			project = removed[0]
			saved_views_json = [v for v in saved_views_json if v != project]
		profile.saved_views_json = saved_views_json
		profile.save()

	return JsonResponse({"success": True})


@csrf_exempt
@login_required
def push_and_poll(request):
	post_data = dict(request.POST)
	pprint(post_data)
	ppid = post_data["push_poll_id"]
	user_id = post_data["crosscheck_user_id"][0]

	push_poll_data = json.loads(post_data['push_poll_data'][0])[0]
	results = {
		"monthly_item_quota": 50000,
		"items_created_in_current_month": 0,
		"new_polling_interval_in_ms": 30000,
		"concurrent_remote_operation_transactions": [],
		"error_encountered_in_remote_operations": False
	}

	transaction = push_poll_data.get('most_recent_operation_transaction_id')
	operations = push_poll_data.get('operations', None)
	if operations:
		print 'operations found'
		try:
			operations_edited = list()
			transaction = 746671802

			for op in operations:
				client_timestamp = op["client_timestamp"]
				op_type = op["type"]
				op_data = op["data"]
				undo_data = op["undo_data"]

				perform_operation(op_type, op_data, undo_data, client_timestamp, user_id)

				operations_edited.append({
					"type": op_type,
					"data": op["data"],
				})
			operations_json = {
				"ops": operations_edited,
				"client_timestamp": client_timestamp,
				"ppid": ppid,
				"id": transaction,
			}
			results.update({
				"server_run_operation_transaction_json": json.dumps(operations_json),
			})
		except Exception as e:
			raise
			print e

	results.update({"new_most_recent_operation_transaction_id": transaction})
	return JsonResponse({"results": [results]})


@login_required
def get_settings(request):
	user = request.user
	return JsonResponse({
		"username": user.username,
		"theme": user.profile.theme,
		"last_seen_message_json_string": "{}",
		"saved_views_json": json.dumps(user.profile.saved_views_json),
		"auto_hide_left_bar": user.profile.auto_hide_left_bar,
		"unsubscribe_from_summary_emails": user.profile.unsubscribe_from_summary_emails,
		"font": user.profile.font,
		"backup_to_dropbox": user.profile.backup_to_dropbox,
		"email": user.email,
		"show_keyboard_shortcuts": user.profile.show_keyboard_shortcuts
	})


def create_children(project, parent, priority, user_id):
  new_project = Project.objects.create(id=project.get('id'), name=project.get('nm'), priority=priority, user_id=user_id, parent=parent)
  children = project.get('ch')
  if children:
	for priority, child in enumerate(children):
	  create_children(child, new_project, priority, user_id)

def bulk_create(parentid, trees, starting_priority, user_id):
  parent = Project.objects.get(id=parentid)
  for priority, project in enumerate(trees):
	  create_children(project=project, parent=parent, priority=priority, user_id=user_id)


def perform_operation(op_type, data, undo_data, timestamp, user_id):
		project_id = data.get('projectid') if data.get('projectid') != 'None' else None
		parent_id = data.get('parentid') if data.get('parentid') != 'None' else None
		priority = data.get('priority') if data.has_key('priority') else None

		if op_type == 'undelete':
			project = Project.objects.deleted().get(id=project_id, user_id=user_id)
			project.modified = timestamp
		elif op_type not in ['create', 'bulk_create', 'bulk_move']:
			project = Project.objects.get(id=project_id, user_id=user_id)
			project.modified = timestamp

		if op_type == 'create':
			print 'creating project', data
			project = Project(user_id=user_id)
			if data.get('projectid', None):
					uuid_id = data.get('projectid')
					project.id = UUID(uuid_id, version=4)
			if parent_id:
					parent = Project.objects.get(id=UUID(parent_id, version=4), user_id=user_id)
					project.parent = parent
			else:
					project.parent = None
			if priority != None:
					project.priority = priority
			project.save()

		elif op_type == 'bulk_create':
			# from IPython import embed
			# embed()
			priority = data.get('starting_priority')
			project_trees = json.loads(data.get('project_trees'))
			bulk_create(parent_id, project_trees, priority, user_id)
		elif op_type == 'edit':
			if data.get('name', None):
					project.name = data.get('name')
			if data.get('description', None):
					project.description = data.get('description')
			if parent_id:
					parent = Project.objects.get(id=parent_id, user_id=user_id)
					project.parent = parent
			if priority != None:
					project.priority = priority
			project.save()
		elif op_type == 'move':
			if parent_id:
					parent = Project.objects.get(id=parent_id, user_id=user_id)
					project.parent = parent
			else:
				project.parent = None
			if priority != None:
					project.priority = priority
			project.save()
		elif op_type == 'bulk_move':
			_priority = priority
			if parent_id:
					parent = Project.objects.get(id=parent_id, user_id=user_id)

			project_ids = json.loads(data.get('projectids_json'))
			projects = [Project.objects.get(id=p, user_id=user_id) for p in project_ids]
			for p in projects:
				if priority != None:
						p.priority = _priority
				if parent != None:
						p.parent = parent
				p.save()
				_priority += 1

		elif op_type == 'delete':
			print 'deleting,..'
			project.deleted = timestamp
			project.save()
		elif op_type == 'undelete':
			project.deleted = None
			project.save()
		elif op_type == 'complete':
			project.complete = timestamp
			project.save()
		elif op_type == 'uncomplete':
			project.complete = None
			project.save()

def save_expanded(expanded):
	pass