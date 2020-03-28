---
title: Hyperion
description: Instructions on how to integrate Hyperion into Home Assistant.
ha_category:
  - Light
ha_release: 0.7.6
ha_iot_class: Local Polling
ha_domain: hyperion
---

The `hyperion` platform allows you to integrate your [Hyperion](https://hyperion-project.org/wiki) into Home Assistant. Hyperion is an open source Ambilight implementation which runs on many platforms.

## Configuration

To use your Hyperion light in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: hyperion
    host: IP_ADDRESS
```

{% configuration %}
  host:
    description: The IP address of the device the Hyperion service is running on.
    required: true
    type: string
  port:
    description: The port used to communicate with the Hyperion service.
    required: false
    type: integer
    default: 19444
  name:
    description: The name of the device used in the frontend.
    required: false
    type: string
  priority:
    description: The priority of the Hyperion instance make sure this is higher then the system prio in hyperion itself.
    required: false
    type: integer
    default: 128
  hdmi_priority:
    description: The priority of the HDMI grabber of this Hyperion instance, note that this priority must be higher than all other priorities used for correct behavior.
    required: false
    type: integer
    default: 880
  default_color:
    description: The color of the light.
    required: false
    type: list
    default: "[255, 255, 255]"
  effect_list:
    description: The list of effects that can be used.
    required: false
    type: list
    default: "['HDMI', 'Cinema brighten lights', 'Cinema dim lights', 'Knight rider', 'Blue mood blobs', 'Cold mood blobs', 'Full color mood blobs', 'Green mood blobs', 'Red mood blobs', 'Warm mood blobs', 'Police Lights Single', 'Police Lights Solid', 'Rainbow mood', 'Rainbow swirl fast', 'Rainbow swirl', 'Random', 'Running dots', 'System Shutdown', 'Snake', 'Sparks Color', 'Sparks', 'Strobe blue', 'Strobe Raspbmc', 'Strobe white', 'Color traces', 'UDP multicast listener', 'UDP listener', 'X-Mas']"
{% endconfiguration %}

## Examples

To start Hyperion with an effect, use the following automation:

```yaml
automation:
- id: one
  alias: Turn Hyperion effect on when light goes on
  trigger:
    - platform: state
      entity_id: light.hyperion
      to: 'on'
  action:
    - service: light.turn_on
      data:
        entity_id: light.hyperion
        effect: "Full color mood blobs"
```

To have the lights playing an effect when pausing, idle or turn off a media player like Plex you can use this example:

```yaml
- alias: Set hyperion effect after playback
  trigger:
    - platform: state
      entity_id: media_player.plex
      to: 'off'
    - platform: state
      entity_id: media_player.plex.plex
      to: 'paused'
    - platform: state
      entity_id: media_player.plex.plex
      to: 'idle'
  action:
    - service: light.turn_on
      data:
        entity_id: light.hyperion
        effect: "Full color mood blobs"
```

To capture the screen when playing something of a media_player you can use this example:

```yaml
- alias: Set hyperion when playback starts
  trigger:
    - platform: state
      entity_id: media_player.plex
      to: 'playing'
  action:
    - service: light.turn_on
      data:
        entity_id: light.hyperion
        effect: HDMI
```
