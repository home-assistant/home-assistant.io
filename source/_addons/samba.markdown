---
layout: page
title: "Samba"
description: "Manage your Home Assistant and custom addons over Samba."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
featured: true
---

This allows you to set up a [Samba](https://samba.org/) server to access hass.io folders using Windows network shares.

```json
{
  "name": "hassio",
  "workgroup": "WORKGROUP",
  "guest": true,
  "map": {
    "config": true,
    "addons": true,
    "share": true,
    "backup": true,
    "ssl": false,
  },
  "username": "",
  "password": "",
  "interface": "eth0"
}
```

Configuration variables:

- **name** (*Optional*): Set netbios name of hassio device. Default is `hassio`.
- **workgroup** (*Optional*): Set network workgroup name. Default is `WORKGROUP`.
- **guest** (*Optional*): Allow login without a username or password. Default is `true`.
- **map** (*Optional*): Control which folders will be exposed. `config` shares the Home Assistant configuration folder. `addons` shares the local custom repositiory. `share` shares a folder that can be accessed by add-ons and Home Assistant. `backup` shares access to snapshot files. `ssl` shares certificate storage. Be careful with the `ssl` option! Defaults are all set to `true`, except for `ssl`.
- **username** (*Optional*): Username for logging in if guest login is not used.
- **password** (*Optional*): Password for `username`. An empty password is not supported.
- **interface** (*Optional*): Interface that will start the share. Normally this is `eth0` for ethernet wired connection and `wlan0` for wireless connection.
