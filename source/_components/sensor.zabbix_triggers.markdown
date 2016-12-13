---
layout: page
title: "Zabbix Triggers Sensor"
description: "Instructions how to integrate Zabbix Triggers sensors within Home Assistant."
date: 2016-12-13 22:57
sidebar: true
comments: false
sharing: true
footer: true
logo: 
ha_category: Sensor
ha_release: 0.35
---


The `zabbix_triggers` sensor platform let you monitor the current count of active triggers for your [Zabbix](http://www.zabbix.com/) monitoring instance.

<p class='note'>
You must have the [Zabbix component](/components/zabbix/) configured to use those sensors.
</p>

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: zabbix_triggers
    name: Important Hosts Trigger Count
    hostids: [10051,10081,10084]
    individual: true
```

Configuration variables:

- **include_archived** (*Optional*): Whether to include archived ZoneMinder events in event counts. Default is `false`.
- **name** (*Optional*): Allows you to specify the name for the Sensor, otherwise the host name, as stored in Zabbix, is used.  This is useful when you are specifying a list of hostids to monitor as a single count.
- **hostids** (*Optional*): This is a list of Zabbis hostids that we want to filter our count on.
- **individual** (*Optional*): A 'true'/'false' to specify whether we should show individual sensors when a list of hostsids is provided.  If false, the sensor state will be the count of all triggers for the specified hosts (or all hosts within the Zabbix instance, if hostids isn't provided).

