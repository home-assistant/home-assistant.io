---
type: card
title: Picture entity card
sidebar_label: Picture entity
description: The picture entity card displays an entity in the form of an image. Instead of images from URL, it can also show the picture of camera entities.
related:
  - docs: /dashboards/actions/
    title: Card actions
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The picture entity card displays an entity in the form of an image. Instead of images from URL, it can also show the picture of `camera` entities.

<p class='img'>
  <img src='/images/dashboards/picture_entity.gif' alt='Picture entity card'>
  Background changes according to the entity state.
</p>

{% include dashboard/add_picture_to_card.md %}

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`picture-entity`"
  type: string
entity:
  required: true
  description: "A camera, image, or person `entity_id` used for the picture."
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
  description: URL of an image. To use a locally hosted image, see [Hosting](/integrations/http#hosting-files).
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
  description: 'Forces the height of the image to be a ratio of the width. Valid formats: Height percentage value (`23%`) or ratio expressed with colon or "x" separator (`16:9` or `16x9`). For a ratio, the second element can be omitted and will default to "1" (`1.78` equals `1.78:1`).'
  type: string
fit_mode:
  required: false
  description: 'Defines the manner in which the image is stretched/clipped to fit the card area. `cover`: The image keeps its aspect ratio and fills the given dimension. The image will be clipped to fit. `contain`: The image keeps its aspect ratio, but is resized to fit within the given dimension. `fill`: The image is resized to fill the given dimension. If necessary, the image will be stretched or squished to fit.'
  type: string
  default: cover
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
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/dashboards/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: Action taken on card tap and hold. See [action documentation](/dashboards/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: Action taken on card double tap. See [action documentation](/dashboards/actions/#double-tap-action).
  type: map
{% endconfiguration %}

### How to use state_filter

Specify different [CSS filters](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)

```yaml
state_filter:
  "on": brightness(110%) saturate(1.2)
  "off": brightness(50%) hue-rotate(45deg)
```

### Examples

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

Displaying a live feed from an FFmpeg camera:

{% raw %}

```yaml
type: picture-entity
entity: camera.backdoor
camera_view: live
tap_action:
  action: perform-action
  perform_action: camera.snapshot
  data:
    entity_id: camera.backdoor
    filename: '/shared/backdoor-{{ now().strftime("%Y-%m-%d-%H%M%S") }}.jpg'
```

{% endraw %}

The filename needs to be a path that is writable by Home Assistant in your system. You may need to configure `allowlist_external_dirs` ([documentation](/integrations/homeassistant/#allowlist_external_dirs)).

