---
title: Hyperion
description: Instructions on how to integrate Hyperion into Home Assistant.
ha_category:
  - Light
ha_release: 0.7.6
ha_iot_class: Local Push
ha_domain: hyperion
ha_codeowners:
  - '@dermotduffy'
ha_config_flow: true
ha_ssdp: true
ha_platforms:
  - camera
  - light
  - sensor
  - switch
ha_integration_type: integration
---

The Hyperion integration allows you to integrate your
[Hyperion](https://docs.hyperion-project.org/) into Home Assistant. Hyperion is
an open source Ambilight implementation which runs on many platforms.

**NOTE**: [Hyperion-NG](https://github.com/hyperion-project/hyperion.ng) is
supported, the original [discontinued Hyperion](https://github.com/hyperion-project/hyperion) is not supported by
this integration.

{% include integrations/config_flow.md %}

### Extra configuration of the integration

All configuration options are offered from the frontend. Choose `Options` under the
relevant entry on the `Integrations` page.

Options supported:
- **Priority**: The priority for color and effects. Hyperion will choose the source 
  with the lowest priority number as active input. If you have other sources (not 
  originating from Home Assistant) configured, make sure this option is lower than 
  those sources priority in Hyperion itself (typically lower than 200 is appropriate).
- **Effects to hide**: An optional selection of effects to hide from the light effects
  list. New effects added to the Hyperion server will be shown by default.

## Hyperion instances

This integration supports multiple Hyperion instances running on a single Hyperion
server. As instances are added/removed on the Hyperion UI, they will automatically be
added/removed from Home Assistant.

## Light entity

The default light entity will send data to Hyperion on the priority you have configured 
during integration setup. When turned off, it will clear the configured priority again. 
Other light sources independent of Home Assistant configured in Hyperion might still be 
active and cause light to be emitted. In order to turn the light output off entirely 
regardless of active light sources, you can enable the LED device entity that acts as 
a global switch (see Advanced Entities).

## Effects

The effect list is dynamically pulled from the Hyperion server. Additionally, there
will be a 'Solid' effect to switch (back) to showing a solid color only.

## Hyperion camera

A Hyperion camera entity is created that shows a stream of the input to Hyperion (e.g., a
USB Capture device). This could be used to show a small "preview window" next to TV
controls, for example.

Please note that only the currently live Hyperion priority can be streamed, and only
streamable sources will actually stream content (e.g., USB Capture Devices will work, but
static colors will not).

## Sensors

A sensor (Visible Priority) provides the effect currently displayed by the Hyperion server for the selected instance. Attributes of this sensor provide more details on the nature of the effect. For a detailed description, refer to the [Hyperion API](https://docs.hyperion-project.org/en/json/ServerInfo.html#priorities).

## Advanced entities

The Hyperion integration comes with a series of disabled-by-default entities for
advanced usecases. These entities expose 'raw' underlying Hyperion API components for
improved extensibility and interoperability which are particularly useful in cases where
there are multiple Hyperion server clients (of which Home Assistant is one).

These entities may be enabled by visiting the `Integrations` page, choosing the relevant
entity and toggling `Enable entity`, followed by `Update`.

### Control over external sources: Screen capture and USB capture

Provided entities for controlling external sources:

- `switch.[instance]_component_platform_capture`: Toggles the `Screen Capture` source
- `switch.[instance]_component_usb_capture`: Toggles the `USB Capture` source

### Control over Hyperion functionality

Further advanced entities to control Hyperion functionality:

- There will be additional `switch.[instance]_component_[component]` entities that can
  be used to toggle the relevant underlying Hyperion component as shown on the Hyperion
  server `Remote Control` page under `Components Control`. This allows fine grained 
  control over Hyperion functionality (e.g. `Blackbar Detection`) or device
  state (`LED Device`).
- `switch.[instance]_component_all`: refers to the entire Hyperion instance state that
  controls the toggle on the Hyperion server `Dashboard` page.

## Examples

To start Hyperion with an effect, use the following automation:

```yaml
automation:
- alias: "Turn Hyperion effect on when light goes on"
  triggers:
    - trigger: state
      entity_id: light.hyperion
      to: "on"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hyperion
      data:
        effect: "Full color mood blobs"
```

To have the lights playing an effect when pausing, idle or turn off a media player like Plex you can use this example:

```yaml
- alias: "Set hyperion effect after playback"
  triggers:
    - trigger: state
      entity_id: media_player.plex
      to: "off"
    - trigger: state
      entity_id: media_player.plex.plex
      to: "paused"
    - trigger: state
      entity_id: media_player.plex.plex
      to: "idle"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hyperion
      data:
        effect: "Full color mood blobs"
```

To capture the screen on a USB capture device, when playing something on a media_player, you can use this example:

```yaml
- alias: "Set hyperion when playback starts"
  triggers:
    - trigger: state
      entity_id: media_player.plex
      to: "playing"
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.[instance]_component_usb_capture
```

To toggle the LED device together with the light entity in order to turn light output on or off for all sources. In this example both entities are turned on together, create another automation with the values reversed for turning both off:

```yaml
- alias: "Turn LED device on when Hyperion light is activated"
  triggers:
    - trigger: state
      entity_id:
        - light.hyperion
      from: "off"
      to: "on"
  conditions:
    - condition: state
      entity_id: switch.[instance]_component_led_device
      state: "off"
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.[instance]_component_led_device
```
