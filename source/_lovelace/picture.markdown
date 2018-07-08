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

### Picture

A very simple card that allows you to set an image to use for navigation to various paths in your interface or to call a service.

<p class='img'>
<img src='/images/lovelace/lovelace_picture.png' alt='Screenshot of the picture card'>
Screenshot of the picture card.
</p>

**Options**

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `picture`
| image | string | **Required**| URL of an image.
| navigation_path | string | Optional | Path of URL to navigate to
| service | string | Optional | `light.toggle`
| service_data | object | optional | See service_data object

`service_data` object structure

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| entity_id | string | **Required** | 'light.floor'


**Examples**

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
