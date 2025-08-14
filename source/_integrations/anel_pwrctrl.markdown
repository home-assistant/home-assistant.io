---
title: Anel NET-PwrCtrl
description: Instructions on how to integrate ANEL PwrCtrl switches within Home Assistant.
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: '0.30'
ha_domain: anel_pwrctrl
ha_platforms:
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `anel_pwrctrl` switch platform allows you to control [ANEL PwrCtrl](https://en.anel.eu/index.htm?src=/produkte/produkte.htm) devices on firmware 6.x and older. [ANEL PwrCtrl](https://en.anel.eu/index.htm?src=/produkte/produkte.htm) devices on firmware 7.x are not supported.

Supported devices (tested):

- PwrCtrl HUT
- PwrCtrl Advanced
- PwrCtrl Advanced Power

To add this platform to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
switch:
  - platform: anel_pwrctrl
    host: IP_ADDRESS
    port_recv: PORT
    port_send: PORT
    username: USERNAME
    password: PASSWORD
```

{% configuration %}
host:
  description: The IP address or hostname of your PwrCtrl device.
  required: false
  type: string
port_recv:
  description: The port on which the device receives data.
  required: true
  type: integer
port_send:
  description: The port from which the device sends data.
  required: true
  type: integer
username:
  description: The username for your device.
  required: true
  type: string
password:
  description: The password for your device.
  required: true
  type: string
{% endconfiguration %}

{% note %}
If no **host** is given the platform will try to auto-discover all devices on the network, that are listening on the given **port_recv**.
{% endnote %}
