---
layout: page
title: "Picture Elements Card"
sidebar_label: Picture Elements
description: "TBD"
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

### Picture elements

Picture elements card is one of the most versatile type of cards. I am almost sure that those that like to customize a lot in their home assistant interface will **love** this card. 

The cards allows you to position icons or text and even services! on an image based on coordinates. Imagine floor plan, imagine [picture-glance](card-picture-glance.md) with no restrictions!

You can customize tap action and even icon color.

![floor-plan](https://user-images.githubusercontent.com/7738048/42103244-26bec55a-7bd1-11e8-8bc9-6a130c513f9e.gif)

**Options**

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `picture-elements`
| image | string | **Required** | URL of an image
| elements | list | **Required** | List of elements
| title | string | Optional | Card title

Element types:

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `navigation`
| navigation_path | string | **Required** | navigation_path of URL to navigate to
| icon | string | Optional | Icon

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `state-badge`
| entity | string | **Required** | Entity id
| style | object | **Required** | See "Style options"

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `state-icon`
| entity | string | **Required** | Entity id
| style | object | **Required** | See "Style options"
| tap_action | string | more-info | Set to `toggle` to change state

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `state-label`
| entity | string | **Required** | Entity id
| style | object | **Required** | See "Style options"

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `service-button`
| service | string | **Required** | `light.turn_on`
| service_data | object | Optional | See `service_data` object structure.
| style | object | **Required** | See "Style options"
| title | string | Optional | Button label

`service_data` object structure

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| entity_id | string | **Required** | 'light.floor'

Style options (CSS):

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| left | string | **Required** | Position from left, `25%`
| top | string | **Required** | Position from top, `50%`
| ... | string | inherit | ...
| "--paper-item-icon-color" | string | inherit | Badge-icon off-color, `green`

**Example**

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
