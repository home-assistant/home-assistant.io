---
title: Salt Fiber Box
description: Instructions on how to integrate Salt Fiber Box router into Home Assistant.
ha_category:
  - Presence Detection
ha_iot_class: Local Polling
ha_codeowners:
  - '@bjornorri'
ha_release: 0.106
ha_domain: salt
---

The `salt` platform offers presence detection by looking at connected devices to a [Salt Fiber Box](https://fiber.salt.ch/en/fiber/equipment/fiber-box) router from [Salt](https://www.salt.ch), which is an internet provider in Switzerland.

<div class='note'>
The router only allows one user session at a time. If you log into the router's web interface, the platform will stop updating until you log out.
</div>

## Configuration

To use a Salt Fiber Box router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: salt
    host: 192.168.1.1
    username: admin
    password: YOUR_PASSWORD
```

{% configuration %}
host:
  description: The IP address of your router, e.g. `192.168.1.1`.
  required: true
  type: string
username:
  description: The username used to log into the router's web interface, e.g. `admin`.
  required: true
  type: string
password:
  description: The password used to log into the router's web interface.
  required: true
  type: string
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
