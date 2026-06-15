---
title: Philips Hue
description: Instructions on setting up Philips Hue within Home Assistant.
ha_category:
  - Hub
  - Light
ha_iot_class: Local Push
featured: true
ha_release: '0.60'
ha_config_flow: true
ha_codeowners:
  - '@marcelveldt'
ha_domain: hue
ha_homekit: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - event
  - light
  - scene
  - sensor
  - switch
ha_zeroconf: true
ha_integration_type: hub
---

The **Philips Hue** {% term integration %} allows you to control and monitor the lights and sensors connected to your Hue bridge. The integration supports:

- Lights
- Motion sensors (including temperature and light level sensors)
- Remotes and switches (as device triggers for automations, and also exposed as battery sensors when they are battery-powered)

{% include integrations/config_flow.md %}

## Lights for Hue zones and rooms

The Hue concept is based on Rooms and Zones. Although the underlying Hue lights are exposed directly to Home Assistant, it might also be useful to interact with the `grouped lights` of the Hue ecosystem, for example, to turn all lights in a Hue group on/off at the same time.

Home Assistant creates lights for each Hue zone and room automatically but disables them by default. To enable them, go to {% my integrations title="**Settings** > **Devices & services**" %}, select the **Philips Hue** integration, and enable the grouped light entities you want to use.

## Scenes

You can create, edit, and delete Hue scenes from the official Hue app on iOS and Android. Each room and zone can have its own scenes, and there is a large library of preset scenes for specific moods. These Hue scenes are automatically imported into Home Assistant and available as scene entities. Creating or editing Hue scenes in Home Assistant is not supported.

Using Hue scenes is recommended when you want to control multiple lights at once. If you control multiple lights individually or use Home Assistant scenes, each command is sent to each light one by one. A Hue scene sends commands to all lights at once in an optimized way, resulting in a smoother experience.

## Configuration options

After setting up the integration, the following options can be configured by going to {% my integrations title="**Settings** > **Devices & services**" %}, selecting the **Philips Hue** integration, and selecting **Configure**.

### V2 bridges (square shape)

{% configuration_basic %}
Ignore connectivity status for the given devices:
  description: "Select devices for which the connectivity (availability) status should be ignored. This is useful for battery-powered devices like remotes that are reported as unavailable when they go to sleep."
{% endconfiguration_basic %}

### V1 bridges (round shape)

{% configuration_basic %}
Allow Hue groups:
  description: "When enabled, creates light entities for Hue rooms."
Allow unreachable bulbs to report their state correctly:
  description: "When enabled, allows bulbs that are reported as unreachable by the bridge to still report their last known state."
{% endconfiguration_basic %}

## Hue remotes and switches

Hue remotes such as the Dimmer Switch are stateless devices, meaning that they do not have an on/off state like regular entities in Home Assistant. Instead, these devices emit the event `hue_event` when a button is pressed. You can test what events come in by going to {% my developer_events title="**Settings** > **Developer tools** > **Events**" %} and subscribing to `hue_event`. Once you know what the event data looks like, you can use it to create automations.

{% note %}
The Hue API limits each device to one event per second. This means that button events are rate-limited to one per second.
{% endnote %}

## Support for legacy (V1) Hue bridges

Signify released a newer version of the Hue bridge (square shape), and the legacy V1 bridge (round shape) is now end of life and no longer supported by Signify. Home Assistant will continue to support the V1 Hue bridge as long as it is technically possible, with the following limitations:

- Scene entities are not automatically created for V1 bridges. To activate a Hue scene on a V1 bridge from Home Assistant, use the **Activate scene** action and refer to the scene by its group and scene name.
- State updates for devices on V1 bridges are not received instantly but polled on an interval.
- Light entities for Hue rooms are not automatically created for V1 bridges. You can opt in to creating room entities in the integration's options.

To activate a scene on a V1 bridge:

1. Go to **Scripts** and select **Add New Script** > **Add Action** > **Philips Hue: Activate Scene**.
2. Select the room name in the **Group** field and the scene name in the **Scene** field.

{% include integrations/actions.md %}

## Data updates

V2 Hue bridges (square shape) push state changes to Home Assistant instantly over their local event stream. V1 Hue bridges (round shape) are polled on an interval because the V1 API does not support push updates.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
