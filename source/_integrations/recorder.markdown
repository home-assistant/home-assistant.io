---
title: Recorder
description: Instructions on how to configure the data recorder for Home Assistant.
logo: home-assistant.png
ha_category:
  - History
ha_release: pre 0.7
ha_quality_scale: internal
---

The `recorder` integration is responsible for storing details in a database, which then are handled by the [`history` integration](/integrations/history/).

Home Assistant uses [SQLAlchemy](https://www.sqlalchemy.org/), which is an Object Relational Mapper (ORM). This means that you can use **any** SQL backend for the recorder that is supported by SQLAlchemy, like [MySQL](https://www.mysql.com/), [MariaDB](https://mariadb.org/), [PostgreSQL](https://www.postgresql.org/), or [MS SQL Server](https://www.microsoft.com/en-us/sql-server/).

The default database engine is [SQLite](https://www.sqlite.org/) which doesn't require any configuration. The database is stored in your Home Assistant configuration directory (`.homeassistant` or '/config/' in Hass.io) and called `home-assistant_v2.db`.

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
    purge_keep_days:
      description: Specify the number of history days to keep in recorder database after a purge.
      required: false
      default: 10
      type: integer
    purge_interval:
      description: How often (in days) the purge task runs. If a scheduled purge is missed (e.g., if Home Assistant was not running), the schedule will resume soon after Home Assistant restarts. You can use the [service](#service-purge) call `purge` when required without impacting the purge schedule. If this is set to `0` (zero), automatic purging is disabled.
      required: false
      default: 1
      type: integer
    exclude:
      description: Configure which integrations should be excluded from recordings.
      required: false
      type: map
      keys:
        domains:
          description: The list of domains to be excluded from recordings.
          required: false
          type: list
        entities:
          description: The list of entity ids to be excluded from recordings.
          required: false
          type: list
    include:
      description: Configure which integrations should be included in recordings. If set, all other entities will not be recorded.
      required: false
      type: map
      keys:
        domains:
          description: The list of domains to be included in the recordings.
          required: false
          type: list
        entities:
          description: The list of entity ids to be included in the recordings.
          required: false
          type: list
{% endconfiguration %}

Defining domains and entities to `exclude` (aka. blacklist) is convenient when you are basically happy with the information recorded, but just want to remove some entities or domains. Usually, these are entities/domains that do not change (like `weblink`) or rarely change (like `updater` or `automation`).

```yaml
# Example configuration.yaml entry with exclude
recorder:
  purge_keep_days: 5
  db_url: sqlite:////home/user/.homeassistant/test
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

define domains and entities to record by using the `include` configuration (aka. whitelist) is convenient if you have a lot of entities in your system and your `exclude` lists possibly get very large, so it might be better just to define the entities or domains to record.

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
```

If you only want to hide events from your history, take a look at the [`history` integration](/integrations/history/). The same goes for the [logbook](/integrations/logbook/). But if you have privacy concerns about certain events or want them in neither the history or logbook, you should use the `exclude`/`include` options of the `recorder` integration. That way they aren't even in your database, you can reduce storage and keep the database small by excluding certain often-logged events (like `sensor.last_boot`).

### Service `purge`

Call the service `recorder.purge` to start a purge task which deletes events and states older than x days, according to `keep_days` service data.

| Service data attribute | Optional | Description                                                                                                                                                           |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `keep_days`            | yes      | The number of history days to keep in recorder database (defaults to the integration `purge_keep_days` configuration)                                                 |
| `repack`               | yes      | Rewrite the entire database, possibly saving some disk space. Only supported for SQLite and requires at least as much disk space free as the database currently uses. |

## Custom database engines

| Database engine        | `db_url`                                                                                     |
| :--------------------- | :------------------------------------------------------------------------------------------- |
| SQLite                 | `sqlite:////PATH/TO/DB_NAME`                                                                 |
| MariaDB                | `mysql+pymysql://SERVER_IP/DB_NAME?charset=utf8`                                             |
| MariaDB                | `mysql+pymysql://user:password@SERVER_IP/DB_NAME?charset=utf8`                               |
| MariaDB (omit pymysql) | `mysql://user:password@SERVER_IP/DB_NAME?charset=utf8`                                       |
| MySQL                  | `mysql://SERVER_IP/DB_NAME?charset=utf8`                                                     |
| MySQL                  | `mysql://user:password@SERVER_IP/DB_NAME?charset=utf8`                                       |
| PostgreSQL             | `postgresql://SERVER_IP/DB_NAME`                                                             |
| PostgreSQL             | `postgresql://user:password@SERVER_IP/DB_NAME`                                               |
| PostgreSQL (Socket)    | `postgresql://@/DB_NAME`                                                                     |
| MS SQL Server          | `mssql+pyodbc://username:password@SERVER_IP/DB_NAME?charset=utf8;DRIVER={DRIVER};Port=1433;` |

<div class='note'>

Some installations of MariaDB/MySQL may require an ALTERNATE_PORT (3rd-party hosting providers or parallel installations) to be added to the SERVER_IP, e.g., `mysql://user:password@SERVER_IP:ALTERNATE_PORT/DB_NAME?charset=utf8`.

</div>

<div class='note'>

If using an external MariaDB backend (e.g., running on a separate NAS) with Home Assistant, you should omit `pymysql` from the URL. `pymysql` is not included in the base docker image, and is not necessary for this to work.

</div>

<div class='note'>

Unix Socket connections always bring performance advantages over TCP, if the database is on the same host as the `recorder` instance (i.e. `localhost`).

</div>

<div class='note warning'>

If you want to use Unix Sockets for PostgreSQL you need to modify the `pg_hba.conf`. See [PostgreSQL](#postgresql)

</div>

<div class='note warning'>

If you are using the default `FULL` recovery model for MS SQL Server you will need to manually backup your log file to prevent your transaction log from growing too large. It is recommended you change the recovery model to `SIMPLE` unless you are worried about data loss between backups.

</div>

### Database startup

If you are running a database server instance on the same server as Home Assistant then you must ensure that this service starts before Home Assistant. For a Linux instance running Systemd (Raspberry Pi, Debian, Ubuntu and others) then you should edit the service file.

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

For PostgreSQL you may have to install a few dependencies:

```bash
sudo apt-get install postgresql-server-dev-X.Y
pip3 install psycopg2
```

For using Unix Sockets, add the following line to your [`pg_hba.conf`](https://www.postgresql.org/docs/current/static/auth-pg-hba-conf.html):

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

You will also need to install an ODBC Driver. Microsoft ODBC drivers are recommended, however FreeTDS is available for systems that are not supported by Microsoft. Instrucitons for installing the Microsoft ODBC drivers can be found [here](https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server).

<div class='note'>

If you are using Hass.io, FreeTDS is already installed for you. The db_url you need to use is `mssql+pyodbc://username:password@SERVER_IP/DB_NAME?charset=utf8;DRIVER={FreeTDS};Port=1433;`.

</div>
