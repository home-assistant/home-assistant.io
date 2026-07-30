---
title: Tewke
description: Instructions on how to integrate Tewke devices with Home Assistant
ha_category:
  - Button
  - Energy
  - Environment
  - Light
  - Sensor
ha_release: 2026.8
ha_iot_class: Local Push
ha_codeowners:
  - '@1NFR4R3D'
  - '@oskarwilliams'
  - '@SirenGlitch'
ha_domain: tewke
ha_integration_type: device
ha_quality_scale: gold
ha_zeroconf: true
---

The **Tewke** {% term integration %} allows you to connect and control your [Tewke](https://www.tewke.com) Tap locally.

Tewke is a British smart home brand dedicated to making home automation effortless, intuitive, and accessible for the entire household. By bringing real-time insights and whole-home control directly into living spaces, Tewke bridges the gap between complex technology and everyday living.

## Supported devices

The following devices are currently supported by the integration:

- Tewke Tap

## Prerequisites

The Tewke integration requires that your device is discoverable on your local network via ZeroConf/mDNS. 
Make sure your Tewke Tap is connected to the same network as your Home Assistant instance.

In order to make Tap start broadcasting over mDNS and be available to the integration, the following configuration needs to be done:

1. Open the Tewke app.
2. Select the Tap you wish to add to Home Assistant.
3. Tap the {% icon "mdi:cog" %} **Settings** icon in the top right.
4. Scroll down to **Local integrations**.
5. Turn on **Home Assistant (BETA)** and **LAN CoAP**.

{% include integrations/config_flow.md %}

## Supported functionality

The Tewke integration currently provides the following entities, and in the future will also provide sensors, binary sensors, buttons, and numbers:

### Lights

- **Scenes**: Exposes Scenes configured on your Tap as light entities, allowing you to activate them and adjust their brightness.
- **Targets**: Exposes the gangs connected to your Wall Dock as light entities, allowing you to activate them and adjust their brightness if they are dimmable. Disabled by default.

[//]: # (### Sensors)

[//]: # ()
[//]: # (Various sensors are provided:)

[//]: # ()
[//]: # (- **Temperature**: Compensated temperature reading.)

[//]: # (- **Humidity**: Compensated humidity reading.)

[//]: # (- **Pressure**: Barometric pressure reading.)

[//]: # (- **Illuminance**: Ambient light reading.)

[//]: # (- **CO2 equivalent**: Estimated carbon dioxide equivalent.)

[//]: # (- **Power**: Current power consumption.)

[//]: # (- **Air quality &#40;IAQ&#41;**: Indoor air quality index.)

[//]: # (- **Static IAQ**: Static indoor air quality index.)

[//]: # (- **Gas percentage**: Gas percentage reading.)

[//]: # (- **Radar proximity**: Current radar proximity state &#40;None, Near, Far&#41;.)

[//]: # ()
[//]: # (Advanced diagnostic sensors are also provided but **disabled by default**:)

[//]: # (- Actual power)

[//]: # (- IAQ accuracy)

[//]: # (- Breath VOC equivalent)

[//]: # (- Raw temperature)

[//]: # (- Raw humidity)

[//]: # (- Raw gas resistance)

[//]: # (- Radar near threshold)

[//]: # (- Radar near hysteresis)

[//]: # (- Radar far threshold)

[//]: # (- Radar far hysteresis)

[//]: # ()
[//]: # (### Binary Sensors)

[//]: # ()
[//]: # (- **Run-in status**: Indicates if the device sensor run-in is currently active. Disabled by default.)

[//]: # (- **Stabilisation status**: Indicates if the device is currently stabilising its environmental sensors. Disabled by default.)

[//]: # ()
[//]: # (### Buttons)

[//]: # ()
[//]: # (- **Restart**: Allows you to restart Tap. Disabled by default.)

[//]: # ()
[//]: # (### Numbers)

[//]: # ()
[//]: # (- **Energy override**: Configure the energy override value to be displayed on your Tap energy screen. Disabled by default.)

## Tewke automation examples

Here are a few ideas for using your Tewke Tap in automations.

{% include docs/paste_yaml_tip.md %}

[//]: # (### Automation: Trigger an action when radar detects presence)

[//]: # ()
[//]: # (This automation triggers when the radar detects someone nearby.)

[//]: # ()
[//]: # (```yaml)

[//]: # (automation:)

[//]: # (  - alias: "Welcome home when near tap")

[//]: # (    triggers:)

[//]: # (      - trigger: state)

[//]: # (        entity_id: sensor.tewke_tap_radar_proximity)

[//]: # (        to: "Near")

[//]: # (    actions:)

[//]: # (      - action: light.turn_on)

[//]: # (        target:)

[//]: # (          entity_id: light.living_room)

[//]: # (```)

### Automation: Trigger a Wake-on-Lan from a scene button

This automation triggers a Wake-on-Lan for a computer when a scene is turned on, and announces what will happen through Alexa. If the computer is already online (from a ping check) it does nothing.

```yaml
automation:
  - alias: Turn on PC
    triggers:
      - trigger: switch.turned_on
        target:
          entity_id: switch.office_tap_pc
        options: {}
    conditions:
      - type: is_not_connected
        condition: device
        device_id: PING_DEVICE_ID
        entity_id: PING_ENTITY_ID
        domain: binary_sensor
        enabled: true
    actions:
      - action: notify.alexa_media
        data:
          message: Turning on computer
          target: media_player.office_echo_dot
      - action: button.press
        metadata: {}
        target:
          device_id: WOL_DEVICE_ID
        data: {}
    mode: single
```

## Data updates

The Tewke integration relies on local push data over CoAP, which means Home Assistant instantly updates when the state of your Tap changes. There is no polling interval to configure.

## Known limitations

[//]: # (- Changing the energy override using the `number` entity might time out if the tap takes a while to respond, but usually still completes successfully.)
- Managing (creating, deleting, or editing) Scenes must be done in the Tewke app. The integration will automatically detect these changes and add or remove the Scene entities in Home Assistant. Home Assistant can only trigger Scenes and set their brightness once they are configured on the Tap.

## Troubleshooting

### Device Swap Detected

If the integration reports a "Device swap detected!", it means the Home Assistant coordinator expected a specific Wall Dock ID, but the Tap is reporting a different one. This can happen if you move your Tap to a different Wall Dock. The integration will wait for a ZeroConf update to resolve this. Ensure your device is properly seated in its dock and connected to the network.

### Unable to connect

If Home Assistant is unable to connect to your Tewke device, ensure it is powered on and connected to the local network. Make sure your router is not blocking mDNS (multicast) traffic, which is required for discovering Tap.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
