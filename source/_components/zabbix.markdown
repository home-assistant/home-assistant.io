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
ha_category:
  - System Monitor
  - Sensor
ha_release: 0.37
ha_iot_class: Local Polling
redirect_from:
  - /components/sensor.zabbix/
---

The `zabbix` component is the main component to connect to a [Zabbix](http://www.zabbix.com/) monitoring instance via the Zabbix API.

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)

## {% linkable_title Configuration %}

To set the Zabbix component up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
zabbix:
  host: IP_ADDRESS
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

## {% linkable_title Sensor %}

The `zabbix` sensor platform let you monitor the current count of active triggers for your [Zabbix](http://www.zabbix.com/) monitoring instance.

<p class='note'>
You must have the <a href="#configuration">Zabbix component</a> configured to use those sensors.
</p>

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: zabbix
    triggers:
      name: Important Hosts Trigger Count
      hostids: [10051,10081,10084]
      individual: true
```

{% configuration %}
triggers:
  description: Specifies that this sensor is for Zabbix 'triggers'. In the future there will be other Zabbix sensors.
  required: true
  type: string
name:
  description: Allows you to specify the name for the Sensor, otherwise the host name, as stored in Zabbix, is used. This is useful when you are specifying a list of hostids to monitor as a single count.
  required: false
  type: string
hostids:
  description: This is a list of Zabbix hostids that we want to filter our count on.
  required: false
  type: string
individual:
  description: A 'true'/'false' to specify whether we should show individual sensors when a list of hostids is provided. If false, the sensor state will be the count of all triggers for the specified hosts (or all hosts within the Zabbix instance, if hostids isn't provided).
  required: false
  type: boolean
{% endconfiguration %}