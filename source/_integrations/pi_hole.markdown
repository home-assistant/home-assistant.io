---
title: "Pi-hole"
description: "Instructions on how to integrate Pi-hole with Home Assistant."
ha_category:
  - System Monitor
ha_iot_class: Local Polling
logo: pi_hole.png
ha_release: 0.28
---

The `pi_hole` integration allows you to retrieve statistics and interact with a single [Pi-hole](https://pi-hole.net/) system.

## Configuration

To enable this integration with the default configuration, add the following lines to your `configuration.yaml` file

```yaml
# Example configuration.yaml entry
pi_hole:
```

{% configuration %}
host:
  description: >
    The hostname (and port), e.g., '192.168.0.3:4865' of the host where Pi-hole is running. If your Pi-Hole instance is the Hass.io add-on, you *must* specify port `4865`.
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
  description: >
    Verify the SSL/TLS certificate of the system. If your Pi-Hole instance uses a self-signed certificate, you should specify `false`.
  required: false
  type: boolean
  default: true
api_key:
  description: API Key for interacting with the Pi-hole. This is not required if you want to just query the Pi-hole for usage statistics.  API Key may need to be set to null ( "" ) when using the Pi Hole addon for HASSIO
  required: false
  type: string
  default: None
{% endconfiguration %}

### Full example

```yaml
# Example configuration.yaml entry
pi_hole:
  host: 'localhost:4865'
  ssl: false
  verify_ssl: false 
  api_key: ""
```

## Services

The platform provides the following services to interact with your Pi-hole.

### Service `pi_hole.disable`

Disable your Pi-hole for the specified amount of time.

| Service data attribute | Required | Type | Description |
| ---------------------- | -------- | -------- | ----------- |
| `duration` | `True` | timedelta | Time for which Pi-hole should be disabled | 

_Note: This service requires `api_key` to be specified in the configuration._

### Service `pi_hole.enable`

Enable your Pi-hole.

_Note: This service requires `api_key` to be specified in the configuration._

This integration was not made by Pi-hole LLC or the Pi-hole community. They did not provide support, feedback, testing, or any other help during its creation. This is a third party platform which may break if Pi-hole changes their API in a later release. It is not official, not developed, not supported, and not endorsed Pi-hole LLC or the Pi-hole community. The trademark `Pi-hole` and the logo is used here to describe the platform. `Pi-hole` is a registered trademark of Pi-hole LLC.
