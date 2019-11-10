---
title: "MariaDB"
description: "MariaDB Server is one of the most popular database servers in the world."
---

Set up a [MariaDB](https://mariadb.org/) SQL server. It supports multiple databases, users and permission settings. If you want to only connect from inside Home Assistant use `core-mariadb` as the host address.

```json
{
  "databases": ["homeassistant"],
  "logins": [
    {
      "username": "hass",
      "host": "%.local.hass.io",
      "password": "securePassword"
    }
  ],
  "rights": [
    {
      "username": "hass",
      "host": "%.local.hass.io",
      "database": "homeassistant",
      "grant": "ALL PRIVILEGES ON"
    }
  ]
}
```

{% configuration %}
databases:
  description: List of databases.
  required: true
  type: list
logins:
  description: List of SQL accounts to create or update.
  required: true
  type: list
  keys:
    username:
      description: Username for account.
      required: true
      type: string
    host:
      description: Host for account. Use '%', to accept connections for this account from any host.
      required: true
      type: string
    password:
      description: Password for account.
      required: true
      type: string
rights:
  description: List of rights to be granted.
  required: true
  type: list
  keys:
    username:
      description: Username for granted rights.
      required: true
      type: string
    host:
      description: Host is a part of username like above.
      required: true
      type: string
    database:
      description: Database name on which to grant user rights.
      required: true
      type: string
    grant:
      description: SQL grant part for access too.
      required: true
      type: string
{% endconfiguration %}

## Home Assistant configuration

Use the following configuration in Home Assistant to use the database above:

```yaml
recorder:
  db_url: mysql://hass:securePassword@core-mariadb/homeassistant?charset=utf8
```
