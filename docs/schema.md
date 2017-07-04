# Schema

## Topic
- `id`: int, primary key
- `name`: string, not null

## Bullet
- `id`: int, primary key
- `type`: string, references task/event/note table, not null
- `type_id`: int, references record on task/event/note table, not null
- `topic_id`: int, references topic
- `parent_bullet_id`: int, references parent bullet if nested

## Task
- `id`: int, primary key
- `due_date`: date
- `title`: string, not null
- `completed`: boolean, not null, default: false
- `completed_on`: date

## Event
- `id`: int, primary key
- `date`: date, not null
- `recurring`: string, cron expression
- `title`: string, not null

## Note
- `id`: int, primary key
- `title`: string, not null
- `body`: text, not null, default ''
- `body_type`: enum, `['markdown', 'latex', 'plain']`, not null, default: `plain`

## User
- TBD
