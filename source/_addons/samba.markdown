---
title: "Samba"
description: "Manage your Home Assistant and custom add-ons over Samba."
featured: true
---

This add-on allows you to set up a [Samba](https://www.samba.org) server to access Hass.io folders using Windows network shares.

<div class='note warning'>

Be careful when setting up port forwarding for remote access. If you don't restrict access by setting a username and strong password, your configuration could be exposed to the entire Internet!

</div>

<div class='note'>

Sometimes shares will not show up under network in Windows. Then you could open the file browser, click the address field where it says "> Network" and type `\\HASSIO` to access Hass.io shares.

</div>

```json
{
  "workgroup": "WORKGROUP",
  "username": "",
  "password": "",
  "interface": "eth0",
  "allow_hosts": [
      "10.0.0.0/8",
      "172.16.0.0/12",
      "192.168.0.0/16"
  ],
  "veto_files": [
      "._*",
      ".DS_Store",
      "Thumbs.db",
      "icon?",
      ".Trashes"
  ]
}
```

{% configuration %}
workgroup:
  description: Set network workgroup name.
  required: false
  default: "`WORKGROUP`"
  type: string
username:
  description: Username for logging in.
  required: true
  type: string
password:
  description: Password for `username`. An empty password is not supported.
  required: true
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
veto_files:
  description: List of files that are neither visible nor accessible. Useful to stop clients from littering the share with temporary hidden files (e.g. macOS .DS_Store, Windows Thumbs.db)
  required: false
  default: '`["._*", ".DS_Store", "Thumbs.db", "icon?", ".Trashes"]`'
  type: list
{% endconfiguration %}
