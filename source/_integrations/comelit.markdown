---
title: Comelit SimpleHome
description: Instructions on how to integrate Comelit SimpleHome home automation devices into Home Assistant.
ha_category:
  - Alarm
  - Climate
  - Cover
  - Humidifier
  - Light
  - Sensor
  - Switch
ha_release: '2023.9'
ha_domain: comelit
ha_config_flow: true
ha_codeowners:
  - '@chemelli74'
ha_iot_class: Local Polling
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - climate
  - cover
  - diagnostics
  - humidifier
  - light
  - sensor
  - switch
ha_integration_type: hub
ha_quality_scale: silver
---

The **Comelit SimpleHome** {% term integration %} allows you to control your [Comelit home automation devices](https://comelitgroup.it/installatore/offerta/home-building-automation/).

The integration provides information on connected devices and enables control of the alarm system.

## Supported devices

There is support for the following devices within Home Assistant:

- **Comelit Serial Bridge**
- **Comelit VEDO System**

{% include integrations/config_flow.md %}

{% configuration_basic %}
  host:
    description: The IP address of the Comelit SmartHome device.
  port:
    description: The TCP port of the Comelit SmartHome device. The default is port 80 (standard for HTTP).
  pin:
    description: The PIN of the Comelit SmartHome device.
  type:
    description: The type of Comelit SmartHome device.
    keys:
      bridge:
        description: Comelit Serial Bridge.
      vedo:
        description: Comelit VEDO System.
{% endconfiguration_basic %}

## Examples

### Automation: Activate the alarm when you leave home

```yaml
automation:
- alias: "Arm alarm away"
  id: "arm_alarm_away"
  triggers:
    - platform: state
      entity_id: person.simone
      to: "not_home"
  actions:
    - action: alarm_control_panel.alarm_arm_away
      target:
        entity_id: alarm_control_panel.home
      data:
        code: "12345"
```

### Automation: Close the covers at sunset if you are not at home

```yaml
automation:
- alias: Close covers at sunset
  id: "covers_close_sunset"
  trigger:
   - platform: sun
     event: sunset
  condition:
    conditions:
      - alias: "condition alias (not home)"
        condition: state
        entity_id: group.person_family
        state: "not_home"
  action:
    entity_id:
      - cover.group_home_covers
    service: cover.close_cover
```

## Data updates

This integration {% term polling polls %} data from the device every 5 seconds by default.

## Supported functionality

The **Comelit SimpleHome** {% term integration %} provides the following entities:

### Comelit Serial Bridge

- Climate
- Cover
- Dehumidifier
- Humidifier
- Light
- Sensor - power consumption
- Switch - irrigation and sockets (other)

### Comelit VEDO System

- Alarm control panel - per area
- Binary sensor - per zone presence detection
- Sensor - per zone status

## Troubleshooting

### Can’t set up the device

#### Symptom: "Cannot connect"

When trying to set up the integration, the form shows the message "Cannot connect".

##### Description

This means that the IP address or the port specified is wrong.

##### Resolution

To resolve this issue, verify the device’s IP address and port by navigating to them in a web browser.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
