---
title: Picture Entity Card
sidebar_label: Picture Entity
description: Displays the entity in form of an image. Instead of images from URL it can also show the picture of `camera` entities.
---

Displays the entity in form of an image. Instead of images from URL it can also show the picture of `camera` entities.

<p class='img'>
  <img src='/images/lovelace/lovelace_picture_entity.gif' alt='Picture entity card'>
  Background changes according to the entity state.
</p>

{% configuration %}
type:
  required: true
  description: picture-entity
  type: string
entity:
  required: true
  description: "An `entity_id` used for the picture."
  type: string
camera_image:
  required: false
  description: "Camera `entity_id` to use. (not required if `entity` is already a camera-entity)."
  type: string
camera_view:
  required: false
  description: '"live" will show the live view if `stream` is enabled.'
  default: auto
  type: string
image:
  required: false
  description: URL of an image.
  type: string
state_image:
  required: false
  description: "Map entity states to images (`state: image URL`, check the example below)."
  type: map
state_filter:
  required: false
  description: '[State-based CSS filters](#how-to-use-state_filter)'
  type: map
aspect_ratio:
  required: false
  description: "Forces the height of the image to be a ratio of the width. You may enter a value such as: `16x9`, `16:9`, `1.78`."
  type: string
name:
  required: false
  description: Overwrite entity name.
  type: string
show_name:
  required: false
  description: Shows name in footer.
  type: boolean
  default: true
show_state:
  required: false
  description: Shows state in footer.
  type: boolean
  default: true
theme:
  required: false
  description: "Set to any theme within `themes.yaml`"
  type: string
tap_action:
  required: false
  description: Action to take on tap
  type: map
  keys:
    action:
      required: true
      description: "Action to perform (`more-info`, `toggle`, `call-service`, `navigate`, `url`, `none`)"
      type: string
      default: "`more-info`"
    navigation_path:
      required: false
      description: "Path to navigate to (e.g. `/lovelace/0/`) when `action` defined as `navigate`"
      type: string
      default: none
    url_path:
      required: false
      description: "Path to navigate to (e.g. `https://www.home-assistant.io`) when `action` defined as `url`"
      type: string
      default: none
    service:
      required: false
      description: "Service to call (e.g. `media_player.media_play_pause`) when `action` defined as `call-service`"
      type: string
      default: none
    service_data:
      required: false
      description: "Service data to include (e.g. `entity_id: media_player.bedroom`) when `action` defined as `call-service`"
      type: string
      default: none
    confirmation:
      required: false
      description: "Present a confirmation dialog to confirm the action. See `confirmation` object below"
      type: [boolean, map]
      default: "false"
hold_action:
  required: false
  description: Action to take on tap-and-hold
  type: map
  keys:
    action:
      required: true
      description: "Action to perform (`more-info`, `toggle`, `call-service`, `navigate`, `url`, `none`)"
      type: string
      default: "`more-info`"
    navigation_path:
      required: false
      description: "Path to navigate to (e.g. `/lovelace/0/`) when `action` defined as `navigate`"
      type: string
      default: none
    url_path:
      required: false
      description: "Path to navigate to (e.g. `https://www.home-assistant.io`) when `action` defined as `url`"
      type: string
      default: none
    service:
      required: false
      description: "Service to call (e.g. `media_player.media_play_pause`) when `action` defined as `call-service`"
      type: string
      default: none
    service_data:
      required: false
      description: "Service data to include (e.g. `entity_id: media_player.bedroom`) when `action` defined as `call-service`"
      type: string
      default: none
    confirmation:
      required: false
      description: "Present a confirmation dialog to confirm the action. See `confirmation` object below"
      type: [boolean, map]
      default: "false"
double_tap_action:
  required: false
  description: Action to take on double tap
  type: map
  keys:
    action:
      required: true
      description: "Action to perform (`more-info`, `toggle`, `call-service`, `navigate`, `url`, `none`)"
      type: string
      default: "`more-info`"
    navigation_path:
      required: false
      description: "Path to navigate to (e.g. `/lovelace/0/`) when `action` defined as `navigate`"
      type: string
      default: none
    url_path:
      required: false
      description: "Path to navigate to (e.g. `https://www.home-assistant.io`) when `action` defined as `url`"
      type: string
      default: none
    service:
      required: false
      description: "Service to call (e.g. `media_player.media_play_pause`) when `action` defined as `call-service`"
      type: string
      default: none
    service_data:
      required: false
      description: "Service data to include (e.g. `entity_id: media_player.bedroom`) when `action` defined as `call-service`"
      type: string
      default: none
    confirmation:
      required: false
      description: "Present a confirmation dialog to confirm the action. See `confirmation` object below"
      type: [boolean, map]
      default: "false"
{% endconfiguration %}

## Options For Confirmation

If you define confirmation as an object instead of boolean, you can add more customization and configurations:
{% configuration %}
text:
  required: false
  description: Text to present in the confirmation dialog.
  type: string
exemptions:
  required: false
  description: "List of `exemption` objects. See below"
  type: list
{% endconfiguration %}

## Options For Exemptions

{% configuration badges %}
user:
  required: true
  description: User id that can see the view tab.
  type: string
{% endconfiguration %}

## How to use state_filter

Specify different [CSS filters](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)

```yaml
state_filter:
  "on": brightness(110%) saturate(1.2)
  "off": brightness(50%) hue-rotate(45deg)
```

## Examples

Basic example:

```yaml
type: picture-entity
entity: light.bed_light
image: /local/bed_light.png
```

Different images for each state:

```yaml
type: picture-entity
entity: light.bed_light
state_image:
  "on": /local/bed_light_on.png
  "off": /local/bed_light_off.png
```

Displaying a live feed from an FFMPEG camera:

{% raw %}
```yaml
type: picture-entity
entity: camera.backdoor
camera_view: live
tap_action:
  action: call-service
  service: camera.snapshot
  service_data:
    entity_id: camera.backdoor
    filename: '/shared/backdoor-{{ now().strftime("%Y-%m-%d-%H%M%S") }}.jpg'
```
{% endraw %}

The filename needs to be a path that is writable by Home Assistant in your system. You may need to configure `whitelist_external_dirs` ([documentation](/docs/configuration/basic/)).
