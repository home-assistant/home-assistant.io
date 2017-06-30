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

This allows you to set up a [Samba](https://samba.org/) server to access hass.io folders using Windows network shares.

```json
{
  "name": "hassio",
  "workgroup": "WORKGROUP",
  "guest": true,
  "map_config": true,
  "map_addons": true,
  "map_ssl": false,
  "username": "",
  "password": ""
}
```

Configuration variables:

- **name** (*Optional*): default `hassio`. Set netbios name of hassio device.
- **workgroup** (*Optional*): default `WORKGROUP`. Set network workgroup.
- **guest** (*Optional*): Allow login without a username or password. Defaults to `true`.
- **map_config** (*Optional*): Expose Home Assistant configuration folder. Defaults to `true`.
- **map_addons** (*Optional*): Expose local custom addons folder. Defaults to `true`.
- **map_ssl** (*Optional*): Expose SSL folder. Be careful with this option! Defaults to `false`.
- **username** (*Optional*): The username for logging in if guest login is not used.
- **password** (*Optional*): Password for `username`. An empty password is not supported.
