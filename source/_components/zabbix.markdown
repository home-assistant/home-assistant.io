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

## {% linkable_title Configuration %}

To set the Zabbix component up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
zabbix:
  host: 192.168.0.100
```

{% configuration %}
host:
  description: Your Zabbix server.
  required: true
  type: string
path:
  description: Path to your Zabbix install.
  required: false
  type: string
  default: "`/zabbix/`"
ssl:
  description: Set to `true` if your Zabbix installation is using SSL.
  required: false
  type: boolean
  default: false
username:
  description: Your Zabbix username.
  required: false
  type: string
password:
  description: Your Zabbix password.
  required: false
  type: string
{% endconfiguration %}

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
