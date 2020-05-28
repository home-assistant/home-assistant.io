---
title: Pi-hole
description: Instructions on how to integrate Pi-hole with Home Assistant.
ha_category:
  - System Monitor
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 0.28
ha_codeowners:
  - '@fabaff'
  - '@johnluetke'
  - '@shenxn'
ha_domain: pi_hole
---

The `pi_hole` integration allows you to retrieve statistics and interact with a [Pi-hole](https://pi-hole.net/) system.

## Configuration

To enable this integration, go to the Integrations page inside the configuration panel. You can also use YAML configuration. Add the following lines to your `configuration.yaml` file

```yaml
# Example configuration.yaml entry
pi_hole:
  - host: IP_ADDRESS
```

{% configuration %}
host:
  description: >
    The hostname (and port), e.g.,  '192.168.0.3:4865' of the host where Pi-hole is running. Home Assistant add-on users should be sure to specify port `4865`. 
  required: true
  type: string
name:
  description: >
    The name for this Pi-hole. This name will be a part of the sensors created, e.g.,  `name: My Awesome Pi-hole` would result in sensor names beginning with `sensor.my_awesome_pi_hole_`.

    **Note:** If you configure multiple Pi-Holes, each one *must* have a unique name.
  required: false
  type: string
  default: Pi-hole
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
  description: API Key for interacting with the Pi-hole. This is not required if you want to just query the Pi-hole for usage statistics.
  required: false
  type: string
  default: None
{% endconfiguration %}

### Full examples

Single Pi-hole running via Home Assistant add-on:

```yaml
pi_hole:
  - host: 'localhost:4865'
```

Multiple Pi-holes:

```yaml
pi_hole:
  - host: '192.168.0.2'
  - host: '192.168.0.3'
    name: 'Secondary Pi-Hole'
```

Pi-hole with a self-signed certificate:

```yaml
pi_hole:
  - host: 'pi.hole'
    ssl: true
    verify_ssl: false
```

Pi-hole with an `api_key` that allows it to be enabled or disabled:

```yaml
pi_hole:
  - host: 'pi.hole'
    api_key: !secret pi_hole_api_key
```

## Services

The platform provides the following services to interact with your Pi-hole.

### Service `pi_hole.disable`

Disables configured Pi-hole(s) for the specified amount of time.

| Service data attribute | Required | Type | Description |
| ---------------------- | -------- | -------- | ----------- |
| `duration` | `True` | timedelta | Time for which Pi-hole should be disabled |
| `name` | `False` | string | If preset, disables the named Pi-hole, otherwise, disables all configured Pi-holes |

_Note: This service requires `api_key` to be specified in the configuration._

### Service `pi_hole.enable`

Enables configured Pi-holes(s).

| Service data attribute | Required | Type | Description |
| ---------------------- | -------- | -------- | ----------- |
| `name` | `False` | string | If preset, enables the named Pi-hole, otherwise, enables all configured Pi-holes |

_Note: This service requires `api_key` to be specified in the configuration._

This integration was not made by Pi-hole LLC or the Pi-hole community. They did not provide support, feedback, testing, or any other help during its creation. This is a third party platform which may break if Pi-hole changes their API in a later release. It is not official, not developed, not supported, and not endorsed Pi-hole LLC or the Pi-hole community. The trademark `Pi-hole` and the logo is used here to describe the platform. `Pi-hole` is a registered trademark of Pi-hole LLC.
