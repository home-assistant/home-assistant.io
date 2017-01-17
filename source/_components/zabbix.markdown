---
layout: page
title: "Zabbix"
description: "Instructions how to integrate Zabbix into Home Assistant."
date: 2016-12-13 22:57
sidebar: true
comments: false
sharing: true
footer: true
logo: g
ha_category: 
featured: false
ha_release: 0.35
---

The Zabbix component is the main component to connect to a Zabbix monitoring instance via the Zabbix API.

```yaml
zabbix:
  host: 192.168.0.100
  username: zabbix_user
  password: zabbix_password
```

Configuration variables:
- **host** (*Required*): Your Zabbix server.
- **path** (*Optional*): Path to your Zabbix install. Defaults to `/zabbix/`.
- **ssl** (*Optional*): Set to `True` if your Zabbix installation is using SSL. Default to `False`.
- **username** (*Optional*): Your Zabbix username.
- **password** (*Optional*): Your Zabbix password.

### {% linkable_title Full configuration %}

```yaml
# Example configuration.yaml entry
zoneminder:
  host: ZABBIX_HOST
  path: ZABBIX_PATH
  ssl: False
  username: USERNAME
  password: PASSWORD
```
