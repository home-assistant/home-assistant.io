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
---

The `hyperion` platform allows you to integrate your
[Hyperion](https://docs.hyperion-project.org/) into Home Assistant. Hyperion is
an open source Ambilight implementation which runs on many platforms.

NOTE: [Hyperion-NG](https://github.com/hyperion-project/hyperion.ng) is
supported, the original [discontinued Hyperion](https://github.com/hyperion-project/hyperion) is not supported by
this integration.

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
    description: The priority for color and effects, make sure this is lower then the streaming sources priority in hyperion itself (typically lower than 200 is appropriate).
    required: false
    type: integer
    default: 128
{% endconfiguration %}

## Effects

The effect list is dynamically pulled from the Hyperion server. The following
extra effects will be available:

- BOBLIGHTSERVER: Use a Boblight-Server configured in Hyperion.
- GRABBER: Use a 'Platform Capture' grabber that is configured in Hyperion.
- V4L: Use a 'USB Capture' V4L device that is configured in Hyperion.
- Solid: Use a solid color only.

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

To capture the screen when playing something on a media_player you can use this example:

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
        effect: V4L
```
