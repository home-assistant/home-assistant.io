---
title: NETGEAR
description: Instructions on how to integrate NETGEAR routers into Home Assistant.
ha_category:
  - Presence Detection
ha_iot_class: Local Polling
ha_release: pre 0.7
ha_domain: netgear
ha_config_flow: true
---

This platform allows you to detect presence by looking at connected devices to a [NETGEAR](https://www.netgear.com/) device.

## Configuration

There are two ways to integrate NETGEAR in Home Assistant.

### Via the frontend

Menu: *Configuration* -> *Integrations*. Search for "NETGEAR", fill the configuration form, click submit.

### Via the configuration file

Add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: netgear
    password: YOUR_ADMIN_PASSWORD
```

{% configuration %}
host:
  description: The IP address of your router, e.g., `192.168.1.1`. If none provided autodetection of the URL will be used, like `http://routerlogin.net`.
  required: false
  type: string
port:
  description: The port your router communicates with.
  required: false
  default: 5000
  type: integer
ssl:
  description: Determine if HTTPS should be used.
  required: false
  default: false
  type: boolean
username:
  description: The username of a user with administrative privileges.
  required: false
  default: admin
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
{% endconfiguration %}


List of models that are known to use port 80:

- Nighthawk X4S - AC2600 (R7800)
- Orbi
- XR500

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
