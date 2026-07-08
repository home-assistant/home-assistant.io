---
title: Uptime
description: Instructions on how to integrate an uptime sensor into Home Assistant.
ha_category:
  - Sensor
  - Utility
ha_iot_class: Local Push
ha_release: 0.56
ha_quality_scale: internal
ha_domain: uptime
ha_platforms:
  - sensor
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_integration_type: service
---

The **Uptime** {% term integration %} provides a sensor that stores the date and time when Home Assistant was last started. This is useful for automations that should behave differently right after a restart, for example, to avoid triggering actions while devices are still coming online.

{% include integrations/config_flow.md %}

## Supported functionality

### Sensors

- **Uptime**
  - **Description**: The date and time when Home Assistant was last started.
  - **Device class**: Timestamp. The state is a UTC datetime.

The sensor value is set once at startup and does not change until Home Assistant is restarted again.

## Examples

### Skipping automations right after a restart

You can use the uptime sensor in a condition to prevent an automation from running within the first few minutes after Home Assistant starts. This avoids false triggers while devices and integrations are still initializing.

```yaml
conditions:
  - condition: template
    value_template: >
      {{
        now() - as_datetime(states('sensor.uptime'))
        > timedelta(minutes=5)
      }}
```

This condition passes only when Home Assistant has been running for more than 5 minutes.

## Data updates

The sensor value is set once when Home Assistant starts and is not polled or updated after that.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
