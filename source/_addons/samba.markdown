---
layout: page
title: "Samba"
description: "Manage your Home Assistant and custom addons over Samba."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Setup a [samba](https://samba.org/) server. Allow to access severals hass.io folders with windows network shares.

```json
{
  "workgroup": "WORKGROUP",
  "guest": true,
  "map_config": true,
  "map_addons": true,
  "map_ssl": false,
  "username": "",
  "password": ""
}
```

Option variables:

- **workgroup** (*Optional*): default `WORKGROUP`. Set network workgroup.
- **guest** (*Optional*): default true. Allow login without a username or password.
- **map_config** (*Optional*): default true. Expose homeassistant config folder.
- **map_addons** (*Optional*): default true. Expose local custom addons folder.
- **map_ssl** (*Optional*): default false. Expose ssl folder. Be carfuly with that option!
- **username** (*Optional*): default empty. The username for login if guest login is not active.
- **password** (*Optional*): default empty. Set the password for `username`. A empty password will be not supported.
