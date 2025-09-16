---
title: Qbus
description: Instructions on how to integrate your Qbus installation with Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Cover
  - Hub
  - Light
  - Scene
  - Sensor
  - Switch
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - light
  - scene
  - sensor
  - switch
ha_iot_class: Local Push
ha_codeowners:
  - '@Qbus-iot'
  - '@thomasddn'
ha_release: 2025.2
ha_domain: qbus
ha_integration_type: hub
ha_config_flow: true
ha_quality_scale: bronze
---

The **Qbus** {% term integration %} allows you to integrate your [Qbus Control](https://www.qbus.be) into Home Assistant. **Qbus** is a Belgian manufacturer of Home Automation systems.

## Prerequisites

This integration communicates with a **Qbus** controller over an MQTT server.

The controllers cannot communicate directly with MQTT. Therefore, you need to install the Qbus gateway before enabling this integration. The Qbus gateway is a software tool that runs on all Linux platforms. It can be installed by running a script or a Docker container. For detailed instructions, please refer to the [Qbus MQTT Gateway documentation](https://github.com/Qbus-iot/qbus-mqttgw).

For information on setting up Home Assistant with a **Qbus** controller, refer to the [Qbus documentation](https://iot.qbus.be/). The documentation is currently only available in Dutch, but translations are planned for the future.

Once the Qbus controller is connected to the MQTT server, you need to set up an MQTT client in Home Assistant to enable communication between Home Assistant and your **Qbus** system. This client should connect to the same MQTT Server as your Qbus controller. For detailed instructions, refer to the [MQTT integration documentation](https://www.home-assistant.io/integrations/mqtt/).

{% include integrations/config_flow.md %}

## Supported devices

There is currently support for the following **Qbus** products within Home Assistant:

- **CTD01E to CTD03E (CTD 3.0)**: main controllers (yellow).
- **CTD10 to CTDMax (CTD 3.5)**: main controllers (black).

## Available entities

- **Binary sensor**: display values from weather stations and controller information.
- **Climate**: manage thermostats by setting temperature and choosing presets.
- **Cover**: operate covers with support for actions like open, close, stop, position adjustment, and tilt — depending on your setup.
- **Light**: control dimmer lights, allowing both on/off functionality and brightness adjustment.
- **Scene**: activate predefined scenes.
- **Sensor**: display sensor values from devices like gauges, humidity sensors, thermostats, ventilation, and weather stations.
- **Switch**: toggle on/off outputs.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Data updates

All data from **Qbus** entities are pushed to Home Assistant over MQTT.

## Examples

### Automation to activate Qbus scene

This automation will activate the **Watching TV** Qbus scene when turning on your TV.

Replace `media_player.my_tv` with your TV entity and `scene.ctd_000001_watching_tv` with your Qbus scene entity.

{% raw %}

```yaml
alias: Activate TV scene when turning on TV
description: ""
mode: single
triggers:
  - entity_id:
      - media_player.my_tv
    from: "off"
    to: "on"
    trigger: state
conditions: []
actions:
  - target:
      entity_id: scene.ctd_000001_watching_tv
    metadata: {}
    alias: Activate TV scene
    action: scene.turn_on
    data: {}
```

{% endraw %}

### Qbus scene triggers media player

Automations can also be triggered by Qbus scenes. The following automation will play the **Home Assistant Homies** playlist on the media player in the living room.

An extra condition has been added to make sure the automation is not triggered when Home Assistant reboots or when the integration reloads.

Replace `scene.ctd_111111_play_music` with your Qbus scene entity id, `media_player.living_room` with your media player entity id, and fill in the `data` element as desired.

{% raw %}

```yaml
alias: Play music in living room
description: ""
mode: single
triggers:
  - trigger: state
    entity_id:
      - scene.ctd_111111_play_music
    from: null
    to: null
conditions:
  - condition: template
    value_template: >-
      {{ trigger.from_state is not none and trigger.from_state.state not in
      ['unavailable', 'unknown'] and trigger.to_state is not none and
      trigger.to_state.state not in ['unavailable', 'unknown'] }}
actions:
  - action: media_player.play_media
    alias: Play media
    target:
      entity_id: media_player.living_room
    data:
      enqueue: replace
      media_content_id: Home Assistant Homies
      media_content_type: playlist
```

{% endraw %}

## Known limitations

The integration does not provide a way to update the firmware on the devices. This can only be done with the configuration software System Manager.

## Troubleshooting

### Can’t set up the device

#### Symptom: "No devices are discovered"

When trying to set up the integration, no devices are discovered.

##### Description

This means that the integration did not receive a valid configuration from the gateway.

##### Resolution

To resolve this issue, try the following steps:

1. Make sure your controller is online and not connected to System Manager.
2. Make sure you have an MQTT broker running.
3. Make sure that the gateway software is up and running (see [Prerequisites](#prerequisites)) and connected to the broker.
4. Make sure you have an MQTT client integration (see [Prerequisites](#prerequisites)) connected to the broker.
