---
title: Keenetic NDMS2 Routers
description: Instructions on how to integrate Keenetic NDMS2 Routers into Home Assistant.
ha_category:
  - Presence Detection
ha_release: 0.54
ha_codeowners:
  - '@foxel'
ha_domain: keenetic_ndms2
---

This integration offers presence detection by examining devices connected to a [Keenetic](https://keenetic.net/)
Router running NDMS2 firmware.

To use a Keenetic router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: keenetic_ndms2
    host: YOUR_HOST
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
host:
  description: The IP address of your router, e.g., 192.168.1.1.
  required: true
  type: string
port:
  description: The Telnet port of your router.
  required: false
  default: 23
  type: integer
username:
  description: The username to login into the router (user should have read access to telnet interface of the router).
  required: true
  type: string
password:
  description: The password for the specified username.
  required: true
  type: string
interface:
  description: Ihe internal name of the interface to get devices connected to. For expert users only.
  required: false
  default: Home
  type: string
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
