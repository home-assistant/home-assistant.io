---
layout: page
title: "Recorder"
description: "Instructions how to configure the data recorder for Home Assistant."
date: 2017-09-24 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: "History"
ha_release: pre 0.7
---

The `recorder` component is storing details in a database which then are handled by the [`history` component](/components/history/).

Home Assistant uses [SQLAlchemy](http://www.sqlalchemy.org/) as Object Relational Mapper (ORM). This means that you can now use **any** SQL backend for the recorder that is supported by SQLAlchemy, like [MySQL](https://www.mysql.com/), [MariaDB](https://mariadb.org/), [PostgreSQL](https://www.postgresql.org/), or [MS SQL Server](https://www.microsoft.com/en-us/sql-server/).

The default database engine is [SQLite](https://www.sqlite.org/) which doesn't require any configuration. The database is stored in your Home Assistant configuration directory (`.homeassistant`) and called `home-assistant_v2.db`.

To setup the `recorder` component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
recorder:
```

{% configuration %}
  recorder:
    description: Enables the recorder component. Only allowed once.
    required: true
    type: map
    keys:
      db_url:
        description: The URL which points to your database.
        required: false
        type: URL
      purge_interval:
        description: Enable scheduled purge of older events and states. The purge task runs every `purge_interval` days from when the `recorder component` is first enabled. If a scheduled purge is missed (e.g if Home Assistant was not running), the schedule will resume soon after Home Assistant restarts. You can use the [service](#service-purge) call `purge` when required without impacting the purge schedule. If `purge_interval` is set, `purge_keep_days` needs to be set as well.
        required: Inclusive
        type: int
      purge_keep_days:
        description: Specify the number of history days to keep in recorder database after purge. If `purge_interval` is set, `purge_keep_days` needs to be set as well.
        required: Inclusive
        type: int
      exclude:
        description: Configure which components should be excluded
        required: false
        type: map
        keys:
          domains:
            description: The list of domains to be excluded from recordings.
            required: false
            type: List
          entities:
            description: The list of entity ids to be excluded from recordings.
            required: false
            type: List
      include:
        description: Configure which components should be included in recordings. If set, all other entities will not be recorded.
        required: false
        type: map
        keys:
          domains:
            description: The list of domains to be included in the recordings.
            required: false
            type: List
          entities:
            description: The list of entity ids to be included in the recordings.
            required: false
            type: List
{% endconfiguration %}

Define domains and entities to `exclude` (aka. blacklist). This is convenient when you are basically happy with the information recorded, but just want to remove some entities or domains. Usually these are entities/domains which do not change (like `weblink`) or rarely change (`updater` or `automation`).

```yaml
# Example configuration.yaml entry with exclude
recorder:
  purge_interval: 2
  purge_keep_days: 5
  db_url: sqlite:///home/user/.homeassistant/test
  exclude:
    domains:
      - automation
      - weblink
      - updater
    entities:
      - sun.sun # Don't record sun data
      - sensor.last_boot # Comes from 'systemmonitor' sensor platform
      - sensor.date
```

Define domains and entities to record by using the `include` configuration (aka. whitelist). If you have a lot of entities in your system and your `exclude` lists possibly get very large, it might be better just to define the entities or domains to record.

```yaml
# Example configuration.yaml entry with include
recorder:
  include:
    domains:
      - sensor
      - switch
      - media_player
```

Use the `include` list to define the domains/entities to record, and exclude some of them with in the `exclude` list. This makes sense if you for instance include the `sensor` domain, but want to exclude some specific sensors. Instead of adding every sensor entity to the `include` `entities` list just include the `sensor` domain and exclude the sensor entities you are not interested in.

```yaml
# Example configuration.yaml entry with include and exclude
recorder:
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

### {% linkable_title Service `purge` %}

Call the service `recorder.purge` to start purge task, which deletes events and states older than x days, according to `keep_days` service data (*Required*)

Automation [action](https://home-assistant.io/getting-started/automation-action/) example:

```yaml
action:
  service: recorder.purge
  data:
    keep_days: 5
```

## Custom database engines

| Database engine | `db_url`                                                 | 
| :---------------|:---------------------------------------------------------|
| SQLite          | `sqlite:///PATH/TO/DB_NAME`                              |
| MariaDB         | `mysql://SERVER_IP/DB_NAME?charset=utf8`                 |
| MariaDB         | `mysql://user:password@SERVER_IP/DB_NAME?charset=utf8`   |
| MySQL           | `mysql://SERVER_IP/DB_NAME?charset=utf8`                 |
| MySQL           | `mysql://user:password@SERVER_IP/DB_NAME?charset=utf8`   |
| MySQL (pymysql) | `mysql+pymysql://SERVER_IP/DB_NAME?charset=utf8`         |
| MySQL (pymysql) | `mysql+pymysql://user:password@SERVER_IP/DB_NAME?charset=utf8` |
| PostgreSQL      | `postgresql://SERVER_IP/DB_NAME`                         |
| PostgreSQL      | `postgresql://scott:tiger@SERVER_IP/DB_NAME`             |
| MS SQL Server   | `mssql+pymssql://user:pass@SERVER_IP/DB_NAME?charset=utf8` |

## {% linkable_title Installation notes %}

Not all Python bindings for the chosen database engine can be installed directly. This section contains additional details which should help you to get it working.

### {% linkable_title MariaDB and MySQL %}

For MariaDB you may have to install a few dependencies. On the Python side we use the `mysqlclient`:

```bash
$ sudo apt-get install libmariadbclient-dev libssl-dev
$ pip3 install mysqlclient
```

For MySQL you may have to install a few dependencies. You can choose between `pymysql` and `mysqlclient`:

```bash
$ sudo apt-get install default-libmysqlclient-dev libssl-dev
$ pip3 install mysqlclient
```

If you are in a virtual environment, don't forget to activate it before installing the `mysqlclient` Python package.

```bash
pi@homeassistant:~ $ sudo su homeassistant -s /bin/bash  
homeassistant@homeassistant:~$ source /srv/homeassistant/bin/activate
(homeassistant) homeassistant@homeassistant:~$ pip3 install mysqlclient
```

After installing the dependencies, it is required to create the database manually. During the startup, Home Assistant will look for the database specified in the `db_url`. If the database doesn't exist, it will not automatically create it for you. 

Once Home Assistant finds the database, with right level of permissions, all the required tables will then be automatically created and the data will be populated accordingly.

### {% linkable_title PostgreSQL %}

For PostgreSQL you may have to install a few dependencies:

```bash
$ sudo apt-get install postgresql-server-dev-X.Y
$ pip3 install psycopg2
```

### {% linkable_title MS SQL Server %}

For MS SQL Server you may have to install a few dependencies:

```bash
$ sudo apt-get install freetds-dev
$ pip3 install pymssql
```

If you are in a virtual environment, don't forget to activate it before installing the pymssql package.

```bash
$ sudo su -s /bin/bash homeassistant
$ source /srv/homeassistant/bin/activate
$ pip3 install pymssql
```
