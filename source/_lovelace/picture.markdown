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

{% linkable_title Options %}

{% configuration %}
type:
  required: true
  description: picture
  type: string
image:
  required: true
  description: URL of an image
  type: string
navigation_path:
  required: false
  description: Path of URL to navigate to
  type: string
  default: None
service:
  required: false
  description: "`light.toggle`"
  type: string
  default: None
service_data:
  required: false
  description: See service_data object
  type: object
  default: None
{% endconfiguration %}

`service_data` object structure

{% configuration %}
entity_id:
  required: true
  description: light.floor
  type: string
{% endconfiguration %}


{% linkable_title Examples %}

Basic navigation example:

```yaml
- type: picture
  image: /local/exit.jpg
  navigation_path: /lovelace/arsaboo
```

> Check the [views](/lovelace/views/) setup on how to setup custom ids

Basic navigation example:

```yaml
- type: picture
  image: /local/exit.jpg
  service: light.toggle
  service_data:
    entity_id: light.ceiling_lights
```
