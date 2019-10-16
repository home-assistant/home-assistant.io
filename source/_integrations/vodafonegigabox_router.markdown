---
title: "Vodafone Gigabox"
description: "Instructions on how to integrate Vodafone Gigabit router into Home Assistant."
logo: vodafone.svg
ha_category:
  - Presence Detection
ha_release: 0.100.3
---

The `vodafonegigabox` device tracker platform offers presence detection by looking at devices connected to a [Vodafone Gigabox router](https://n.vodafone.ie/business/products-and-solutions/fixed-communications/gigabox.html) as used by Vodafone Ireland.

## Configuration

To use a Vodafone Gigabox router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: vodafonegigabox_router
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
