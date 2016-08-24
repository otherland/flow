create or replace function position_trigger()
returns trigger language plpgsql as $$
begin
    RAISE NOTICE 'Calling position_trigger';

    if tg_op = 'UPDATE' then
        /*
        check that new parent is not a child, if not exists...
        select id from projects where id = 1 and path ~ '1.*{1,}';
        */
        if new.position > old.position then
            update projects
            set position = position - 1
            where parent_id = new.parent_id -- siblings only
            and position <= new.position
            and position > old.position
            and id <> new.id;
        elsif new.position < old.position then
            update projects
            set position = position + 1
            where parent_id = new.parent_id -- siblings only
            and position >= new.position
            and position < old.position
            and id <> new.id;
        end if;
    else
        update projects
        set position = position + 1
        where parent_id = new.parent_id -- siblings only
        and position >= new.position
        and id <> new.id;
    end if;
    return new;
end $$;

create trigger position_trigger
before insert or update of parent_id, position
    on projects
for each row when (pg_trigger_depth() = 0)
execute procedure position_trigger();