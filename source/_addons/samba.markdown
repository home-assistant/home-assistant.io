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

This add-on allows you to set up a [Samba](https://samba.org/) server to access Hass.io folders using Windows network shares.

<p class='note warning'>
It is <strong>strongly recommended to set a username and password</strong>. By using guest mode, you expose your configuration and secrets to every user in local network.<br />
Also be careful when setting up port forwarding for remote access. If you don't restrict access by setting a username and password, your configuration could be exposed to the entire internet!
</p>

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

{% configuration %}
name:
  description: Set netbios name of Hass.io device.
  required: false
  default: "`hassio`"
  type: string
workgroup:
  description: Set network workgroup name.
  required: false
  default: "`WORKGROUP`"
  type: string
guest:
  description: Allow login without a username or password.
  required: false
  default: true
  type: boolean
map:
  description: Control which folders will be exposed.
  required: false
  type: map
  keys:
    config:
      description: The Home Assistant configuration folder
      required: false
      default: true
      type: boolean
    addons:
      description: The local custom addons repository
      required: false
      default: true
      type: boolean
    share:
      description: The folder that can be accessed by add-ons and Home Assistant
      required: false
      default: true
      type: boolean
    backup:
      description: Access to snapshot files
      required: false
      default: true
      type: boolean
    ssl:
      description: Certificate storage (Careful! Sharing is set to `false` by default)
      required: false
      default: false
      type: boolean
username:
  description: Username for logging in if guest login is not used.
  required: false
  type: string
password:
  description: Password for `username`. An empty password is not supported.
  required: false
  type: string
interface:
  description: Interface that will start the share. Normally this is `eth0` for ethernet wired connection and `wlan0` for wireless connection. If you are running on an Intel NUC this could also be `enp3s0` for ethernet or `wlp5s0` for wireless connection.
  required: false
  type: string
allow_hosts:
  description: The hosts that are allowed to connect to your Samba server. By default it is limited to people within the same local network.
  required: false
  default: '`["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"]`'
  type: list
{% endconfiguration %}
