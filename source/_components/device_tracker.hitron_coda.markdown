---
layout: page
title: "Hitron CODA Routers"
description: "Instructions on how to integrate Hitron CODA Routers into Home Assistant."
date: 2017-10-03 15:40
sidebar: true
comments: false
sharing: true
footer: true
logo: hitron.png
ha_category: Presence Detection
ha_release: 0.58
---

This component offers presence detection by examining devices connected to a [Rogers Hitron CODA](https://www.rogers.com/customer/support/article/wi-fi-password-hitron-coda4582-cgn3amr-cgnm3552-cgn3acr-cgn3)
Router.

To use a Hitron router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: hitron_coda
    host: !secret router_ip
    username: !secret router_username
    password: !secret router_password
```

{% configuration %}
host:
  description: The IP address of your router, e.g., `192.168.0.1`.
  required: true
  type: string
username:
  description: The username to login into the router (user should have read access to the web interface of the router). Usually "cusadmin".
  required: true
  type: string
password:
  description: The password for the specified username. Usually your WiFi password.
  required: true
  type: string
{% endconfiguration %}

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
