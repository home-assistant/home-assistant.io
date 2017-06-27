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

Set up a [mariadb](https://mariadb.org/) SQL server. It support multible database, users and permission.

```json
{
  "databases": ["homeassistant"],
  "logins": [
    {
      "username": "hass",
      "host": "localhost",
      "password": null
    }
  ],
  "rights": [
    {
      "username": "hass",
      "host": "localhost",
      "database": "homeassistant",
      "grant": "ALL PRIVILEGES ON"
    }
  ]
}
```

Configuration variables:

- **databases** (*Require*): Listen of databases.
- **logins** (*Require*): Listen of logindata they will create or update.
  - **username** (*Require*): Username for login.
  - **host** (*Require*): Host for login, if you need a login with multibe hosts, use '%'.
  - **password** (*Require*): Password for login.
- **rights** (*Require*): Listen of rights to be handle.
  - **username** (*Require*): Username for grant rights.
  - **host** (*Require*): Host is a part of username like above.
  - **database** (*Require*): Database name to grant this user rights to.
  - **grant** (*Require*): SQL grant part for access too.
