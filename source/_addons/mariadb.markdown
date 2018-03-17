---
layout: page
title: "MariaDB"
description: "MariaDB Server is one of the most popular database servers in the world."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Set up a [mariadb](https://mariadb.org/) SQL server. It supports multiple databases, users, and permission settings. If you want to only connect from inside Home Assistant use `core-mariadb` as the host address.

```json
{
  "databases": ["homeassistant"],
  "logins": [
    {
      "username": "hass",
      "host": "homeassistant",
      "password": "securePassword"
    }
  ],
  "rights": [
    {
      "username": "hass",
      "host": "homeassistant",
      "database": "homeassistant",
      "grant": "ALL PRIVILEGES ON"
    }
  ]
}
```

Configuration variables:

- **databases** (*Require*): List of databases.
- **logins** (*Require*): List of SQL accounts to create or update.
  - **username** (*Require*): Username for account.
  - **host** (*Require*): Host for account. If you need an account on multiple hosts, use '%'.
  - **password** (*Require*): Password for account.
- **rights** (*Require*): List of rights to be granted.
  - **username** (*Require*): Username for granted rights.
  - **host** (*Require*): Host is a part of username like above.
  - **database** (*Require*): Database name on which to grant user rights.
  - **grant** (*Require*): SQL grant part for access too.

## {% linkable_title Home Assistant configuration %}

Use the following configuration in Home Assistant to use the database above:

```yaml
recorder:
  db_url: mysql://hass:securePassword@core-mariadb/homeassistant
```
