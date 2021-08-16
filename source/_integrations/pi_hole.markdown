---
title: Pi-hole
description: Instructions on how to integrate Pi-hole with Home Assistant.
ha_category:
  - System Monitor
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 0.28
ha_codeowners:
  - '@fabaff'
  - '@johnluetke'
  - '@shenxn'
ha_domain: pi_hole
ha_platforms:
  - binary_sensor
  - sensor
  - switch
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

You can add the following to your `configuration.yaml` file if want to create a template switch which will disable Pi-Hole temporarily as opposed to turning off the main `switch` component provided by the integration. You can turn the switch on before the timer expires for an immediate effect or just leave it to turn itself on after timer expires.

{% raw %}

```yaml
# Example configuration.yaml entry
switch:
  - platform: template
    switches:
      pihole_temp_disable:
        friendly_name: "Disable Pi-Hole for 30 min"
        value_template: "{{ is_state('switch.pi_hole', 'on') }}"
        turn_on:
          service: switch.turn_on
          target:
            entity_id: switch.pi_hole
        turn_off:
          service: pi_hole.disable
          data:
            duration: '00:30'
          target:
            entity_id: switch.pi_hole
```
{% endraw %}
