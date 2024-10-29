---
type: card
title: "Entities card"
sidebar_label: Entities
description: "The entities card is the most common type of card. It groups items together into lists."
related:
  - docs: /dashboards/actions/
    title: Card actions
  - docs: /dashboards/header-footer/
    title: Card header and footer
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The entities card is the most common type of card. It groups items together into lists. It can be used to display an entity's state or attribute, but also contain buttons, web links, etc.

{% include dashboard/edit_dashboard.md %}

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`entities`"
  type: string
entities:
  required: true
  description: "A list of entity IDs or `entity` objects or special row objects (see below)."
  type: list
title:
  required: false
  description: Card title.
  type: string
icon:
  required: false
  description: An icon to display to the left of the title.
  type: string
show_header_toggle:
  required: false
  description: Button to turn on/off all entities.
  type: boolean
  default: true
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
state_color:
  required: false
  description: Set to `true` to have icons colored when entity is active.
  type: boolean
  default: false
header:
  required: false
  description: Header widget to render. See [header documentation](/dashboards/header-footer/).
  type: map
footer:
  required: false
  description: Footer widget to render. See [footer documentation](/dashboards/header-footer/).
  type: map
{% endconfiguration %}

## Options for entities

If you define entities as objects instead of strings (by adding `entity:` before entity ID), you can add more customization and configuration.

{% configuration %}
entity:
  required: true
  description: Entity ID.
  type: string
type:
  required: false
  description: "Sets a custom card type: `custom:my-custom-card`. It also can be used to force entities with a default special row format to render as a simple state. You can do this by setting the type: `simple-entity`. This can be used, for example, to replace a helper with an editable control with a read-only value."
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
action_name:
  required: false
  description: Button label (only applies to `script` and `scene` rows).
  type: string
state_color:
  required: false
  description: Set to `true` to have icons colored when entity is active.
  type: boolean
  default: false
tap_action:
  required: false
  description: Action taken on row tap. See [action documentation](/dashboards/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: Action taken on row tap and hold. See [action documentation](/dashboards/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: Action taken on row double tap. See [action documentation](/dashboards/actions/#double-tap-action).
  type: map
confirmation:
  required: false
  description: For entities that display a button element in the row (for example, button, lock, script), this option adds a confirmation dialog to the press of the button. See [options for confirmation](/dashboards/actions/#options-for-confirmation) for configuration options.
  type: map
{% endconfiguration %}

## Special row elements

Rather than only displaying an entity's state as a text output, the entities card supports multiple special rows for buttons, attributes, web links, dividers and sections, etc.

### Attribute

{% configuration %}
type:
  required: true
  description: "`attribute`"
  type: string
entity:
  required: true
  description: Entity ID.
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
  description: Overwrites friendly entity name.
  type: string
icon:
  required: false
  description: Icon to use. Defaults to icon of entity.
  type: string
format:
  required: false
  description: "How the attribute value should be formatted. Currently only supported for timestamp attributes. Valid values are: `relative`, `total`, `date`, `time` and `datetime`."
  type: string
{% endconfiguration %}

### Button

Row with an (optional) icon, label and a single text button at the end of the row that can trigger a defined action.

{% configuration %}
type:
  required: true
  description: "`button`"
  type: string
entity:
  required: false
  description: "Entity ID. Either `entity` or `name` (or both) needs to be provided."
  type: string
name:
  required: false
  description: "Row label. Either `entity` or `name` (or both) needs to be provided."
  type: string
  default: "Friendly name of `entity` if specified."
icon:
  required: false
  description: An icon to display to the left of the main label.
  type: string
action_name:
  required: false
  description: Button label.
  type: string
  default: "`Run`"
tap_action:
  required: true
  description: Action taken on button tap. See [action documentation](/dashboards/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: Action taken on button tap and hold. See [action documentation](/dashboards/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: Action taken on button double tap. See [action documentation](/dashboards/actions/#double-tap-action).
  type: map
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
      description: Entity ID.
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
      description: Override the friendly entity name.
      type: string
      default: Entity name
    show_name:
      required: false
      description: If false, the button name is not shown.
      type: boolean
      default: "false"
    show_icon:
      required: false
      description: If false, the icon is not shown.
      type: boolean
      default: "true"
    tap_action:
      required: false
      description: Action taken on button tap. See [action documentation](/dashboards/actions/#tap-action).
      type: map
    hold_action:
      required: false
      description: Action taken on button tap and hold. See [action documentation](/dashboards/actions/#hold-action).
      type: map
    double_tap_action:
      required: false
      description: Action taken on button double tap. See [action documentation](/dashboards/actions/#double-tap-action).
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
  description: Name to show in the row.
  type: string
  default: Home Assistant Cast
icon:
  required: false
  description: Icon to use.
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
  description: List of conditions to check. See [available conditions](/dashboards/conditional/#card-conditions).
  type: list
row:
  required: true
  description: Row to display if all conditions match. Can be any of the various supported rows described on this page.
  type: map
{% endconfiguration %}

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
  description: Section label.
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
  description: "Website URL (or internal URL e.g., `/hassio/dashboard` or `/panel_custom_name`)."
  type: string
name:
  required: false
  description: Link label.
  type: string
  default: URL path
icon:
  required: false
  description: "Icon to display (e.g., `mdi:home`)."
  type: string
  default: "`mdi:link`"
new_tab:
  required: false
  description: Open link in new tab. If link is external URL or a download link, this will automatically be true. Use if internal URL should be opened in new tab.
  type: boolean
  default: false
download:
  required: false
  description: Is link a download?
  type: boolean
  default: false
{% endconfiguration %}

### Examples

#### Entity rows

```yaml
type: entities
title: Entities card sample
show_header_toggle: true
header:
  image: "https://www.home-assistant.io/images/dashboards/header-footer/balloons-header.png"
  type: picture
entities:
  - entity: alarm_control_panel.alarm
    name: Alarm Panel
  - device_tracker.demo_paulus
  - switch.decorative_lights
  - group.all_lights
  - group.all_locks
```

#### Buttons row

Above the divider are regular entity rows, below one of type `buttons`. Note that regular entity rows automatically show the entity name, whereas for buttons you have to explicitly specify a label / name.

<p class='img'>
<img src='/images/dashboards/entity_row_buttons.jpg' alt='Screenshot of buttons row'>
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

#### Other special rows

<p class='img'>
<img src='/images/dashboards/entity_row_special.jpg' alt='Screenshot of other special rows'>
Screenshot of other special rows.
</p>

```yaml
type: entities
title: Entities card sample
entities:
  - type: button
    icon: mdi:power
    name: Bed light transition
    action_name: Toggle light
    tap_action:
      action: perform-action
      perform_action: light.toggle
      data:
        entity_id: light.bed_light
        transition: 10
  - type: divider
  - type: attribute
    entity: sun.sun
    attribute: elevation
    name: Sun elevation
    prefix: "~"
    suffix: Units
  - type: conditional
    conditions:
      - entity: sun.sun
        state: above_horizon
    row:
      entity: sun.sun
      type: attribute
      attribute: azimuth
      icon: mdi:angle-acute
      name: Sun azimuth
  - type: section
    label: Section example
  - type: weblink
    name: Home Assistant
    url: https://www.home-assistant.io/
    icon: mdi:home-assistant
  - type: button
    name: Power cycle LibreELEC
    icon: mdi:power-cycle
    tap_action:
      action: perform-action
      confirmation:
        text: Are you sure you want to restart?
      perform_action: script.libreelec_power_cycle
```
