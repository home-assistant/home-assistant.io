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
- **db_url** (*Optional*): The URL which point to your database. 


```yaml
# Example configuration.yaml entry
recorder:
  purge_days: 5
  db_url: sqlite:///home/user/.homeassistant/test
```

| Database engine | `db_url`                                                 | 
| :---------------|:---------------------------------------------------------|
| SQLite          | `sqlite:///PATH/TO/DB_NAME`                              |
| MySQL           | `mysql://SERVER_IP/DB_NAME`                              |
| MySQL           | `mysql://user:password@SERVER_IP/DB_NAME`                |
| PostgreSQL      | `postgresql://SERVER_IP/DB_NAME`                         |
| PostgreSQL      | `postgresql://scott:tiger@SERVER_IP/DB_NAME`             |

## {% linkable_title Installation notes %}

Not all Python bindings for the choosen database engine can be installed directly. This section contains additional details which should help you to get it working. 

### {% linkable_title MYSQL %}

For MySQL you may have to install a few dependencies:

```bash
$ sudo apt-get install libmysqlclient-dev
$ pip3 install mysqlclient
```

