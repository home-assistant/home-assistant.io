---
type: card
title: "Picture glance card"
sidebar_label: Picture glance
description: "The picture glance card shows an image and corresponding entity states as an icon. The entities on the right side allow toggle actions, others show the more information dialog."
related:
  - docs: /dashboards/actions/
    title: Card actions
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The picture glance card shows an image and lets you place small icons of entity states on top of that card to control those entities from there. In the image below: the entities on the right allow toggle actions, the others show the more information dialog.

<p class='img'>
  <img src='/images/dashboards/picture_glance.gif' alt='Picture glance card for a living room'>
  Picture glance card for a living room.
</p>

{% include dashboard/add_picture_to_card.md %}

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`picture-glance`"
  type: string
entities:
  required: true
  description: List of entities or entity objects.
  type: list
title:
  required: false
  description: The card title.
  type: string
image:
  required: false
  description: Background image URL.
  type: string
image_entity:
  required: false
  description: Image or person entity to display.
  type: string
camera_image:
  required: false
  description: Camera entity as Background image.
  type: string
camera_view:
  required: false
  description: '"live" will show the live view if `stream` is enabled.'
  default: auto
  type: string
state_image:
  required: false
  description: Background image based on entity state.
  type: map
  keys:
    state:
      type: string
      required: false
      description: "`state: image-url`, check the example below."
state_filter:
  required: false
  description: '[State-based CSS filters](#how-to-use-state_filter)'
  type: map
aspect_ratio:
  required: false
  description: 'Forces the height of the image to be a ratio of the width. Valid formats: Height percentage value (`23%`) or ratio expressed with colon or "x" separator (`16:9` or `16x9`). For a ratio, the second element can be omitted and will default to "1" (`1.78` equals `1.78:1`).'
  type: string
entity:
  required: false
  description: Entity to use for `state_image` and `state_filter`.
  type: string
show_state:
  required: false
  description: Show entity state text.
  type: boolean
  default: false
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
  description: Action taken on card double tap. See [action documentation](/dashboards/actions/).
  type: map
{% endconfiguration %}

### Options for entities

If you define entities as objects instead of strings, you can add more customization and configuration:

{% configuration %}
entity:
  required: true
  description: Entity ID.
  type: string
attribute:
  required: false
  description: Attribute of the entity to display instead of the state.
  type: string
prefix:
  required: false
  description: Prefix to display before the attribute's value.
  type: string
suffix:
  required: false
  description: Suffix to display after the attribute's value.
  type: string
icon:
  required: false
  description: Overwrites default icon.
  type: string
show_state:
  required: false
  description: Show entity state text.
  type: boolean
  default: true
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
entity: switch.decorative_lights
```

### Examples

This section lists a few examples of how the picture glance card can be used.

### Creating a card to control the camera

If your camera supports <abbr title="pan, tilt, and zoom">PTZ</abbr> (can be moved in different directions), you can use the picture glance card to control the camera.

<p class='img'>
  <img src='/images/dashboards/picture_glance_camera_control.gif' alt='Picture glance card to control the camera'>
  Picture glance card to control the camera.
</p>

1. Select your camera entity.
    - **Image path** and **Image entity** are not required.
    ![Select camera entity](/images/dashboards/picture_glance_card_select_camera_entity.png)
2. If you want something to happen when you tap the card itself, define a tap action.
   - Here, we toggle a light.
   ![Select camera entity](/images/dashboards/picture_glance_card_define_tap_action.png)
3. Select the entities to move the camera left, right, up, or down.
   ![Select camera entity](/images/dashboards/picture_glance_card_select_camera_arrows.png)
4. Select **Show code editor**.
5. For each of the entities, specify an icon, as indicated in the YAML example.
6. For the buttons to react on press (instead of bringing up the dialog):
   - For each of the entities, under `tap_action`, use a `button.press` action.

    ```yaml
    camera_view: live
    type: picture-glance
    title: Desk
    entities:
      - entity: button.camera1_ptz_left
        icon: mdi:pan-left
        tap_action:
          action: perform-action
          perform_action: button.press
          data:
            entity_id: button.camera1_ptz_left
      - entity: button.camera1_ptz_right
        icon: mdi:pan-right
        tap_action:
          action: perform-action
          perform_action: button.press
          data:
            entity_id: button.camera1_ptz_right
      - entity: button.camera1_ptz_up
        icon: mdi:pan-up
        tap_action:
          action: perform-action
          perform_action: button.press
          data:
            entity_id: button.camera1_ptz_up
      - entity: button.camera1_ptz_down
        icon: mdi:pan-down
        tap_action:
          action: perform-action
          perform_action: button.press
          data:
            entity_id: button.camera1_ptz_down
    camera_image: camera.camera1_sub
    tap_action:
      action: perform-action
      perform_action: light.toggle
      target:
        entity_id: light.philips_929003052501_01_huelight
    ```
7. That's it. You can now control your camera from the picture glance card on your dashboard.

### More examples

```yaml
type: picture-glance
title: Living room
entities:
  - switch.decorative_lights
  - light.ceiling_lights
  - lock.front_door
  - binary_sensor.movement_backyard
  - binary_sensor.basement_floor_wet
image: /local/living_room.png
```

Display a camera image as background:

```yaml
type: picture-glance
title: Living room
entities:
  - switch.decorative_lights
  - light.ceiling_lights
camera_image: camera.demo_camera
```

Display a camera image without additional entities:

```yaml
type: picture-glance
title: Front garden
entities: []
camera_image: camera.front_garden_camera
```

Use different images based on entity state:

```yaml
type: picture-glance
title: Living room
entities:
  - switch.decorative_lights
  - light.ceiling_lights
state_image:
  "on": /local/living_room_on.png
  "off": /local/living_room_off.png
entity: group.living.room
```
