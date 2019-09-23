---
title: "Pi-hole Sensor"
description: "Instructions on how to integrate Pi-hole sensors into Home Assistant."
ha_category:
  - System Monitor
ha_iot_class: Local Polling
logo: pi_hole.png
ha_release: 0.28
redirect_from:
 - /components/sensor.pi_hole/
---

The `pi_hole` integration allows you to retrieve and display statistics from a [Pi-hole](https://pi-hole.net/) system.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml` file for a GET request:

```yaml
# Example configuration.yaml entry
pi_hole:
```

{% configuration %}
host:
  description: IP address of the host where Pi-hole is running.
  required: false
  type: string
  default: pi.hole
location:
  description: The installation location of the Pi-hole API.
  required: false
  type: string
  default: admin
ssl:
  description: "If `true`, use SSL/TLS to connect to the Pi-Hole system."
  required: false
  type: boolean
  default: false
verify_ssl:
  description: Verify the certification of the system.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

### Full example

```yaml
# Example configuration.yaml entry
pi_hole:
  host: IP_ADDRESS

sensor:
  - platform: pi_hole
```

This integration was not made by Pi-hole LLC or the Pi-hole community. They did not provide support, feedback, testing, or any other help during its creation. This is a third party platform which may break if Pi-hole changes their API in a later release. It is not official, not developed, not supported, and not endorsed Pi-hole LLC or the Pi-hole community. The trademark `Pi-hole` and the logo is used here to describe the platform. `Pi-hole` is a registered trademark of Pi-hole LLC.
