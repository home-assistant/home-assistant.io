---
layout: page
title: "Recorder"
description: "Instructions how to configure the data recorder for Home Assistant."
date: 2016-05-21 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: "History"
ha_release: pre 0.7
---

The `recorder` component is storing details in a database which then are handled by the [`history` component](/components/history/).

Home Assistant uses [SQLAlchemy](http://www.sqlalchemy.org/) as Object Relational Mapper (ORM). This means that you can now use **any** SQL backend for the recorder that is supported by SQLAlchemy, like [MySQL](https://www.mysql.com/), [MariaDB](https://mariadb.org/), or [PostgreSQL](https://www.postgresql.org/).

The default database engine is [SQLite](https://www.sqlite.org/) which doesn't require any configuration. The database is stored in your Home Assistant configuration directory (`.homeassistant`) and called `home-assistant.db`.

To setup the `recorder` component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
recorder:
```

Configuration variables:

- **purge_days** (*Optional*): Delete events and states older than x days.
- **exclude** (*Optional*): Configure which components should be excluded from recordings.
  - **entities** (*Optional*): The list of entity ids to be excluded from recordings.
  - **domains** (*Optional*): The list of domains to be excluded from recordings.
- **include** (*Optional*): Configure which components should be included in recordings. If set, all other entities will not be recorded.
  - **entities** (*Optional*): The list of entity ids to be included from the history.
  - **domains** (*Optional*): The list of domains to be included from the history.
- **db_url** (*Optional*): The URL which point to your database. 


Define domains and entities to `exclude` (aka. blacklist). This is convenient when you are basically happy with the information recorded, but just want to remove some entities or domains. Usually these are entities/domains which do not change (like `weblink`) or rarely change (`updater` or `automation`).

```yaml
# Example configuration.yaml entry with exclude
recorder:
  purge_days: 5
  db_url: sqlite:///home/user/.homeassistant/test
  exclude:
    domains:
      - automation
      - weblink
      - updater
    entities:
      - sun.sun   # Don't record sun data
      - sensor.last_boot
      - sensor.date
```

Define domains and entities to record by using the `include` configuration (aka. whitelist). If you have a lot of entities in your system and your `exclude` lists possibly get very large, it might be better just to define the entities or domains to record.

```yaml
# Example configuration.yaml entry with include
history:
  include:
    domains:
      - sensor
      - switch
      - media_player
```

Use the `include` list to define the domains/entities to record, and exclude some of them with in the `exclude` list. This makes sense if you for instance include the `sensor` domain, but want to exclude some specific sensors. Instead of adding every sensor entity to the `include` `entities` list just include the `sensor` domain and exclude the sensor entities you are not interested in.

```yaml
# Example configuration.yaml entry with include and exclude
history:
  include:
    domains:
      - sensor
      - switch
      - media_player
  exclude:
    entities:
     - sensor.last_boot
     - sensor.date
```

If you only want to hide events from e.g. your history, take a look at the [`history` component](/components/history/). Same goes for logbook. But if you have privacy concerns about certain events or neither want them in history or logbook, you should use the `exclude`/`include` options of the `recorder` component, that they aren't even in your database. That way you can save storage and keep the database small by excluding certain often-logged events (like `sensor.last_boot`).

## Custom database engines

| Database engine | `db_url`                                                 | 
| :---------------|:---------------------------------------------------------|
| SQLite          | `sqlite:///PATH/TO/DB_NAME`                              |
| MySQL           | `mysql+pymysql://SERVER_IP/DB_NAME`                      |
| MySQL           | `mysql+pymysql://user:password@SERVER_IP/DB_NAME`        |
| PostgreSQL      | `postgresql://SERVER_IP/DB_NAME`                         |
| PostgreSQL      | `postgresql://scott:tiger@SERVER_IP/DB_NAME`             |

## {% linkable_title Installation notes %}

Not all Python bindings for the chosen database engine can be installed directly. This section contains additional details which should help you to get it working.

### {% linkable_title MYSQL %}

For MySQL you may have to install a few dependencies:

```bash
$ sudo apt-get install libmysqlclient-dev
$ pip3 install pymysql
```
If you are in a virtual environment, don't forget to activate it before installing the pymysql package.

```bash
pi@homeassistant:~ $ sudo -i
root@homeassistant:~# su homeassistant  
homeassistant@homeassistant:/root$ cd /srv/homeassistant/homeassistant_venv/
homeassistant@homeassistant:/srv/homeassistant/homeassistant_venv$ source bin/activate
(homeassistant_venv) homeassistant@homeassistant:/srv/homeassistant/homeassistant_venv$ pip3 install pymysql

### {% linkable_title PostgreSQL %}

For PostgreSQL you may have to install a few dependencies:

```bash
$ sudo apt-get install postgresql-server-dev-X.Y
$ pip3 install psycopg2
```
