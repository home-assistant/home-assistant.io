---
title: Casper Glow
description: Instructions on how to integrate Casper Glow lights into Home Assistant.
ha_category:
  - Binary Sensor
  - Button
  - Light
  - Select
  - Sensor
ha_bluetooth: true
ha_release: 2026.4
ha_iot_class: Local Polling
ha_codeowners:
  - '@mikeodr'
ha_domain: casper_glow
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - light
  - select
  - sensor
ha_integration_type: device
ha_quality_scale: platinum
---

The **Casper Glow** {% term integration %} allows you to control your [Casper Glow](https://casper.com/products/glow) light from Home Assistant over Bluetooth. The Casper Glow is a portable dimmable light designed as a sleep aid, featuring a gentle dimming sequence that gradually lowers brightness to help you fall asleep. You can incorporate it into your bedtime automations to control brightness levels.

## Supported devices

The following devices are supported:

- Casper Glow (identified as "Jar" over Bluetooth)

## Prerequisites

Before setting up the integration, make sure:

1. Your Home Assistant host has a Bluetooth adapter.
2. The Casper Glow is powered on and within Bluetooth range.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Bluetooth address:
  description: "The Bluetooth address of your Casper Glow light. Discovered devices are shown automatically."
{% endconfiguration_basic %}

## Supported functionality

### Entities

The **Casper Glow** {% term integration %} provides the following entities.

#### Binary sensors

- **Dimming paused**
  - **Description**: Indicates whether the Glow's dimming sequence is currently paused.
- **Charging**
  - **Description**: Indicates whether the Glow is currently charging.

#### Buttons

- **Pause dimming**
  - **Description**: Pauses dimming, holding the current brightness level until resumed.

- **Resume dimming**
  - **Description**: Resumes dimming from where it left off.

#### Lights

- **Casper Glow**
  - **Description**: Controls the on/off state and brightness of the Glow light. Brightness is mapped to five levels.

#### Sensors

- **Battery**
  - **Description**: Reports the current battery level of the Glow as a percentage.

- **Dimming end time** (disabled by default)
  - **Description**: Shows the projected time when the current dimming sequence will end. This value is a timestamp that updates only when there is a significant change during a poll interval. Such as pausing or resuming dimming, or manually adjusting the physical light.

#### Selects

- **Dimming time**
  - **Description**: Configures how long the dimming sequence lasts before the light turns off. You can choose between 15, 30, 45, 60, or 90 minutes. The new dimming time takes effect the next time the light is turned on.

## Examples

### Bedtime routine

Start a dimming sequence at a set time each night. This blueprint lets you pick your bedtime and how long the light takes to dim, so your Glow is ready when you are.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/casper_glow_bedtime_routine.yaml" %}

{% details "Example YAML" %}

{% example %}
automation: |
  triggers:
    - trigger: time
      at: "22:00:00"
  actions:
    - action: select.select_option
      target:
        entity_id: select.jar_dimming_time
      data:
        option: "30"
    - action: light.turn_on
      target:
        entity_id: light.jar
{% endexample %}

{% enddetails %}

### Pause on motion

Keep the light from dimming while you're still up. This blueprint pauses the dimming sequence whenever motion is detected, so the light holds its brightness until you settle in.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/casper_glow_pause_on_motion.yaml" %}

{% details "Example YAML" %}

{% example %}
automation: |
  triggers:
    - trigger: state
      entity_id: binary_sensor.bedroom_motion
      to: "on"
  conditions:
    - condition: state
      entity_id: light.jar
      state: "on"
  actions:
    - action: button.press
      target:
        entity_id: button.jar_pause_dimming
{% endexample %}

{% enddetails %}

### Turn on and hold at nightlight level

Turn on the Glow and let it dim down to a soft nightlight, then hold it there. This blueprint starts the dimming sequence and automatically pauses it when a set number of minutes remain, leaving a gentle glow in the room through the night.

{% note %}
The `sensor.jar_dimming_end_time` sensor is disabled by default. You must enable it manually for this blueprint to work correctly.
{% endnote %}

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/casper_glow_turn_on_pause_nightlight.yaml" %}

{% details "Example YAML" %}

{% example %}
automation: |
  triggers:
    - trigger: time
      at: "22:00:00"
  actions:
    - action: select.select_option
      target:
        entity_id: select.jar_dimming_time
      data:
        option: "30"
    - action: light.turn_on
      target:
        entity_id: light.jar
    - wait_for_trigger:
        - trigger: template
          value_template: >-
            {% set end = states('sensor.jar_dimming_end_time') | as_datetime %}
            {% if end is not none %}
              {{ ((end - now()).total_seconds() / 60) | round(0) <= 10 }}
            {% else %}
              false
            {% endif %}
      timeout:
        minutes: 30
      continue_on_timeout: false
    - action: button.press
      target:
        entity_id: button.jar_pause_dimming
{% endexample %}

{% enddetails %}

## Data updates

The **Casper Glow** {% term integration %} detects the device through passive Bluetooth advertisements. All state updates are retrieved by actively {% term polling %} the device every 30 seconds — for example, to detect changes made directly on the light or through the Casper app.

## Known limitations

- Brightness is limited to five discrete levels. The integration maps these to the Home Assistant 0-255 brightness scale, snapping to the nearest supported level.
- The integration communicates over Bluetooth, so the light must remain within range of the Home Assistant Bluetooth adapter.
- Only one Bluetooth connection to the Glow can be active at a time. If the Casper app is connected, Home Assistant may not be able to reach the device.

## Troubleshooting

### The device is not discovered

Make sure the Glow light is powered on and within Bluetooth range. If it still doesn't appear, try toggling the light off and on by flipping it over. Ensure no other Bluetooth device (like the Casper app) is actively connected to it.

### The light shows as unavailable

This typically means the Bluetooth connection was lost. Check that the light is powered on and within range. Moving the light closer to the Bluetooth adapter may help.

### Resetting the light

If the light remains unresponsive, a reboot or factory reset may help.

- To reboot, hold both buttons on the Glow until it briefly turns on. This takes about 30 seconds.
- To factory reset the Glow, press one of the buttons 6 times while holding the other button down.
  - This returns the device to default settings and removes it from any configured Glow light groups (configured outside Home Assistant in the Casper app).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
