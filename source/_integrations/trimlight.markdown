---
title: Trimlight
description: Instructions on how to control Trimlight Edge Pro lights in Home Assistant.
ha_categories:
  - lighting.led_strips_controllers
ha_release: '2026.12'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@spdevpro'
  - '@bsholy'
ha_domain: trimlight
ha_platforms:
  - light
ha_integration_type: device
ha_quality_scale: bronze
ha_zeroconf: true
---

The **Trimlight** {% term integration %} lets you control [Trimlight](https://trimlight.com/) Edge Pro permanent lighting over your local network. For example, you can schedule your outdoor lights to turn off at bedtime.

## Supported devices

The integration supports **Trimlight Edge Pro** controllers.

## Unsupported devices

Earlier Trimlight Edge controllers are not supported.

## Prerequisites

1. Set up your Trimlight Edge Pro controller in the Trimlight app.
2. Make sure the controller is powered on and connected to the same network as Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "Hostname or IP address of your Trimlight controller."
{% endconfiguration_basic %}

## Supported functionality

The **Trimlight** integration provides the following entities.

### Lights

Each Trimlight Edge Pro controller provides one [light](/integrations/light/) entity.

- **Light**
  - **Description**: Turns the lights on or off and sets their brightness and static color. The entity uses the controller's name by default.
  - **Remarks**: The available color and white-channel controls depend on the LED type configured on the controller. Supported types are RGB, RGB with one white channel (RGBW), and RGB with cold and warm white channels (RGBWW).

## Trimlight automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: Turn on the lights at sunset

This example turns on the lights at 50% brightness with a static orange color at sunset.

- **Trigger**: Sunset
- **Action**: Turn on light
  - **Target**: Trimlight Edge Pro (`light.trimlight_edge_pro`)
  - **Brightness**: 50%
  - **Color**: Orange

{% details "YAML example for turning on the lights at sunset" %}

Replace `light.trimlight_edge_pro` with the entity ID of your Trimlight light.

{% example %}
automation: |
  alias: "Turn on Trimlight lights at sunset"
  triggers:
    - trigger: sun.sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.trimlight_edge_pro
      data:
        brightness_pct: 50
        rgb_color: [255, 128, 0]
{% endexample %}

{% enddetails %}

## Data updates

The integration polls each controller every 30 seconds. Commands from Home Assistant update the displayed light state immediately; the next successful poll checks the controller's actual state and corrects any differences.

## Known limitations

Scene selection and individual zone control are not supported.

## Removing the integration

{% include integrations/remove_device_service.md %}
