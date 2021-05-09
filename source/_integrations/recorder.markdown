---
title: Recorder
description: Instructions on how to configure the data recorder for Home Assistant.
ha_category:
  - History
ha_release: pre 0.7
ha_quality_scale: internal
ha_domain: recorder
ha_iot_class: Local Push
---

The `recorder` integration is responsible for storing details in a database, which then are handled by the [`history` ](/integrations/history/) integration.

<div class='note'>

This integration constantly saves data. If you use the default configuration, the data will be saved on the media Home Assistant is installed on. In case of Raspberry Pi with an SD card, it might affect your system's reaction time and life expectancy of the storage medium (the SD card). It is therefore recommended to set the [commit_interval](/integrations/recorder#commit_interval) to higher value, e.g. 30s, limit the amount of stored data (e.g., by excluding devices) or store the data elsewhere (e.g., another system).

</div>

Home Assistant uses [SQLAlchemy](https://www.sqlalchemy.org/), which is an Object Relational Mapper (ORM). This means that you can use **any** SQL backend for the recorder that is supported by SQLAlchemy, like [MySQL](https://www.mysql.com/), [MariaDB](https://mariadb.org/), [PostgreSQL](https://www.postgresql.org/), or [MS SQL Server](https://www.microsoft.com/en-us/sql-server/).

The default database engine is [SQLite](https://www.sqlite.org/) which does not require any configuration. The database is stored in your Home Assistant configuration directory ('/config/') and is named `home-assistant_v2.db`.

To change the defaults for the `recorder` integration in your installation, add the following to your `configuration.yaml` file:

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
      description: The URL that points to your database.
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
      description: Automatically purge the database every night at 04:12 local time. Purging keeps the database from growing indefinitely, which takes up disk space and can make Home Assistant slow. If you disable `auto_purge` it is recommended that you create an automation to call the [`recorder.purge`](#service-purge) periodically.
      required: false
      default: true
      type: boolean
    purge_keep_days:
      description: Specify the number of history days to keep in recorder database after a purge.
      required: false
      default: 10
      type: integer
    commit_interval:
      description: How often (in seconds) the events and state changes are committed to the database. The default of `1` allows events to be committed almost right away without trashing the disk when an event storm happens. Increasing this will reduce disk I/O and may prolong disk (SD card) lifetime with the trade-off being that the logbook and history will lag. If this is set to `0` (zero), commit are made as soon as possible after an event is processed.
      required: false
      default: 1
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

## Configure Filter

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

Filters are applied as follows:

1. No includes or excludes - pass all entities
2. Includes, no excludes - only include specified entities
3. Excludes, no includes - only exclude specified entities
4. Both includes and excludes:
   - Include domain and/or glob patterns specified
      - If domain is included, and entity not excluded or match exclude glob pattern, pass
      - If entity matches include glob pattern, and entity does not match any exclude criteria (domain, glob pattern or listed), pass
      - If domain is not included, glob pattern does not match, and entity not included, fail
   - Exclude domain and/or glob patterns specified and include does not list domains or glob patterns
      - If domain is excluded and entity not included, fail
      - If entity matches exclude glob pattern and entity not included, fail
      - If entity does not match any exclude criteria (domain, glob pattern or listed), pass
   - Neither include or exclude specifies domains or glob patterns
      - If entity is included, pass (as #2 above)
      - If entity include and exclude, the entity exclude is ignored

If you only want to hide events from your history, take a look at the [`history` integration](/integrations/history/). The same goes for the [logbook](/integrations/logbook/). But if you have privacy concerns about certain events or want them in neither the history or logbook, you should use the `exclude`/`include` options of the `recorder` integration. That way they aren't even in your database, you can reduce storage and keep the database small by excluding certain often-logged events (like `sensor.last_boot`).

### Common filtering examples

Defining domains and entities to `exclude` (i.e. blocklist) is convenient when you are basically happy with the information recorded, but just want to remove some entities or domains.

```yaml
# Example configuration.yaml entry with exclude
recorder:
  purge_keep_days: 5
  db_url: sqlite:////home/user/.homeassistant/test
  exclude:
    domains:
      - automation
      - updater
    entity_globs:
      - sensor.weather_*
    entities:
      - sun.sun # Don't record sun data
      - sensor.last_boot # Comes from 'systemmonitor' sensor platform
      - sensor.date
    event_types:
      - call_service # Don't record service calls
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

## Services

### Service `purge`

Call the service `recorder.purge` to start a purge task which deletes events and states older than x days, according to `keep_days` service data.
Note that purging will not immediately decrease disk space usage but it will significantly slow down further growth.

| Service data attribute | Optional | Description                                                                                                                                                                                              |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `keep_days`            | yes      | The number of history days to keep in recorder database (defaults to the integration `purge_keep_days` configuration)                                                                                    |
| `repack`               | yes      | When using SQLite or PostgreSQL this will rewrite the entire database. When using MySQL or MariaDB it will optimize or recreate the events and states tables. This is a heavy operation that can cause slowdowns and increased disk space usage while it runs. Only supported by SQLite, PostgreSQL, MySQL and MariaDB. |
| `apply_filter`         | yes      | Apply entity_id and event_type filter in addition to time based purge. Useful in combination with `include` / `exclude` filter to remove falsely added states and events. Combine with `repack: true` to reduce database size. |

### Service `disable`

Call the service `recorder.disable` to stop saving events and states to the database.

### Service `enable`

Call the service `recorder.enable` to start again saving events and states to the database. This is the opposite of `recorder.disable`.

## Recommended engines and minimum versions

The following database engines are tested when major changes are made to the recorder. Other database engines do not have an active core maintainer at this time and may require additional work to maintain.

- SQLite 3.32.1+
- MariaDB 10.3+
- MySQL 5.7+
- PostgresSQL 12+

## Custom database engines

| Database engine                | `db_url`                                                                                                  |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------- |
| SQLite                         | `sqlite:////PATH/TO/DB_NAME`                                                                              |
| MariaDB (omit pymysql)         | `mysql://user:password@SERVER_IP/DB_NAME?charset=utf8mb4`                                                 |
| MariaDB (omit pymysql, Socket) | `mysql://user:password@SERVER_IP/DB_NAME?unix_socket=/var/run/mysqld/mysqld.sock&charset=utf8mb4`         |
| MySQL                          | `mysql://SERVER_IP/DB_NAME?charset=utf8mb4`                                                               |
| MySQL                          | `mysql://user:password@SERVER_IP/DB_NAME?charset=utf8mb4`                                                 |
| MySQL (Socket)                 | `mysql://user:password@localhost/DB_NAME?unix_socket=/var/run/mysqld/mysqld.sock&charset=utf8mb4`         |
| MariaDB                        | `mysql+pymysql://SERVER_IP/DB_NAME?charset=utf8mb4`                                                       |
| MariaDB                        | `mysql+pymysql://user:password@SERVER_IP/DB_NAME?charset=utf8mb4`                                         |
| MariaDB (Socket)               | `mysql+pymysql://user:password@localhost/DB_NAME?unix_socket=/var/run/mysqld/mysqld.sock&charset=utf8mb4` |
| PostgreSQL                     | `postgresql://SERVER_IP/DB_NAME`                                                                          |
| PostgreSQL                     | `postgresql://user:password@SERVER_IP/DB_NAME`                                                            |
| PostgreSQL (Socket)            | `postgresql://@/DB_NAME`                                                                                  |
| PostgreSQL (Custom socket dir) | `postgresql://@/DB_NAME?host=/path/to/dir`                                                                |
| MS SQL Server                  | `mssql+pyodbc://username:password@SERVER_IP/DB_NAME?charset=utf8;DRIVER={DRIVER};Port=1433;`              |

<div class='note'>

Some installations of MariaDB/MySQL may require an ALTERNATE_PORT (3rd-party hosting providers or parallel installations) to be added to the SERVER_IP, e.g., `mysql://user:password@SERVER_IP:ALTERNATE_PORT/DB_NAME?charset=utf8mb4`.

</div>

<div class='note'>

When using a MariaDB or MySQL server, adding `+pymysql` to the URL will use the pure Python MySQL library, which is slower but may be required if the C MySQL library is not available. 

When using the official Docker image, the C MySQL library will always be available. `pymysql` is most commonly used with `venv` where the C MySQL library is not installed.

</div>

<div class='note'>

Unix Socket connections always bring performance advantages over TCP, if the database is on the same host as the `recorder` instance (i.e., `localhost`).

</div>

<div class='note warning'>

If you want to use Unix Sockets for PostgreSQL you need to modify the `pg_hba.conf`. See [PostgreSQL](#postgresql)

</div>

<div class='note warning'>

If you are using the default `FULL` recovery model for MS SQL Server you will need to manually backup your log file to prevent your transaction log from growing too large. It is recommended you change the recovery model to `SIMPLE` unless you are worried about data loss between backups.

</div>

### Database startup

If you are running a database server instance on the same server as Home Assistant then you must ensure that this service starts before Home Assistant. For a Linux instance running Systemd (Raspberry Pi, Debian, Ubuntu and others) you should edit the service file.
To help facilitate this, db_max_retry and db_retry_wait variables have been added to ensure the recorder retries the connection to your database enough times, for your database to start up.

```bash
sudo nano /etc/systemd/system/home-assistant@homeassistant.service
```

and add the service for the database, for example, PostgreSQL:

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

If you are in a virtual environment, don't forget to activate it before installing the `mysqlclient` Python package described below.

```bash
pi@homeassistant:~ $ sudo -u homeassistant -H -s
homeassistant@homeassistant:~$ source /srv/homeassistant/bin/activate
(homeassistant) homeassistant@homeassistant:~$ pip3 install mysqlclient
```

For MariaDB you may have to install a few dependencies. If you're using MariaDB version 10.2, `libmariadbclient-dev` was renamed to `libmariadb-dev`. If you're using MariaDB 10.3, the package `libmariadb-dev-compat` must also be installed. For MariaDB v10.0.34 only `libmariadb-dev-compat` is needed. Please install the correct packages based on your MariaDB version.

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

### MS SQL Server

For MS SQL Server you will have to install a few dependencies:

```bash
sudo apt-get install unixodbc-dev
pip3 install pyodbc
```

If you are in a virtual environment, don't forget to activate it before installing the pyodbc package.

```bash
sudo -u homeassistant -H -s
source /srv/homeassistant/bin/activate
pip3 install pyodbc
```

You will also need to install an ODBC Driver. Microsoft ODBC drivers are recommended, however FreeTDS is available for systems that are not supported by Microsoft. Instructions for installing the Microsoft ODBC drivers can be found [here](https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server).

<div class='note'>

If you are using Hass.io, FreeTDS is already installed for you. The db_url you need to use is `mssql+pyodbc://username:password@SERVER_IP/DB_NAME?charset=utf8mb4;DRIVER={FreeTDS};Port=1433;`.

</div>
