---
title: Recorder
description: Instructions on how to configure the data recorder for Home Assistant.
ha_category:
  - History
ha_release: pre 0.7
ha_quality_scale: internal
ha_domain: recorder
ha_iot_class: Local Push
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
---

This integration is by default enabled as dependency of the [`history`](/integrations/history/) integration.

{% important %}
This integration constantly saves data. If you use the default configuration, the data will be saved on the media Home Assistant is installed on. In case of Raspberry Pi with an SD card, it might affect your system's reaction time and life expectancy of the storage medium (the SD card). It is therefore recommended to set the [commit_interval](/integrations/recorder#commit_interval) to higher value, e.g. 30s, limit the amount of stored data (e.g., by excluding devices) or store the data elsewhere (e.g., another system).
{% endimportant %}

Home Assistant uses [SQLAlchemy](https://www.sqlalchemy.org/), which is an Object Relational Mapper (ORM). This makes it possible to use a number of database solutions.

The supported database solutions are:
- [MariaDB](https://mariadb.org/) ≥ 10.3
- [MySQL](https://www.mysql.com/) ≥ 8.0
- [PostgreSQL](https://www.postgresql.org/) ≥ 12
- [SQLite](https://www.sqlite.org/) ≥ 3.40.1

Although SQLAlchemy supports database solutions in addition to the ones supported by Home Assistant, it will behave differently on different databases, and features relied on by the recorder may work differently, or not at all, in different databases.

The default, and recommended, database engine is [SQLite](https://www.sqlite.org/) which does not require any configuration. The database is stored in your Home Assistant configuration directory ('/config/') and is named `home-assistant_v2.db`.

{% caution %}
Changing database used by the recorder may result in losing your existing history. Migrating data is not supported.
{% endcaution %}

To change the defaults for the `recorder` integration in your installation, add the following to your {% term "`configuration.yaml`" %} file:

## Disk space requirements

A bare minimum requirement is to have at least as much free temporary space available as the size of your database at all times. A table rebuild, repair, or repack may happen at any time, which can result in a copy of the data on disk during the operation. Meeting the bare minimum requirement is essential during a version upgrade, where the schema may change, as this operation almost always requires making a temporary copy of part of the database.

For example, if your database is 1.5&nbsp;GiB on disk, you must always have at least 1.5&nbsp;GiB free.

## Advanced configuration

```yaml
# Example configuration.yaml entry
recorder:
```

{% configuration %}
recorder:
  description: Enables the recorder integration. Only allowed once.
  required: true
  type: map
  keys:
    db_url:
      description: The URL that points to your database. Examples of these can be found [here](#custom-database-engines).
      required: false
      type: string
    db_max_retries:
      description: The max amount of times, the recorder retries to connect to the database.
      required: false
      default: 10
      type: integer
    db_retry_wait:
      description: The time in seconds, that the recorder sleeps when trying to connect to the database.
      required: false
      default: 3
      type: integer 
    auto_purge:
      description: Automatically purge the database every night at 04:12 local time. Purging keeps the database from growing indefinitely, which takes up disk space and can make Home Assistant slow. If you disable `auto_purge` it is recommended that you create an automation to call the [`recorder.purge`](#action-purge) periodically.
      required: false
      default: true
      type: boolean
    auto_repack:
      description: Automatically repack the database every second sunday after the auto purge. Without a repack, the database may not decrease in size even after purging, which takes up disk space and can make Home Assistant slow. If you disable `auto_repack` it is recommended that you create an automation to call the [`recorder.purge`](#action-purge) periodically. This flag has no effect if `auto_purge` is disabled.
      required: false
      default: true
      type: boolean
    purge_keep_days:
      description: Specify the number of history days to keep in recorder database after a purge.
      required: false
      default: 10
      type: integer
    commit_interval:
      description: How often (in seconds) the events and state changes are committed to the database. The default of `5` allows events to be committed almost right away without trashing the disk when an event storm happens. Increasing this will reduce disk I/O and may prolong disk (SD card) lifetime with the trade-off being that the database will lag (the logbook and history will not lag, because the changes are streamed to them immediatelly). If this is set to `0` (zero), commit are made as soon as possible after an event is processed.
      required: false
      default: 5
      type: integer
    exclude:
      description: Configure which integrations should be excluded from recordings. ([Configure Filter](#configure-filter))
      required: false
      type: map
      keys:
        domains:
          description: The list of domains to be excluded from recordings.
          required: false
          type: list
        entity_globs:
          description: Exclude all entities matching a listed pattern from recordings (e.g., `sensor.weather_*`).
          required: false
          type: list
        entities:
          description: The list of entity ids to be excluded from recordings.
          required: false
          type: list
        event_types:
          description: The list of event types to be excluded from recordings.
          required: false
          type: list
    include:
      description: Configure which integrations should be included in recordings. If set, all other entities will not be recorded. ([Configure Filter](#configure-filter))
      required: false
      type: map
      keys:
        domains:
          description: The list of domains to be included in the recordings.
          required: false
          type: list
        entity_globs:
          description: Include all entities matching a listed pattern from recordings (e.g., `sensor.weather_*`).
          required: false
          type: list
        entities:
          description: The list of entity ids to be included in the recordings.
          required: false
          type: list
{% endconfiguration %}

### Configure filter

By default, no entity will be excluded. To limit which entities are being exposed to `recorder`, you can use the `include` and `exclude` parameters.

```yaml
# Example filter to include specified domains and exclude specified entities
recorder:
  include:
    domains:
      - alarm_control_panel
      - light
    entity_globs:
      - binary_sensor.*_occupancy
  exclude:
    entities:
      - light.kitchen_light
```

{% include common-tasks/filters.md %}

If you only want to hide events from your logbook, take a look at the [logbook integration](/integrations/logbook/). But if you have privacy concerns about certain events or want them in neither the history or logbook, you should use the `exclude`/`include` options of the `recorder` integration. That way they aren't even in your database, you can reduce storage and keep the database small by excluding certain often-logged events (like `sensor.last_boot`).

#### Common filtering examples

Defining domains and entities to `exclude` (i.e. blocklist) is convenient when you are basically happy with the information recorded, but just want to remove some entities or domains.

```yaml
# Example configuration.yaml entry with exclude
recorder:
  purge_keep_days: 5
  db_url: sqlite:////home/user/.homeassistant/test
  exclude:
    domains:
      - automation
      - update
    entity_globs:
      - sensor.sun*
      - weather.*
    entities:
      - sensor.date
      - sensor.last_boot # Comes from 'systemmonitor' sensor platform
      - sun.sun # Don't record sun data
    event_types:
      - call_service # Don't record actions
```

Defining domains and entities to record by using the `include` configuration (i.e. allowlist) is convenient if you have a lot of entities in your system and your `exclude` lists possibly get very large, so it might be better just to define the entities or domains to record.

```yaml
# Example configuration.yaml entry with include
recorder:
  include:
    domains:
      - sensor
      - switch
      - media_player
```

You can also use the `include` list to define the domains/entities to record, and exclude some of those within the `exclude` list. This makes sense if you, for instance, include the `sensor` domain, but want to exclude some specific sensors. Instead of adding every sensor entity to the `include` `entities` list just include the `sensor` domain and exclude the sensor entities you are not interested in.

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
    entity_globs:
      - sensor.weather_*
```

## Actions

### Action `purge`

Perform the action `recorder.purge` to start a purge task which deletes events and states older than x days, according to `keep_days` action data.
Note that purging will not immediately decrease disk space usage but it will significantly slow down further growth.

| Data attribute | Optional | Description                                                                                                                                                                                                                                                                                                             |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `keep_days`            | yes      | The number of history days to keep in recorder database (defaults to the integration `purge_keep_days` configuration)                                                                                                                                                                                                   |
| `repack`               | yes      | When using SQLite or PostgreSQL this will rewrite the entire database. When using MySQL or MariaDB it will optimize or recreate the events and states tables. This is a heavy operation that can cause slowdowns and increased disk space usage while it runs. Only supported by SQLite, PostgreSQL, MySQL and MariaDB. |
| `apply_filter`         | yes      | Apply entity_id and event_type filter in addition to time based purge. Useful in combination with `include` / `exclude` filter to remove falsely added states and events. Combine with `repack: true` to reduce database size.                                                                                          |

### Action `purge_entities`

Perform the action `recorder.purge_entities` to start a task that purges events and states from the recorder database that match any of the specified `entity_id`, `domains`, and `entity_globs` fields. At least one of the three selection criteria fields must be provided.

| Data attribute | Optional | Description                                                                                                           |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | yes      | A list of entity_ids that should be purged from the recorder database.                                                |
| `domains`              | yes      | A list of domains that should be purged from the recorder database.                                                   |
| `entity_globs`         | yes      | A list of regular expressions that identify entities to purge from the recorder database.                             |
| `keep_days`            | yes      | Number of history days to keep in the database of matching rows. The default of 0 days will remove all matching rows. |

#### Example automation to remove data rows for specific entities

The below automation will remove history for `sensor.power_sensor_0` older than 5 days at `04:15:00` every day.

```yaml
alias: "Purge noisy power sensors"
triggers:
  - trigger: time
    at: "04:15:00"
actions:
  - action: recorder.purge_entities
    data:
      keep_days: 5
      entity_id: sensor.power_sensor_0
```

### Action `disable`

Perform the action `recorder.disable` to stop saving events and states to the database.

### Action `enable`

Perform the action `recorder.enable` to start again saving events and states to the database. This is the opposite of `recorder.disable`.

## Handling disk corruption and hardware failures

When using SQLite, if the system encounters unrecoverable disk corruption, it will move the database aside and create a new database to keep the system online. In this case, having at least 2.5x the database size available in free disk space is essential. Starting a new database is the system's last resort recovery option and is usually caused by failing flash storage, an inadequate power supply, an unclean shutdown, or another hardware failure.

In this event, it may be possible to recover the old database by following the [SQLite recovery guide](https://www.sqlite.org/recovery.html).

## Custom database engines

{% warning %}
SQLite is the most tested, and newer version of Home Assistant are highly optimized to perform well when using SQLite.

When choosing another option, you should be comfortable in the role of the database administrator, including making backups of the external database.
{% endwarning %}

Here are examples to use with the [`db_url`](#db_url) configuration option.

{% configuration_basic %}

SQLite:
  description: >
    `sqlite:////PATH/TO/DB_NAME`
MariaDB (omit pymysql):
  description: >
    `mysql://user:password@SERVER_IP/DB_NAME?charset=utf8mb4`
MariaDB (omit pymysql, using TLS encryption):
  description: >
    `mysql://user:password@SERVER_IP/DB_NAME?charset=utf8mb4;ssl=true`
MariaDB (omit pymysql, Socket):
  description: >
    `mysql://user:password@SERVER_IP/DB_NAME?unix_socket=/var/run/mysqld/mysqld.sock&charset=utf8mb4`
MySQL:
  description: >
    `mysql://user:password@SERVER_IP/DB_NAME?charset=utf8mb4`
MySQL (using TLS encryption):
  description: >
    `mysql://user:password@SERVER_IP/DB_NAME?charset=utf8mb4;ssl=true`
MySQL (Socket):
  description: >
    `mysql://user:password@localhost/DB_NAME?unix_socket=/var/run/mysqld/mysqld.sock&charset=utf8mb4`
MariaDB:
  description: >
    `mysql+pymysql://user:password@SERVER_IP/DB_NAME?charset=utf8mb4`
MariaDB (Socket):
  description: >
    `mysql+pymysql://user:password@localhost/DB_NAME?unix_socket=/var/run/mysqld/mysqld.sock&charset=utf8mb4`
PostgreSQL:
  description: >
    `postgresql://user:password@SERVER_IP/DB_NAME`
PostgreSQL (Socket):
  description: >
    `postgresql://@/DB_NAME`
PostgreSQL (Custom socket dir):
  description: >
    `postgresql://@/DB_NAME?host=/path/to/dir`
{% endconfiguration_basic %}

{% note %}
Some installations of MariaDB/MySQL may require an ALTERNATE_PORT (3rd-party hosting providers or parallel installations) to be added to the SERVER_IP, e.g., `mysql://user:password@SERVER_IP:ALTERNATE_PORT/DB_NAME?charset=utf8mb4`.
{% endnote %}

{% note %}
When using a MariaDB or MySQL server, adding `+pymysql` to the URL will use the pure Python MySQL library, which is slower but may be required if the C MySQL library is not available. 

When using the official Docker image, the C MySQL library will always be available. `pymysql` is most commonly used with `venv` where the C MySQL library is not installed.
{% endnote %}

{% tip %}
Unix Socket connections always bring performance advantages over TCP, if the database is on the same host as the `recorder` instance (i.e., `localhost`).
{% endtip %}

{% note %}
If you want to use Unix Sockets for PostgreSQL you need to modify the `pg_hba.conf`. See [PostgreSQL](#postgresql)
{% endnote %}

### Database startup

If you are running a database server instance on the same server as Home Assistant then you must ensure that this action starts before Home Assistant. For a Linux instance running Systemd (Raspberry Pi, Debian, Ubuntu and others) you should edit the service file.
To help facilitate this, db_max_retry and db_retry_wait variables have been added to ensure the recorder retries the connection to your database enough times, for your database to start up.

```bash
sudo nano /etc/systemd/system/home-assistant@homeassistant.service
```

and add the action for the database, for example, PostgreSQL:

```txt
[Unit]
Description=Home Assistant
After=network.target postgresql.service
```

Save the file then reload `systemctl`:

```bash
sudo systemctl daemon-reload
```

## Installation notes

Not all Python bindings for the chosen database engine can be installed directly. This section contains additional details that should help you to get it working.

### MariaDB and MySQL

{% warning %}
MariaDB versions before 10.5.17, 10.6.9, 10.7.5, and 10.8.4 suffer from a performance regression which can result in the system becoming overloaded while querying history data or purging the database.
{% endwarning %}

Make sure the default character set of your database server is set to `utf8mb4` (see [MariaDB documentation](https://mariadb.com/kb/en/setting-character-sets-and-collations/#example-changing-the-default-character-set-to-utf-8)).
If you are in a virtual environment, don't forget to activate it before installing the `mysqlclient` Python package described below.

```bash
pi@homeassistant:~ $ sudo -u homeassistant -H -s
homeassistant@homeassistant:~$ source /srv/homeassistant/bin/activate
(homeassistant) homeassistant@homeassistant:~$ pip3 install mysqlclient
```

For MariaDB you may have to install a few dependencies. If you're using MariaDB 10.3, the package `libmariadb-dev-compat` must also be installed. Please install the correct packages based on your MariaDB version.

On the Python side we use the `mysqlclient`:

```bash
sudo apt-get install libmariadbclient-dev libssl-dev
pip3 install mysqlclient
```

For MySQL you may have to install a few dependencies. You can choose between `pymysql` and `mysqlclient`:

```bash
sudo apt-get install default-libmysqlclient-dev libssl-dev
pip3 install mysqlclient
```

After installing the dependencies, it is required to create the database manually. During the startup, Home Assistant will look for the database specified in the `db_url`. If the database doesn't exist, it will not automatically create it for you.

The database engine must be `InnoDB` as `MyIASM` is not supported.

```bash
SET GLOBAL default_storage_engine = 'InnoDB';
CREATE DATABASE DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Where `DB_NAME` is the name of your database

Once Home Assistant finds the database, with the right level of permissions, all the required tables will then be automatically created and the data will be populated accordingly.

### PostgreSQL

Create the PostgreSQL database with `utf8` encoding. The PostgreSQL default encoding is `SQL_ASCII`. From the `postgres` user account;
```bash
createdb -E utf8 DB_NAME
```
Where `DB_NAME` is the name of your database

If the Database in use is not `utf8`, adding `?client_encoding=utf8` to the `db_url` may solve any issue.

For PostgreSQL you may have to install a few dependencies:

```bash
sudo apt-get install postgresql-server-dev-X.Y
pip3 install psycopg2
```

For using Unix Sockets, first create your user from the `postgres` user account;
```bash
createuser USER_NAME
```
Where `USER_NAME` is the name of the user running the Home Assistant instance (see [securing your installation](/docs/configuration/securing/)).

Then add the following line to your [`pg_hba.conf`](https://www.postgresql.org/docs/current/static/auth-pg-hba-conf.html):

`local  DB_NAME USER_NAME peer`

Where `DB_NAME` is the name of your database and `USER_NAME` is the name of the user running the Home Assistant instance (see [securing your installation](/docs/configuration/securing/)).

Reload the PostgreSQL configuration after that:
```bash
$ sudo -i -u postgres psql -c "SELECT pg_reload_conf();"
 pg_reload_conf
----------------
 t
(1 row)
```
A service restart will work as well.
