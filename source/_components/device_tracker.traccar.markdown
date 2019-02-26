---
layout: page
title: "Traccar GPS tracker"
description: "Instructions how to use Traccar GPS tracker to track devices in Home Assistant."
date: 2018-11-04 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: traccar.png
ha_release: 0.83
ha_category: Presence Detection
ha_iot_class: "Local Polling"
---

`Traccar` uses GPS for tracking and has support for over 1500 different types of devices.

## {% linkable_title Configuration %}

To integrate Traccar GPS tracker in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: traccar
    host: IP_ADDRESS
    username: USERNAME
    password: PASSWORD
```

{% configuration %}
host:
  description: The DNS name or IP Address of the server running Traccar.
  required: true
  type: string
username:
  description: The username for the Traccar server.
  required: true
  type: string
password:
  description: The password for your given account on the Traccar server.
  required: true
  type: string
host:
  description: The DNS name or IP Address of the server running Traccar.
  required: true
  type: string
port:
  description: The port of your Traccar server.
  required: false
  default: 8082
  type: integer
ssl:
  description: Use HTTPS to connect to Traccar server. *NOTE* A host *cannot* be an IP address when this option is enabled.
  required: false
  default: false
  type: boolean
verify_ssl:
  description: Verify the certification of the system.
  required: false
  type: boolean
  default: true
monitored_conditions:
  description: Additional traccar computed attributes or device-related attributes to include in the scan.
  required: false
  type: list
{% endconfiguration %}

The parameter `monitored_conditions` allows you to track non standard attributes from the traccar platform and use them in your Home Assistant. For example if you need to monitor the state of the non standard attribute `alarm` and a custom computed attribute `mycomputedattribute` just fill the configuration with:

```yaml
device_tracker:
  - platform: traccar
    ...
    monitored_conditions: ['alarm', 'mycomputedattribute']
```
