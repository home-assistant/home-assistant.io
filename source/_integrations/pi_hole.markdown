---
title: Pi-hole
description: Instructions on how to integrate Pi-hole with Home Assistant.
ha_category:
  - Sensor
  - Switch
  - System Monitor
  - Update
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 0.28
ha_codeowners:
  - '@johnluetke'
  - '@shenxn'
ha_domain: pi_hole
ha_platforms:
  - binary_sensor
  - sensor
  - switch
  - update
ha_integration_type: integration
---

The Pi-hole integration allows you to retrieve statistics and interact with a
[Pi-hole](https://pi-hole.net/) system.

{% include integrations/config_flow.md %}

Please note, that during the integration set up, an API key can be provided.
Providing one, gives access to the Pi-Hole `disable` service and a switch
to enable/disable Pi-Hole from Home Assistant.

## Services

The platform provides the following services to interact with your Pi-hole. Use switch entities when calling the services.

### Service `pi_hole.disable`

Disables configured Pi-hole(s) for the specified amount of time.

| Service data attribute | Required | Type | Description |
| ---------------------- | -------- | -------- | ----------- |
| `entity_id` | `False` | string | Target switch entity. Use `all` to target all Pi-hole services |
| `duration` | `True` | timedelta | Time for which Pi-hole should be disabled |

Example service call:

```yaml
# Example service call to disable Pi-Hole for 30 minutes
service: pi_hole.disable
data:
  duration: '00:30'
target:
  entity_id: all
```
