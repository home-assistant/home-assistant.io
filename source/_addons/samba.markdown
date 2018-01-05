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
    "ssl": false
  },
  "username": "",
  "password": "",
  "interface": "eth0"
}
```

Configuration variables:

- **name** (*Optional*): default `hassio`. Set netbios name of hassio device.
- **workgroup** (*Optional*): default `WORKGROUP`. Set network workgroup.
- **guest** (*Optional*): Allow login without a username or password. Defaults to `true`.
- **map** (*Optional*): Control which folder will be expose. `config` is for Home Assistant configuration folder. `addons` for local custom repositiory. `share` is a folder that can access from add-ons and Home Assistant too. `backup` for access to snapshot files. `ssl` for certificate storage, be careful with this option! Defaults all to `true`, except for `ssl`.
- **username** (*Optional*): The username for logging in if guest login is not used.
- **password** (*Optional*): Password for `username`. An empty password is not supported.
- **interface** (*Optional*): Interface on that will start the share. Normally is `eth0` for ethernet wired connection and `wlan0` for wireless connection.
