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
---

The `anel_pwrctrl` switch platform allows you to control [ANEL PwrCtrl](https://anel-elektronik.de/SITE/produkte/produkte.htm) devices.

Supported devices (tested):

- PwrCtrl HUT

To add this platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: anel_pwrctrl
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
  description: The port to receive data from the device.
  required: true
  type: integer
port_send:
  description: The port to send data to the device.
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

<div class="note">

If no **host** is given the platform will try to auto-discover all devices on the network, that are listening on the given **port_recv**.

</div>
