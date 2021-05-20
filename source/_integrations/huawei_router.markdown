---
title: Huawei Router
description: Instructions on how to integrate Huawei Routers into Home Assistant.
ha_category:
  - Presence Detection
ha_iot_class: Local Polling
ha_release: 0.51
ha_codeowners:
  - '@abmantis'
ha_domain: huawei_router
ha_platforms:
  - device_tracker
---

The `huawei` device tracker platform offers presence detection by looking at connected devices to a [Huawei router](http://m.huawei.com/enmobile/enterprise/products/network/access/pon-one/hw-371813.htm).

Currently, this was only tested with the Huawei HG8245W5, HG8247H, HS8247W and HG8247Q Smart Router (used by Vodafone Portugal).

## Configuration

To use a Huawei router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: huawei_router
    host: 192.168.1.1
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
host:
  description: The IP address of your router, e.g., 192.168.1.1.
  required: true
  type: string
username:
  description: The username to login into the router (the same used through the router's web interface).
  required: true
  type: string
password:
  description: The password for the specified username.
  required: true
  type: string
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
