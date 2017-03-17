def serialize(project):
    data = {
        'id': str(project['id']),
        'nm': project['name'],
        'priority': project['priority'],
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

def unflatten(array, parent={'id': None}, tree=[]):
    children = filter(lambda child: child['parent_id'] == parent['id'], array)
    # new_children = sorted(children, key=lambda k: k.get('priority', 0))

    if children:
        if parent['id'] == None:
            tree = children
        else:
            # parent['children'] = map(serialize, children)
            parent['children'] = children
        for child in children:
            unflatten(array, child)
    return tree


def get_tree(user_id):
    projects = list(Project._default_manager.filter(user_id=user_id).order_by('priority').values('name', 'parent_id', 'modified', 'description', 'complete', 'priority', 'id'))



arr = [
        {'id':1 ,'parent_id' : 0},
        {'id':2 ,'parent_id' : 1},
        {'id':3 ,'parent_id' : 1},
        {'id':4 ,'parent_id' : 2},
        {'id':5 ,'parent_id' : 0},
        {'id':6 ,'parent_id' : 0},
        {'id':7 ,'parent_id' : 4}
]







def get_tree(user_id):
    all = Project._default_manager.filter(user_id=user_id).values('name', 'parent_id', 'modified', 'description', 'complete', 'priority', 'id')

    for key in flat:
        project = flat[key]
        parentid = project.get('parent_id')
        if not parentid:
            continue
        if parentid in flat:
            parent = flat[parentid]
            try:
                # add the current projectid to parent's children
                parent.setdefault('children',[]).append(key)
            except AttributeError:
                from IPython import embed; embed();
                import sys; sys.exit()
        else:
            flat[key] = None

    for key in flat:
        project = flat[key]
        if project != None and project.get('parent_id', None) == None:
            recurse(project=project, project_id=key)

    top_sort = sorted([flat[key] for key in flat if flat[key]], key=lambda k: k.get('priority', 0))
    tree = [serialize(p) for p in top_sort]
    return tree
