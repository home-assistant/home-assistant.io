---
layout: page
title: "HA Dockermon Switch"
description: "Instructions on how to set up HA Dockermon switches within Home Assistant."
date: 2018-11-11 00:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: System Monitor
ha_release: "0.83"
ha_iot_class: "Local Polling"
---

The `hadockermon` switch platform allows you to control containers that are managed by [HA Dockermon][hadockermon].

### {% linkable_title Configuration %}

Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: hadockermon
    host: HOST_ADDRESS
```

{% configuration %}
host:
  description: The DNS name or IP Address of the HA Dockermon instance.
  required: true
  type: string
username:
  description: The username for the HA Dockermon instance.
  required: true
  type: string
password:
  description: The password for your given account on the HA Dockermon instance.
  required: true
  type: string
port:
  description: The port of the HA Dockermon instance.
  required: false
  default: 8126
  type: integer
ssl:
  description: Use HTTPS to connect the HA Dockermon instance. *NOTE* A host *cannot* be an IP address when this option is enabled.
  required: false
  default: false
  type: boolean
verify_ssl:
  description: Verify the certification of the system.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

[hadockermon]: https://github.com/philhawthorne/ha-dockermon