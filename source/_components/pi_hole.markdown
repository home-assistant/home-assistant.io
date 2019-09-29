---
title: "Pi-hole Sensor"
description: "Instructions on how to integrate Pi-hole sensors into Home Assistant."
ha_category:
  - System Monitor
ha_iot_class: Local Polling
logo: pi_hole.png
ha_release: 0.28
---

The `pi_hole` integration allows you to retrieve and display statistics from a single [Pi-hole](https://pi-hole.net/) system.

## Configuration

To enable this integration with the default configuration, add the following lines to your `configuration.yaml` file

```yaml
# Example configuration.yaml entry
pi_hole:
```

{% configuration %}
host:
  description: >
    The hostname (and port), e.g. '192.168.0.3:4865' of the host where Pi-hole is running.


    **Note:** If your Pi-Hole instance is the Hass.io add-on, you *must* specify port `4865`.
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
  host: 'localhost:4865'
  ssl: false
  verify_ssl: false
```

This integration was not made by Pi-hole LLC or the Pi-hole community. They did not provide support, feedback, testing, or any other help during its creation. This is a third party platform which may break if Pi-hole changes their API in a later release. It is not official, not developed, not supported, and not endorsed Pi-hole LLC or the Pi-hole community. The trademark `Pi-hole` and the logo is used here to describe the platform. `Pi-hole` is a registered trademark of Pi-hole LLC.
