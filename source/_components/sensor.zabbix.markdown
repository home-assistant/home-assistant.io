---
layout: page
title: "Zabbix Sensor"
description: "Instructions on how to integrate Zabbix Triggers and Item sensors within Home Assistant."
sidebar: true
comments: false
sharing: true
footer: true
logo: zabbix.png
ha_category: System Monitor
ha_release: 0.37
ha_iot_class: "Local Polling"
---

The `zabbix` sensor platform let you monitor the current count of active triggers for your [Zabbix](http://www.zabbix.com/) monitoring instance, as well as loading items to fetch their latest value as sensors.

<p class='note'>
You must have the [Zabbix component](/components/zabbix/) configured to use those sensors.
</p>

## Trigger Count Sensors

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
  description: Specifies that this sensor is for Zabbix 'triggers'.
  required: true
  type: string
name:
  description: Allows you to specify the name for the Sensor, otherwise the host name, as stored in Zabbix, is used.  This is useful when you are specifying a list of hostids to monitor as a single count.
  required: false
  type: string
hostids:
  description: This is a list of Zabbix hostids that we want to filter our count on.
  required: false
  type: string
individual:
  description: A 'true'/'false' to specify whether we should show individual sensors when a list of hostids is provided.  If false, the sensor state will be the count of all triggers for the specified hosts (or all hosts within the Zabbix instance, if hostids isn't provided).
  required: false
  type: boolean
{% endconfiguration %}

## Item Value Sensors

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: zabbix
    items:
      - id: 12345
        name: Important Host Disk Usage
      - id: 67890
        name: Other Host CPU Usage
```

{% configuration %}
items:
  description: Specifies that this sensor is for Zabbix 'items'.
  required: true
  type: string
name:
  description: Allows you to specify the name for the Sensor, otherwise the item name, as stored in Zabbix, is used.
  required: false
  type: string
id:
  description: This is a single Zabbix itemid to retrieve the data for.
  required: true
  type: string
{% endconfiguration %}
