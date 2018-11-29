---
layout: page
title: "Picture Card"
sidebar_label: Picture
description: "A very simple card that allows you to set an image to use for navigation to various paths in your interface or to call a service."
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

A very simple card that allows you to set an image to use for navigation to various paths in your interface or to call a service.

<p class='img'>
<img src='/images/lovelace/lovelace_picture.png' alt='Screenshot of the picture card'>
Screenshot of the picture card.
</p>

{% configuration %}
type:
  required: true
  description: picture
  type: string
image:
  required: false
  description: The URL of an image.
  type: string
camera_image:
  required: false
  description: Camera entity as Background image.
  type: string
state_image:
  required: false
  description: Background image based on entity state.
  type: object
  keys:
    state:
      type: string
      required: false
      description: "`state: image-url`, check the example below."
aspect_ratio:
  required: false
  description: "Forces the height of the image to be a ratio of the width. You may enter a value such as: `16x9`, `16:9`, `1.78`."
  type: string
entity:
  required: false
  description: Entity to use for `state_image`.
  type: string
navigation_path:
  required: false
  description: Path of URL to navigate to.
  type: string
service:
  required: false
  description: The service to call.
  type: string
service_data:
  required: false
  description: The service data.
  type: object
{% endconfiguration %}

## {% linkable_title Examples %}

Navigate to another view:

```yaml
- type: picture
  image: /local/home.jpg
  navigation_path: /lovelace/home
```

Check the [views](/lovelace/views/) setup on how to setup custom IDs.

Toggle entity using a service:

```yaml
- type: picture
  image: /local/light.png
  service: light.toggle
  service_data:
    entity_id: light.ceiling_lights
```
