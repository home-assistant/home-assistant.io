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

The cards allows you to position icons or text and even services! on an image based on coordinates. Imagine floor plan, imagine [picture-glance](/lovelace/picture-glance/) with no restrictions!

You can customize tap action and even icon color.

<p class='img'>
<img src='/images/lovelace/lovelace_picture_elements.gif' alt='Screenshot of the picture elements card'>
Screenshot of the picture elements card.
</p>

{% linkable_title Options %}

{% configuration %}
type:
  required: true
  description: picture-elements
  type: string
image:
  required: true
  description: URL of an image
  type: string
elements:
  required: true
  description: List of elements
  type: list
title:
  required: false
  description: Card title
  type: string
  default: none
{% endconfiguration %}

Element types:

{% configuration %}
type:
  required: true
  description: navigation
  type: string
navigation_path:
  required: true
  description: navigation_path of URL to navigate to
  type: string
icon:
  required: false
  description: Icon
  type: string
  default: none
{% endconfiguration %}

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
  description: See "Style options"
  type: object
{% endconfiguration %}

{% configuration %}
type:
  required: true
  description: state-icon
  type: string
entity:
  required: true
  description: Entity id
  type: string
style:
  required: true
  description: See "Style options"
  type: object
tap_action:
  required: true
  description: "Set to `toggle` to change state"
  type: string
  default: more-info
{% endconfiguration %}

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
  description: See "Style options"
  type: object
{% endconfiguration %}

{% configuration %}
type:
  required: true
  description: service-button
  type: string
service:
  required: true
  description: light.turn_on
  type: string
service_data:
  required: false
  description: "See `service_data` object structure."
  type: object
  default: none
style:
  required: true
  description: See "Style options"
  type: object
title:
  required: false
  description: Button label
  type: string
  default: none
{% endconfiguration %}

`service_data` object structure

{% configuration %}
entity_id:
  required: true
  description: light.floor
  type: string
{% endconfiguration %}

Style options (CSS):

{% configuration %}
left:
  required: true
  description: Position from left, "25%"
  type: string
top:
  required: true
  description: Position from top, "50%"
  type: string
...:
  required: inherit
  description: ...
  type: string
  default: none
"--paper-item-icon-color":
  required: inherit
  description: "Badge-icon off-color, `green`"
  type: string
  default: none
{% endconfiguration %}

{% linkable_title Example %}

```yaml
- type: picture-elements
  image: https://static.vecteezy.com/system/resources/previews/000/102/594/large_2x/free-floor-plan-vector.jpg
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
