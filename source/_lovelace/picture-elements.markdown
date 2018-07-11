---
layout: page
title: "Picture Elements Card"
sidebar_label: Picture Elements
description: "Picture elements card is one of the most versatile type of cards"
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

Picture elements card is one of the most versatile type of cards.

The cards allows you to position icons or text and even services! On an image based on coordinates. Imagine floor plan, imagine [picture-glance](/lovelace/picture-glance/) with no restrictions!

<p class='img'>
  <img src='/images/lovelace/lovelace_picture_elements.gif' alt='A functional floorplan powered by picture elements'>
  A functional floorplan powered by picture elements.
</p>

{% configuration %}
type:
  required: true
  description: picture-elements
  type: string
image:
  required: true
  description: The URL of an image.
  type: string
elements:
  required: true
  description: List of elements
  type: list
title:
  required: false
  description: Card title
  type: string
{% endconfiguration %}

## {% linkable_title Elements %}

### {% linkable_title Navigate to other views %}

{% configuration %}
type:
  required: true
  description: navigation
  type: string
navigation_path:
  required: true
  description: URL path to another view.
  type: string
icon:
  required: false
  description: Material Design Icon.
  type: string
{% endconfiguration %}

### {% linkable_title State Badge %}

{% configuration %}
type:
  required: true
  description: state-badge
  type: string
entity:
  required: true
  description: Entity id
  type: string
style:
  required: true
  description: Position and style the element using CSS.
  type: object
{% endconfiguration %}

### {% linkable_title Icon representing an entity state %}

{% configuration %}
type:
  required: true
  description: state-icon
  type: string
entity:
  required: true
  description: The entity id to use.
  type: string
tap_action:
  required: false
  description: "Set to `toggle` to change state"
  type: string
  default: more-info
style:
  required: true
  description: Position and style the element using CSS.
  type: object
{% endconfiguration %}

### {% linkable_title Label with state text %}

{% configuration %}
type:
  required: true
  description: state-label
  type: string
entity:
  required: true
  description: Entity id
  type: string
style:
  required: true
  description: Position and style the element using CSS.
  type: object
{% endconfiguration %}

### {% linkable_title Service Call Button %}

{% configuration %}
type:
  required: true
  description: service-button
  type: string
title:
  required: true
  description: Button label
  type: string
service:
  required: true
  description: light.turn_on
  type: string
service_data:
  required: false
  description: The service data to use."
  type: object
style:
  required: true
  description: Position and style the element using CSS.
  type: object
{% endconfiguration %}

## {% linkable_title How-to use the style object %}

Position and style your elements using [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets). More/other keys are also possible.

```yaml
style:
  # Positioning of the element
  left: 50%
  top: 50%
  # Overwrite color for icons
  "--paper-item-icon-color": pink
```

## {% linkable_title Example %}

```yaml
- type: picture-elements
  image: /local/floorplan.png
  elements:
    - type: state-icon
      tap_action: toggle
      entity: light.ceiling_lights
      style:
        top: 47%
        left: 42%
    - type: state-icon
      tap_action: toggle
      entity: light.kitchen_lights
      style:
        top: 30%
        left: 15%
    - type: state-label
      entity: sensor.outside_temperature
      style:
        top: 82%
        left: 79%
    - type: service-button
      title: Turn lights off
      style:
        top: 95%
        left: 60%
      service: light.turn_off
      service_data:
          entity_id: group.all_lights
```
