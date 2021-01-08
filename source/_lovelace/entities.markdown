---
title: "Entities Card"
sidebar_label: Entities
description: "The Entities card is the most common type of card. It groups items together into lists."
---

The Entities card is the most common type of card. It groups items together into lists. It can be used to display an entity's state or attribute, but also contain buttons, web links, etc.

To add the Entities card to your user interface, click the Lovelace menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Entities** from the card picker.

{% configuration %}
type:
  required: true
  description: entities
  type: string
entities:
  required: true
  description: "A list of entity IDs or `entity` objects or special row objects (see below)."
  type: list
title:
  required: false
  description: The card title.
  type: string
icon:
  required: false
  description: An icon to display to the left of the title
  type: string
show_header_toggle:
  required: false
  description: Button to turn on/off all entities.
  type: boolean
  default: true
theme:
  required: false
  description: Set to any theme within `themes.yaml`.
  type: string
state_color:
  required: false
  description: Set to `true` to have icons colored when entity is active
  type: boolean
  default: false
header:
  required: false
  description: Header widget to render. See [header documentation](/lovelace/header-footer/).
  type: map
footer:
  required: false
  description: Footer widget to render. See [footer documentation](/lovelace/header-footer/).
  type: map
{% endconfiguration %}

## Options For Entities

If you define entities as objects instead of strings (by adding `entity:` before entity ID), you can add more customization and configuration:

{% configuration %}
entity:
  required: true
  description: Entity ID.
  type: string
type:
  required: false
  description: "Sets a custom card type: `custom:my-custom-card`"
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
icon:
  required: false
  description: Overwrites icon or entity picture.
  type: string
image:
  required: false
  description: Overwrites entity picture.
  type: string
secondary_info:
  required: false
  description: "Show additional info. Values: `entity-id`, `last-changed`, `last-updated`, `last-triggered` (only for automations and scripts), `position` or `tilt-position` (only for supported covers), `brightness` (only for lights)."
  type: string
format:
  required: false
  description: "How the state should be formatted. Currently only used for timestamp sensors. Valid values are: `relative`, `total`, `date`, `time` and `datetime`."
  type: string
header:
  required: false
  description: Header widget to render. See [header documentation](/lovelace/header-footer/).
  type: map
footer:
  required: false
  description: Footer widget to render. See [footer documentation](/lovelace/header-footer/).
  type: map
action_name:
  required: false
  description: Button label. (Only applies to `script` and `scene` rows)
  type: string
state_color:
  required: false
  description: Set to `true` to have icons colored when entity is active
  type: boolean
  default: false
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

## Special Row Elements

Rather than only displaying an entity's state as a text output, the Entities card supports multiple special rows for buttons, attributes, web links, dividers and sections, etc.

### Button

{% configuration %}
type:
  required: true
  description: "`button`"
  type: string
name:
  required: true
  description: Main Label.
  type: string
icon:
  required: false
  description: An icon to display to the left of the label.
  type: string
action_name:
  required: false
  description: Button label.
  type: string
  default: "`Run`"
tap_action:
  required: true
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

### Cast

Special row to start Home Assistant Cast.

{% configuration %}
type:
  required: true
  description: "`cast`"
  type: string
dashboard:
  required: false
  description: Path to the dashboard of the view that needs to be shown.
  type: string
view:
  required: true
  description: Path to the view that needs to be shown.
  type: string
name:
  required: false
  description: Name to show in the row
  type: string
  default: Home Assistant Cast
icon:
  required: false
  description: Icon to use
  type: string
  default: "`hass:television`"
hide_if_unavailable:
  required: false
  description: Hide this row if casting is not available in the browser.
  type: boolean
  default: false
{% endconfiguration %}

### Conditional

Special row that displays based on entity states.

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
row:
  required: true
  description: Row to display if all conditions match.
  type: map
{% endconfiguration %}

*one is required (`state` or `state_not`)

Note: Conditions with more than one entity are treated as an 'and' condition. This means that for the card to show, *all* entities must meet the state requirements set.

### Divider

{% configuration %}
type:
  required: true
  description: "`divider`"
  type: string
style:
  required: false
  description: Style the element using CSS.
  type: map
  default: "height: 1px, background-color: var(--divider-color)"
{% endconfiguration %}

### Section

{% configuration %}
type:
  required: true
  description: "`section`"
  type: string
label:
  required: false
  description: Section label
  type: string
{% endconfiguration %}

### Weblink

{% configuration %}
type:
  required: true
  description: "`weblink`"
  type: string
url:
  required: true
  description: "Website URL (or internal URL e.g., `/hassio/dashboard` or `/panel_custom_name`)"
  type: string
name:
  required: false
  description: Link label
  type: string
  default: URL path
icon:
  required: false
  description: "Icon to display (e.g., `mdi:home`)"
  type: string
  default: "`mdi:link`"
{% endconfiguration %}

### Buttons

Multiple buttons displayed in a single row next to each other. See examples further below.

{% configuration %}
type:
  required: true
  description: "`buttons`"
  type: string
entities:
  required: true
  description: A list of entities to show. Each entry is either an entity ID or a map.
  type: list
  keys:
    entity:
      required: true
      description: Entity ID
      type: string
    icon:
      required: false
      description: Override the entity icon.
      type: string
    image:
      required: false
      description: Override the entity image.
      type: string
    name:
      required: false
      description: Label for the button
      type: string
{% endconfiguration %}

### Attribute

{% configuration %}
type:
  required: true
  description: "`attribute`"
  type: string
entity:
  required: true
  description: Entity ID
  type: string
attribute:
  required: true
  description: Attribute to display from the entity.
  type: string
prefix:
  required: false
  description: Text before entity state.
  type: string
suffix:
  required: false
  description: Text after entity state.
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
{% endconfiguration %}

## Examples

Entity rows:

```yaml
type: entities
title: Entities card sample
show_header_toggle: true
header:
  image: 'https://www.home-assistant.io/images/lovelace/header-footer/balloons-header.png'
  type: picture
entities:
  - entity: alarm_control_panel.alarm
    name: Alarm Panel
  - device_tracker.demo_paulus
  - switch.decorative_lights
  - group.all_lights
  - group.all_locks
```

Buttons row:

Above the divider are regular entity rows, below one of type `buttons`. Note that regular entity rows automatically show the entity name, whereas for buttons you have to explicitely specify a label / name.

<p class='img'>
<img src='/images/lovelace/lovelace_entity_row_buttons.jpg' alt='Screenshot of buttons row'>
Screenshot of buttons row.
</p>

```yaml
type: entities
entities:
  - entity: light.office_ceiling
  - entity: light.dining_ceiling
  - type: divider
  - type: buttons
    entities:
      - entity: light.office_ceiling
        name: Office Ceiling
      - entity: light.dining_ceiling
        name: Dining Ceiling
```

Other special rows:

```yaml
type: entities
title: Entities card sample
show_header_toggle: true
entities:
  - type: call-service
    icon: mdi:power
    name: Bed light
    action_name: Toggle light
    service: light.toggle
    service_data:
      entity_id: light.bed_light
  - type: divider
  - type: attribute
    entity: sun.sun
    attribute: elevation
    name: Elevation
  - type: weblink
    name: Home Assistant
    url: https://www.home-assistant.io/
    icon: mdi:home-assistant
  - type: button
    name: Power cycle LibreELEC
    icon: mdi:power-cycle
    tap_action:
      action: call-service
      confirmation:
        text: Are you sure you want to restart?
      service: script.libreelec_power_cycle
```
