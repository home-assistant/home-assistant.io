---
layout: page
title: "Zabbix"
description: "Instructions on how to integrate Zabbix into Home Assistant."
date: 2016-12-13 22:57
sidebar: true
comments: false
sharing: true
footer: true
logo: zabbix.png
ha_category: System Monitor
featured: false
ha_release: 0.37
ha_iot_class: "Local Polling"
---

The `zabbix` component is the main component to connect to a [Zabbix](http://www.zabbix.com/) monitoring instance via the Zabbix API.

To set the Zabbix component up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
zabbix:
  host: 192.168.0.100
```

Configuration variables:

- **host** (*Required*): Your Zabbix server.
- **path** (*Optional*): Path to your Zabbix install. Defaults to `/zabbix/`.
- **ssl** (*Optional*): Set to `true` if your Zabbix installation is using SSL. Default to `false`.
- **username** (*Optional*): Your Zabbix username.
- **password** (*Optional*): Your Zabbix password.

### {% linkable_title Full configuration %}

```yaml
# Example configuration.yaml entry
zabbix:
  host: ZABBIX_HOST
  path: ZABBIX_PATH
  ssl: false
  username: USERNAME
  password: PASSWORD
```
