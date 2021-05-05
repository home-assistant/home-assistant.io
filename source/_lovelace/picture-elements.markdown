---
title: "Picture Elements Card"
sidebar_label: Picture Elements
description: "The Picture Elements card is one of the most versatile types of cards. The cards allow you to position icons or text and even services! On an image based on coordinates."
---

The Picture Elements card is one of the most versatile types of cards.

The cards allow you to position icons or text and even services on an image based on coordinates. Imagine floor plan, imagine [picture-glance](/lovelace/picture-glance/) with no restrictions!

<p class='img'>
  <img src='/images/lovelace/lovelace_picture_elements.gif' alt='A functional floorplan powered by picture elements'>
  A functional floorplan powered by picture elements.
</p>

{% configuration %}
type:
  required: true
  description: "`picture-elements`"
  type: string
image:
  required: true
  description: The URL of an image.<br/>To use a locally hosted image, see [Hosting](/integrations/http#hosting-files).
  type: string
camera_image:
  required: false
  description: A camera entity.
  type: string
camera_view:
  required: false
  description: '"live" will show the live view if `stream` is enabled.'
  default: auto
  type: string
elements:
  required: true
  description: List of elements.
  type: list
title:
  required: false
  description: Card title.
  type: string
state_filter:
  required: false
  description: '[State-based CSS filters](#how-to-use-state_filter)'
  type: map
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
dark_mode_image:
  required: false
  description: "This image is used when the dark mode is activated and no state image is set."
  type: string
dark_mode_filter:
  required: false
  description: "This CSS filter is used when the dark mode is activated."
  type: string
{% endconfiguration %}

## Elements

Elements are the active components (icons, badges, buttons, text, etc.) that overlay the image.

There are several different element types that can be added to a Picture Elements card:

- [State Badge](#state-badge)
- [State Icon](#state-icon)
- [State Label](#state-label)
- [Service Call Button](#service-call-button)
- [Icon](#icon-element)
- [Image](#image-element)
- [Conditional](#conditional-element)
- [Custom](#custom-elements)

### State Badge

This element creates a badge representing the state of an entity.

{% configuration %}
type:
  required: true
  description: "`state-badge`"
  type: string
entity:
  required: true
  description: Entity ID.
  type: string
style:
  required: true
  description: '[Position and style the element](#how-to-use-the-style-object) using CSS.'
  type: map
  default: "position: absolute, transform: translate(-50%, -50%)"
title:
  required: false
  description: State badge tooltip. Set to null to hide.
  type: string
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/lovelace/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: Action taken on card tap and hold. See [action documentation](/lovelace/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: Action taken on card double tap. See [action documentation](/lovelace/actions/#double-tap-action).
  type: map
{% endconfiguration %}

### State Icon

This element represents an entity state using an icon.

{% configuration %}
type:
  required: true
  description: "`state-icon`"
  type: string
entity:
  required: true
  description: The entity ID to use.
  type: string
icon:
  required: false
  description: Overwrites icon.
  type: string
title:
  required: false
  description: Icon tooltip. Set to null to hide.
  type: string
state_color:
  required: false
  description: Set to `true` to have icons colored when entity is active.
  type: boolean
  default: true
tap_action:
  required: false
  description: Action to take on tap.
  type: map
  keys:
    action:
      required: true
      description: "Action to perform (`more-info`, `toggle`, `call-service`, `navigate`, `url`, `none`)."
      type: string
      default: "`more-info`"
    navigation_path:
      required: false
      description: "Path to navigate to (e.g., `/lovelace/0/`) when `action` defined as `navigate`."
      type: string
      default: none
    url_path:
      required: false
      description: "Path to navigate to (e.g., `https://www.home-assistant.io`) when `action` defined as `url`."
      type: string
      default: none
    service:
      required: false
      description: "Service to call (e.g., `media_player.media_play_pause`) when `action` defined as `call-service`."
      type: string
      default: none
    service_data:
      required: false
      description: "Service data to include (e.g., `entity_id: media_player.bedroom`) when `action` defined as `call-service`."
      type: string
      default: none
    confirmation:
      required: false
      description: "Present a confirmation dialog to confirm the action. See `confirmation` object below."
      type: [boolean, map]
      default: "false"
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/lovelace/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: Action taken on card tap and hold. See [action documentation](/lovelace/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: Action taken on card double tap. See [action documentation](/lovelace/actions/#double-tap-action).
  type: map
style:
  required: true
  description: '[Position and style the element](#how-to-use-the-style-object) using CSS.'
  type: string
  default: "position: absolute, transform: translate(-50%, -50%)"
{% endconfiguration %}

### State Label

This element represents an entity's state via text.

{% configuration %}
type:
  required: true
  description: "`state-label`"
  type: string
entity:
  required: true
  description: Entity ID.
  type: string
attribute:
  required: false
  description: If present, the corresponding attribute will be shown, instead of the entity's state.
  type: string
prefix:
  required: false
  description: Text before entity state.
  type: string
suffix:
  required: false
  description: Text after entity state.
  type: string
title:
  required: false
  description: Label tooltip. Set to null to hide.
  type: string
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/lovelace/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: Action taken on card tap and hold. See [action documentation](/lovelace/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: Action taken on card double tap. See [action documentation](/lovelace/actions/#double-tap-action).
  type: map
style:
  required: true
  description: '[Position and style the element](#how-to-use-the-style-object) using CSS.'
  type: string
  default: "position: absolute, transform: translate(-50%, -50%)"
{% endconfiguration %}

### Service Call Button

This entity creates a button (with arbitrary text) that can be used to call a service.

{% configuration %}
type:
  required: true
  description: "`service-button`"
  type: string
title:
  required: true
  description: Button label.
  type: string
service:
  required: true
  description: "`light.turn_on`"
  type: string
service_data:
  required: false
  description: The service data to use.
  type: map
style:
  required: true
  description: '[Position and style the element](#how-to-use-the-style-object) using CSS.'
  type: string
  default: "position: absolute, transform: translate(-50%, -50%)"
{% endconfiguration %}

### Icon Element

This element creates a static icon that is not linked to the state of an entity.

{% configuration %}
type:
  required: true
  description: "`icon`"
  type: string
icon:
  required: true
  description: "Icon to display (e.g., `mdi:home`)."
  type: string
title:
  required: false
  description: Icon tooltip. Set to null to hide.
  type: string
entity:
  required: false
  description: Entity to use for more-info/toggle.
  type: string
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/lovelace/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: Action taken on card tap and hold. See [action documentation](/lovelace/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: Action taken on card double tap. See [action documentation](/lovelace/actions/#double-tap-action).
  type: map
style:
  required: true
  description: '[Position and style the element](#how-to-use-the-style-object) using CSS.'
  type: string
  default: "position: absolute, transform: translate(-50%, -50%)"
{% endconfiguration %}

### Image Element

This creates an image element that overlays the background image.

{% configuration %}
type:
  required: true
  description: "`image`"
  type: string
entity:
  required: false
  description: "Entity to use for `state_image` and `state_filter` and also target for actions."
  type: string
title:
  required: false
  description: Image tooltip. Set to null to hide.
  type: string
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/lovelace/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: Action taken on card tap and hold. See [action documentation](/lovelace/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: Action taken on card double tap. See [action documentation](/lovelace/actions/#double-tap-action).
  type: map
image:
  required: false
  description: The image to display.
  type: string
camera_image:
  required: false
  description: A camera entity.
  type: string
camera_view:
  required: false
  description: '"live" will show the live view if `stream` is enabled.'
  default: auto
  type: string
state_image:
  required: false
  description: '[State-based images](#how-to-use-state_image)'
  type: map
filter:
  required: false
  description: Default CSS filter.
  type: string
state_filter:
  required: false
  description: '[State-based CSS filters](#how-to-use-state_filter)'
  type: map
aspect_ratio:
  required: false
  description: Height to width ratio.
  type: string
  default: "50%"
style:
  required: true
  description: '[Position and style the element](#how-to-use-the-style-object) using CSS.'
  type: string
  default: "position: absolute, transform: translate(-50%, -50%)"
{% endconfiguration %}

### Conditional Element

Much like the Conditional card, this element will let you show its sub-elements based on entity states.

{% configuration %}
type:
  required: true
  description: "`conditional`"
  type: string
conditions:
  required: true
  description: List of entity IDs and matching states.
  type: list
  keys:
    entity:
      required: true
      description: Entity ID.
      type: string
    state:
      required: false
      description: Entity state is equal to this value.*
      type: string
    state_not:
      required: false
      description: Entity state is unequal to this value.*
      type: string
elements:
  required: true
  description: One or more elements of any type to show when conditions are met. See below for an example.
  type: list
{% endconfiguration %}

### Custom Elements

The process for creating and referencing custom elements is the same as for custom cards.
Please see the [developer documentation](https://developers.home-assistant.io/docs/frontend/custom-ui/lovelace-custom-card.html)
for more information.

{% configuration %}
type:
  required: true
  description: 'Card name with `custom:` prefix (e.g., `custom:my-custom-card`).'
  type: string
style:
  required: true
  description: '[Position and style the element](#how-to-use-the-style-object) using CSS.'
  type: string
  default: "position: absolute, transform: translate(-50%, -50%)"
{% endconfiguration %}

## Options For Exemptions

{% configuration badges %}
user:
  required: true
  description: User ID that can see the view tab.
  type: string
{% endconfiguration %}

## Notes on Element Attributes

### How to use the style object

Position and style your elements using [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS). More/other keys are also possible.
Note, the default style for most elements includes [translate](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate)(-50%, -50%), which means that the coordinates you provide will set the position of the center of the element.

```yaml
style:
  # Positioning of the element
  left: 50%
  top: 50%
  # Overwrite color for icons
  "--paper-item-icon-color": pink
```

### How to use state_image

Specify a different image to display based on the state of the entity.

```yaml
state_image:
  "on": /local/living_room_on.jpg
  "off": /local/living_room_off.jpg
```

### How to use state_filter

Specify different [CSS filters](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)

```yaml
state_filter:
  "on": brightness(110%) saturate(1.2)
  "off": brightness(50%) hue-rotate(45deg)
```

### How to use click-and-hold

If the option `hold_action` is specified, that action will be performed when the entity is clicked and held for half a second or more.

```yaml
tap_action:
  action: toggle
hold_action:
  action: call-service
  service: light.turn_on
  service_data:
    entity_id: light.bed_light
    brightness_pct: 100
```

## Examples

### Example of icons, labels and buttons

```yaml
type: picture-elements
image: /local/floorplan.png
elements:
  - type: state-icon
    tap_action:
      action: toggle
    entity: light.ceiling_lights
    style:
      top: 47%
      left: 42%
  - type: state-icon
    tap_action:
      action: toggle
    entity: light.kitchen_lights
    style:
      top: 30%
      left: 15%
  - type: state-label
    entity: sensor.outside_temperature
    style:
      top: 82%
      left: 79%
  - type: state-label
    entity: climate.kitchen
    attribute: current_temperature
    suffix: "°C"
    style:
      top: 33%
      left: 15%
  - type: service-button
    title: Turn lights off
    style:
      top: 95%
      left: 60%
    service: homeassistant.turn_off
    service_data:
      entity_id: group.all_lights
  - type: icon
    icon: mdi:home
    tap_action:
      action: navigate
      navigation_path: /lovelace/0
    style:
      top: 10%
      left: 10%
```

### Images Example

```yaml
type: picture-elements
image: /local/floorplan.png
elements:
  # state_image & state_filter - toggle on click
  - type: image
    entity: light.living_room
    tap_action:
      action: toggle
    image: /local/living_room.png
    state_image:
      "off": /local/living_room_off.png
    filter: saturate(.8)
    state_filter:
      "on": brightness(120%) saturate(1.2)
      style:
        top: 25%
        left: 75%
        width: 15%
  # Camera, red border, rounded-rectangle - show more-info on click
  - type: image
    entity: camera.driveway_camera
    camera_image: camera.driveway_camera
    style:
      top: 5%
      left: 10%
      width: 10%
      border: 2px solid red
      border-radius: 10%
  # Single image, state_filter - call-service on click
  - type: image
    entity: media_player.living_room
    tap_action:
      action: call-service
      service: media_player.media_play_pause
      service_data:
        entity_id: media_player.living_room
    image: /local/television.jpg
    filter: brightness(5%)
    state_filter:
      playing: brightness(100%)
    style:
      top: 40%
      left: 75%
      width: 5%
```

### Conditional Example

```yaml
type: picture-elements
image: /local/House.png
elements:
  # conditionally show TV off button shortcut when dad's away and daughter is home
  - type: conditional
    conditions:
      - entity: sensor.presence_daughter
        state: "home"
      - entity: sensor.presence_dad
        state: "not_home"
    elements:
      - type: state-icon
        entity: switch.tv
        tap_action:
          action: toggle
        style:
          top: 47%
          left: 42%
```
