---
layout: page
title: "Samba"
description: "Manage your Home Assistant and custom add-ons over Samba."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
featured: true
---

This addon allows you to set up a [Samba](https://samba.org/) server to access Hass.io folders using Windows network shares.

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
  "interface": "eth0",
  "allow_hosts": [
      "10.0.0.0/8",
      "172.16.0.0/12",
      "192.168.0.0/16"
  ]
}
```

Configuration variables:

- **name** (*Optional*): Set netbios name of Hass.io device. Default is `hassio`.
- **workgroup** (*Optional*): Set network workgroup name. Default is `WORKGROUP`.
- **guest** (*Optional*): Allow login without a username or password. Default is `true`.
- **map** (*Optional*): Control which folders will be exposed. `config` shares the Home Assistant configuration folder. `addons` shares the local custom repository. `share` shares a folder that can be accessed by add-ons and Home Assistant. `backup` shares access to snapshot files. `ssl` shares certificate storage. Be careful with the `ssl` option! Defaults are all set to `true`, except for `ssl`.
- **username** (*Optional*): Username for logging in if guest login is not used.
- **password** (*Optional*): Password for `username`. An empty password is not supported.
- **interface** (*Optional*): Interface that will start the share. Normally this is `eth0` for ethernet wired connection and `wlan0` for wireless connection. If you are running on an Intel NUC this could also be `enp3s0` for ethernet or `wlp5s0` for wireless connection.
- **allow_hosts** (*Optional*): The hosts that are allowed to connect to your Samba server. By default it is limited to people within the same local network.

<p class='note warning'>
Be careful when setting up port forwarding to the remote access. If you don't restrict access by requiring authentication and guest access is enabled, your configuration could be exposed to the internet!
</p>
