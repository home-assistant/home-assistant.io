---
title: "Xiaomi Router"
description: "Instructions on how to integrate Xiaomi routers into Home Assistant."
logo: xiaomi.png
ha_category:
  - Presence Detection
ha_release: 0.36
---

The `xiaomi` platform offers presence detection by looking at connected devices to a [Xiaomi](http://miwifi.com) router.

## Setup

To use an Xiaomi router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: xiaomi
    host: YOUR_ROUTER_IP
    password: YOUR_ADMIN_PASSWORD
```

{% configuration %}
host:
  description: "The IP address of your router, e.g., `192.168.0.1`."
  required: true
  type: string
username:
  description: The admin username.
  required: false
  default: admin
  type: string
password:
  description: The password for the admin account.
  required: true
  type: string
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.

### Compatibility test

To ensure that your router is compatible, navigate to `http://YOUR_ROUTER_IP/api/misystem/devicelist`.
You should see a listing of the device currently connected to your router.
