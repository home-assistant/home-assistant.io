---
layout: page
title: "Picture Entity Card"
sidebar_label: Picture Entity
description: "A very useful card for controlling entities. By default, you will get `more-info-dialog` but using `tap_action` you can directly control entities that have `on`/`off` states."
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

A very useful card for controlling entities. By default, you will get `more-info-dialog` but using `tap_action` you can directly control entities that have `on`/`off` states. It allows you to generate a very nice looking card with a big touch area, highly recommended for mobile dashboards on small screens.

You can use different image combination to get a more realistic view for images with lights. The image setup also allows enough flexibility to get your garage picture with the door opened and closed.

You can also use `camera` domain entities to use that as `camera_image`.

<p class='img'>
<img src='/images/lovelace/lovelace_picture_entity.gif' alt='Screenshot of the picture entity card'>
Screenshot of the picture entity card.
</p>

{% linkable_title Options %}

{% configuration %}
type:
  required: true
  description: picture-entity
  type: string
entity:
  required: true
  description: Entity id to control via picture.
  type: string
camera_image:
  required: false
  description: "Camera domain entity_id 'camera.demo_camera'"
  type: string
  default: None
image:
  required: false
  description: URL of an image.
  type: string
  default: None
state_image:
  required: false
  description: "See `state_image` object structure."
  type: object
  default: None
name:
  required: false
  description: Custom name for entity
  type: string
  default: None
show_info:
  required: false
  description: Set to false to hide infobar
  type: boolean
  default: True
tap_action:
  required: false
  description: "Set to `toggle` for turning entity on/off without opening a dialog"
  type: string
  default: dialog
{% endconfiguration %}

`state_image` object structure

{% configuration %}
"on":
  required: true
  description: URL of an image used for on state.
  type: string
  default: None
"off":
  required: true
  description: URL of an image used for off state.
  type: string
  default: None
home:
  required: false
  description: URL of an image used for home state.
  type: string
  default: None
not_home:
  required: false
  description: URL of an image used for not_home state.
  type: string
  default: None
any:
  required: false
  description: Any state that is supported by the entity works
  type: object
  default: None
{% endconfiguration %}

{% linkable_title Examples %}

Basic example:

```yaml
- type: picture-entity
  image: https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=295&w=490
  entity: light.bed_light
```

<p class='img'>
<img src='/images/lovelace/lovelace_picture_entity_2.gif' alt='Screenshot of the picture entity card'>
Screenshot of the picture entity card.
</p>

Example with night/day:

```yaml
- type: picture-entity
  entity: light.bed_light
  image: http://farm7.static.flickr.com/6153/6220100622_88e64ec5d8_b.jpg
  state_image:
    "on": http://farm7.static.flickr.com/6220/6220100616_a877f41a66_b.jpg
  title: Livingroom lights
```
