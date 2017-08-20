# Schema

## Bullet
- `id`: int, primary key
- `type`: enum, `['task', 'note', 'event']`, not null
- `title`: string, not null
- `body`: text, nullable
- `body_type`: enum, `['markdown', 'latex']`
- `topic_id`: int, references topic
- `parent_bullet_id`: int, references parent bullet if nested
- `due_date`: date
- `completed_on`: date
- `recurrence`: string, cron expression

## Topic
- `id`: int, primary key
- `title`: string, not null

## User
- TBD
