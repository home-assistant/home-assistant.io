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
  - '@balloob'
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

The Philips Hue integration allows you to control and monitor the lights and sensors connected to your Hue bridge.

There is currently support for the following device types within Home Assistant:

- Lights
- Motion sensors (including temperature and light level sensors)
- Hue remotes/switches (as device triggers for automations and also exposed as battery sensors when they are battery-powered)

{% include integrations/config_flow.md %}

## Lights for Hue zones and rooms

The Hue concept is based on Rooms and Zones. Although the underlying Hue lights are exposed directly to Home Assistant, it might also be useful to interact with the `grouped lights` of the Hue ecosystem, for example, to turn all lights in a Hue group on/off at the same time.

Home Assistant creates lights for each Hue zone/room automatically but disables them by default.
If you'd like to use those `grouped lights`, you can enable them from Settings --> Integrations --> Hue --> entities.

## Scenes

In the Hue concept you can create (dynamic) scenes for the lights within rooms and zones. You can create, edit and delete Hue scenes from the (official) Hue app on iOS and Android. Each Zone/Room can have its own scenes assigned and there is a large library of preset scenes for specific moods. These Hue scenes are automatically imported in Home Assistant and they're available as `scene entities`. Creating or editing Hue scenes in Home Assistant is not supported.

It is advised to use Hue scenes for controlling multiple lights at once for a smooth experience. If you individually control multiple lights and/or use Home Assistant scenes, each light command will be sent to each light one by one which doesn't give a very good user experience, while using a Hue scene sends commands to all lights at once in an optimized way, resulting in a smooth experience.

### Action `hue.activate_scene`

To have more control over Hue scenes we've implemented a secondary, more advanced action to activate a Hue scene and set some properties at the same time, such as the Dynamic mode and/or brightness.

| Data attribute | Required | Description                                                                                   |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------- |
| `entity_id`            | yes      | Entity ID of the Hue Scene entity you want to activate.                                       |
| `transition`           | no       | Transition duration (in seconds) it takes to bring devices to the state defined in the scene. |
| `dynamic`              | no       | Enable (true) or Disable (false) dynamic mode for the scene.                                  |
| `speed`                | no       | Set the speed (of the dynamic palette) for this scene.                                        |
| `brightness`           | no       | Set the brightness for this scene.                                                             |

You can use this action for example if you'd like to start/stop Dynamic Mode.

## Hue remotes and switches

Hue remotes such as the Dimmer Switch are stateless devices, meaning that they do not have an on/off state like regular entities in Home Assistant. Instead, such devices emit the event `hue_event` when a button is pressed. You can test what events come in using the event {% my developer_events title="developer tools in Home Assistant" %} and subscribe to the `hue_event`. Once you know what the event data looks like, you can use this to create automations.

{% note %}
At the time of writing, there's a limitation on the Hue API that each device can only send one event per second. This means that button events are rate-limited to 1 per second. This is brought to the attention of Signify and it will hopefully be fixed soon.
{% endnote %}

## Support for legacy (V1) Hue bridges

Philips/Signify released a new version of their Hue bridge (square shape) and their legacy/V1 bridge (round shape) is now end of life and no longer supported by them. Home Assistant will continue to support the V1 Hue bridge as long as it is technically possible, although with a few limitations:

- Scene entities are not automatically created for V1 bridges. To activate a Hue scene on a V1 bridge from Home Assistant we provide an action to active it the Hue scene by name.
- State updates for devices/entities on a V1 bridges are not received instantly but polled on interval.
- Light entities for Hue rooms are not automatically created for V1 bridges, you can opt-in for creating entities for rooms within the Integration's options.

For v1 Hue bridges, you can create a script using the **Scripts** tab.  
1. Select **Add New Script** > **Add Action** > **Philips Hue: Activate Scene**
2. Then select the appropriate room name in the **Group** field and the scene name in the **Scene** field stored on your Hue bridge.
