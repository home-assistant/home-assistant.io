---
title: "Entities Card"
sidebar_label: Entities
description: "Entities will be the most common type of card that will also be the most familiar to people using the standard interface. It groups items together very close to how groups used to do."
---

Entities will be the most common type of card that will also be the most familiar to people using the standard interface. It groups items together very close to how groups used to do.

{% configuration %}
type:
  required: true
  description: entities
  type: string
entities:
  required: true
  description: "A list of entity IDs or `entity` objects, see below."
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
{% endconfiguration %}

## Options For Entities

If you define entities as objects instead of strings (by adding `entity:` before entity ID), you can add more customization and configuration:

{% configuration %}
entity:
  required: true
  description: Home Assistant entity ID.
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
  description: "Show additional info. Values: `entity-id`, `last-changed`, `last-triggered` (only for automations and scripts)."
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
tap_action:
  required: false
  description: Action to take on tap
  type: map
  keys:
    action:
      required: true
      description: "Action to perform (`more-info`, `toggle`, `call-service`, `navigate`, `url`, `none`)"
      type: string
      default: "`toggle`"
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
{% endconfiguration %}

## Special Row Elements

### Call Service

{% configuration %}
type:
  required: true
  description: call-service
  type: string
name:
  required: true
  description: Main Label.
  type: string
service:
  required: true
  description: "Service like `media_player.media_play_pause`"
  type: string
icon:
  required: false
  description: "Icon to display (e.g., `mdi:home`)"
  type: string
  default: "`mdi:remote`"
action_name:
  required: false
  description: Button label.
  type: string
  default: "`Run`"
service_data:
  required: false
  description: The service data to use.
  type: map
{% endconfiguration %}

### Cast

Special row to start Home Assistant Cast.

{% configuration %}
type:
  required: true
  description: cast
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

### Divider

{% configuration %}
type:
  required: true
  description: divider
  type: string
style:
  required: false
  description: Style the element using CSS.
  type: string
  default: "height: 1px, background-color: var(--secondary-text-color)"
{% endconfiguration %}

### Section

{% configuration %}
type:
  required: true
  description: section
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
  description: weblink
  type: string
url:
  required: true
  description: "Website URL (or internal URL e.g. `/hassio/dashboard` or `/panel_custom_name`)"
  type: string
name:
  required: false
  description: Link label
  type: string
  default: url path
icon:
  required: false
  description: "Icon to display (e.g., `mdi:home`)"
  type: string
  default: "`mdi:link`"
{% endconfiguration %}

## Example

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

Special rows:

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
  - type: weblink
    name: Home Assistant
    url: https://www.home-assistant.io/
    icon: mdi:home-assistant
```

<div class='note'>
Please be aware that the entity types divider and weblink aren't yet supported by the UI editor and a warning about `Expected a value of type...` is shown. You can ignore the warning and save your edits to verify.
</div>
