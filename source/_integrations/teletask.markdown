---
title: Teletask
description: Instructions on how to integrate Teletask components with Home Assistant.
ha_category:
  - Hub
ha_release: 0.115
ha_iot_class: Local Push
ha_codeowners:
  - '@tiemooowh'
ha_domain: teletask
---

The [Teletask](https://www.teletask.be) integration for Home Assistant allows you to connect to Teletask/IP devices.

The integration requires a local Teletask DoIP Micros+ or Picos interface with a DoIP license TDS15132.

There is currently support for the following device types within Home Assistant:

- [Light](/integrations/light.teletask)
- [Switch](/integrations/switch.teletask)


## Configuration

To use your Teletask bus in your installation, add the following lines to your `configuration.yaml` file:

```yaml
teletask:
  host: 192.168.1.1
  port: 55957
```

{% configuration %}
host:
  description: The FQDN or IP address where the Teletask Central Control Unit is hosted
  required: true
  type: string
port:
  description: The port where the DoIP endpoints are running on (default is 55957).
  required: true
  type: integer
{% endconfiguration %}