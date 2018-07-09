---
layout: page
title: "Picture Glance Card"
sidebar_label: Picture Glance
description: "A very useful type of card that can display sensors, switches, lights and other entities grouped on top of a custom image. Use this card for easy visual recognition inside a large dashboard."
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

### Picture glance

A very useful type of card that can display sensors, switches, lights and other entities grouped on top of a custom image. Use this card for easy visual recognition inside a large dashboard. You also can add `navigation_path` to take the user to a specific view and use these cards in an overview dashboard.

What really sets this card apart is the ability to **control** entities directly from the card without the need to open the details of that entity.

You can also use `camera` domain entities to use that as image. You can also use `state_image` just like in [picture-entity](/lovelace/picture-entity/) together with an `entity` entry to change the image in a dynamic way.

> Picture glance supports a display of maximum 10 items.

<p class='img'>
<img src='/images/lovelace/lovelace_picture_glance.gif' alt='Screenshot of the picture glance card'>
Screenshot of the picture glance card.
</p>

**Options**

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `picture-glance`
| image | string | **Required** | URL of an image
| entities | list | **Required** | Entity id's
| navigation_path | string | Optional | Path of URL to use in navigation
| camera_image | string | Optional | camera domain entity_id 'camera.demo_camera'
| state_image | object | Optional| See `state_image` object structure.
| entity | list | Optional | An entity to use for state_image state
| title | string | Optional | Card title

`state_image` object structure

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| on | string | Optional | URL of an image used for on state.
| off | string | Optional | URL of an image used for off state.
| home | string | Optional | URL of an image used for home state.
| not_home | string | Optional | URL of an image used for not_home state.
| ... | string | Optional | Any state that is supported by the entity works

**Examples**

```yaml
- type: picture-glance
  image: https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=240&w=495
  title: Living
  entities:
    - switch.decorative_lights
    - light.ceiling_lights
    - lock.front_door
    - binary_sensor.movement_backyard
    - binary_sensor.basement_floor_wet
```

Picture glance used together with 'camera_image'
```yaml
- type: picture-glance
  image:
  camera_image: camera.demo_camera
  title: Living
  entities:
    - switch.decorative_lights
    - light.ceiling_lights
    - lock.front_door
    - binary_sensor.movement_backyard
    - binary_sensor.basement_floor_wet
```

Picture glance used together with 'entity-filter'
```yaml
- type: entity-filter
  entities:
    - light.bed_light
    - light.kitchen_lights
    - light.ceiling_lights
  state_filter:
    - 'on'
  card: picture-glance
  card_config:
    title: Lights
    image: https://images.pexels.com/photos/356048/pexels-photo-356048.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=295&w=490
```
